---
title: Clock Synchronization 1
draft: false
tags:
  - distrubuted_systems
  - backend
---


In `distrubuted` system , there will be no assurance that the timestamp of each server is same ,and it is not `syncronized` perfectly 

Clock `synchronization` is the process of ensuring that multiple clocks in a system or network show the same time. This is essential for:

✅ Distributed systems (e.g., databases, cloud computing)

✅ Logging and debugging

✅ Secure communications (e.g., authentication protocols)

## Clock drift

Clock drift  is referred to where some amount of time is drifted  from the original time, for example suppose there is a server A which  has the time stamp of March 12 , 12: 45 PM and the server B has the timestamp of March 12 , 12:50 PM here the server B is drifted by 5 mins of actual time

actual def:

Clock drift refers to the gradual deviation of a system clock from the actual time due to hardware imperfections, temperature changes, or power fluctuations.

## Clock Skew

Clock skew is the time difference between two or more system at a give moment of time

the more clock skew then the system will not `synchronized` properly, we cannot make the clock skew difference to zero but we can reduce the clock skew

To overcome this issue we have NTP - `Network Time Protocal`  

Working Of NTP:

![Screenshot 2025-03-18 at 3.23.05 PM.png](Screenshot_2025-03-18_at_3.23.05_PM.png)

here 
t1 - timestamp when the client send the request to the `ntp` server , timestamp is attached to the request header

t2 - timestamp when the server the receive the request from the client 

t3 - timestamp when the server send the response after some processing

t4 - timestamp when the client receive the response

Round trip network delay:    $ → delta

$ = (t4- t1) - (t3 - t2)  here delta is the total time taken by the network to take the request and response

we cannot calculate the time taken by response and request alone , why because the clock is not `synchronized` in client and server

but we can assume that both response and request takes the same time so 

`request = response = $/2;`

so the timestamp at the client side when it receive the response is 

`t4 = t3 + ($/2);`