import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";



const TopNav: QuartzComponent = (props: QuartzComponentProps) => {
  return (
    <div className="top-nav-wrapper">
      <div className="top-nav-wrapper">
        <div className="page-titles">
          <a className="headshot" href=".">
            <MyProfile />
          </a>
        </div>
        <div className="desktop-only">
          <div className="flex header-links">
            <a className="header-link" href="/notes">
              Notes
            </a>
          </div>
        </div>
      </div>
      <div className="popover-hint">
        <div className="mobile-only">
          <div className="top-nav">
            <div className="hamburger" id="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div id="mobile-links" className="off-screen-menu">
              <div className="mobile-header-links">
                <a className="header-link" href="/notes">
                  Notes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TopNav.css = `
header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    margin: 1.5rem 0;
    display: flex
}
.top-nav-wrapper{
display:flex;
justify-content: space-between;
width:100%
}

header h1 {
    flex: auto;
    margin: 0
}



pre:hover>.clipboard-button {
    opacity: 1;
    transition: all .2s
}

.page-title {
    margin: 0
}

.headshot img {
    box-shadow: var(--box-shadow);
    z-index: 998;
    border: 4px solid #fff;
    border-radius: 1000px;
    max-width: 80px;
    max-height: 80px;
    margin: 0;
    position: relative
}

.header-links {
    box-shadow: var(--box-shadow);
    background-color: var(--white);
    border-radius: 2em;
    padding: 0 .75em;
    display: flex;
    overflow: hidden
}

.header-link {
    color: var(--darkblue);
    font-family: var(--headerFont);
    padding: .75em .5em;
    font-size: 1.125rem;
    transition: all .2s ease-in-out
}

.header-link:hover {
    color: var(--darkblue);
    background-color: var(--light)
}

.mobile-header-links {
    flex-direction: column;
    display: flex
}

.mobile-header-link {
    color: var(--darkblue);
    text-align: left;
    font-family: var(--headerFont);
    padding: .3em .5em;
    font-size: 2.25rem;
    transition: all .2s ease-in-out
}

.off-screen-menu {
    text-align: center;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 450px;
    height: 100vh;
    font-size: 3rem;
    transition: all .3s;
    display: flex;
    position: fixed;
    top: 0;
    right: -450px;
    box-shadow: 0 0 20px #00000040
}

.off-screen-menu.active {
    right: 0
}

.top-nav {
    background-color: var(--darkblue);
    z-index: 900;
    padding: 1rem;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0
}

.hamburger {
    cursor: pointer;
    z-index: 1000;
    width: 40px;
    height: 50px;
    margin-left: auto;
    position: relative
}

.hamburger span {
    background-color: var(--white);
    border-radius: 25px;
    width: 100%;
    height: 5px;
    transition: all .3s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
}

.hamburger span:first-child {
    top: 25%
}

.hamburger span:nth-child(3) {
    top: 75%
}

.hamburger.active span {
    background-color: var(--darkblue)
}

.hamburger.active span:first-child {
    top: 50%;
    transform: translate(-50%,-50%)rotate(45deg)
}

.hamburger.active span:nth-child(2) {
    opacity: 0
}

.hamburger.active span:nth-child(3) {
    top: 50%;
    transform: translate(-50%,-50%)rotate(-45deg)
}

`;

export default (() => TopNav) satisfies QuartzComponentConstructor;

function MyProfile() {
  return <img src="/static/icon.jpg" alt="My Profile" />;
}
