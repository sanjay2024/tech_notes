const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const { glob } = require('glob');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Bluebird = require('bluebird');

const NOTES_DIRECTORY = path.join(__dirname, 'content/notes');
const GEMINI_API_KEY = "AIzaSyBLZFgsm4duuDiPLYXnadooAFE5z5Um1X0";
const MODEL_NAME = "gemini-1.5-flash";


/**
 * Initializes the Google Gemini AI client.
 * Exits if the API key is not provided.
 */
function initializeGenAI() {
  if (!GEMINI_API_KEY) {
    console.error("ERROR: GEMINI_API_KEY environment variable is not set.");
    process.exit(1);
  }
  return new GoogleGenerativeAI(GEMINI_API_KEY);
}

/**
 * Creates the prompt for the Gemini API.
 * @param {string} content - The markdown content of the note.
 * @returns {string} The prompt for the AI.
 */
function createPrompt(content) {
  return `
    You are an AI assistant tasked with enhancing technical notes in Obsidian markdown format.
    Your goal is to improve the content and extract relevant tags.

    Please process the following markdown content and return a JSON object with two keys:
    1. "enhanced_content": An improved version of the text. Focus on clarity, adding relevant details, and correcting errors while preserving the original technical intent. Format it as a single markdown string.
    2. "tags": An array of 3-5 relevant string tags for the content.

    Original Content:
    ---
    ${content}
    ---

    Return only the JSON object.
  `;
}

/**
 * Enhances content and generates tags using the Gemini API.
 * @param {GoogleGenerativeAI} genAI - The AI client instance.
 * @param {string} content - The markdown content to enhance.
 * @returns {Promise<Object|null>} A promise that resolves to an object with enhanced_content and tags, or null on failure.
 */
async function enhanceNoteWithAI(genAI, content) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = createPrompt(content);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response to ensure it's valid JSON
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(jsonString);

    if (parsedData.enhanced_content && Array.isArray(parsedData.tags)) {
      return parsedData;
    } else {
      console.error("   [AI_ERROR] Invalid JSON structure received from API.");
      return null;
    }
  } catch (error) {
    console.error(`   [AI_ERROR] Failed to call Gemini API: ${error.message}`);
    return null;
  }
}

/**
 * Processes a single markdown file.
 * @param {string} filePath - The absolute path to the markdown file.
 * @param {GoogleGenerativeAI} genAI - The AI client instance.
 */
async function processFile(filePath, genAI) {
  console.log(`[PROCESS] Starting: ${path.basename(filePath)}`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data: frontmatter, content: originalContent } = matter(fileContent);

    // Skip if content is empty
    if (!originalContent.trim()) {
      console.log(`   [SKIP] No content to process in ${path.basename(filePath)}.`);
      return;
    }

    // --- Enhance content with AI ---
    const aiResult = await enhanceNoteWithAI(genAI, originalContent);
    if (!aiResult) {
      console.error(`   [FAIL] Could not get AI enhancement for ${path.basename(filePath)}.`);
      return;
    }

    // --- Prepare new frontmatter ---
    const newFrontmatter = { ...frontmatter };

    // Set title if missing
    if (!newFrontmatter.title) {
        const h1Match = originalContent.match(/^#\s+(.*)/m);
        newFrontmatter.title = h1Match ? h1Match[1] : path.basename(filePath, '.md');
        console.log(`   [INFO] Added title: "${newFrontmatter.title}"`);
    }

    // Set date and draft status if missing
    if (!newFrontmatter.date) {
        newFrontmatter.date = new Date().toISOString().split('T')[0];
    }
    if (newFrontmatter.draft === undefined) {
        newFrontmatter.draft = true;
    }

    // Merge tags, ensuring no duplicates
    const existingTags = new Set(newFrontmatter.tags || []);
    aiResult.tags.forEach(tag => existingTags.add(tag));
    newFrontmatter.tags = Array.from(existingTags);

    // --- Write updated file ---
    const updatedFileContent = matter.stringify(aiResult.enhanced_content, newFrontmatter);
    await fs.writeFile(filePath, updatedFileContent, 'utf8');

    console.log(`   [SUCCESS] Finished processing: ${path.basename(filePath)}`);

  } catch (error) {
    console.error(`   [ERROR] Failed to process ${path.basename(filePath)}: ${error.message}`);
  }
}

/**
 * Main function to run the script.
 */
async function main() {
  console.log("--- Starting Tech Notes Enhancer Script ---");

  const genAI = initializeGenAI();
  const filePaths = await glob(`${NOTES_DIRECTORY}/**/*.md`);

  if (filePaths.length === 0) {
    console.log("No markdown files found in the specified directory.");
    return;
  }

  console.log(`Found ${filePaths.length} notes to process.\n`);

  await Bluebird.map(filePaths, async (filePath) => {
    await processFile(filePath, genAI);
    console.log("--------------------"); // Separator for clarity
  }, { concurrency: 10 });

  console.log("\n--- Script finished ---");
}

main().catch(error => {
  console.error("An unexpected error occurred:", error);
});
