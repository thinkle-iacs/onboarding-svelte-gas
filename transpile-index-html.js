import fs from "fs";
import * as babel from "@babel/core";

// Read the HTML file
const html = fs.readFileSync("dist/index.html", "utf8");

// Extract the first JavaScript content from the script tag
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/;
const match = scriptRegex.exec(html);

if (!match) {
  console.error("No script tag found in the HTML.");
  process.exit(1);
}

const scriptContent = match[1];

// Save the original script content for comparison
/* fs.writeFileSync("dist/original-script.js", scriptContent);
console.log("Original script content written to original-script.js"); */

// Transpile the extracted JavaScript content using Babel configuration file
const transpiled = babel.transformSync(scriptContent, {
  configFile: "./babel.config.json",
  sourceType: "module",
});

// Save the transpiled script content for comparison
/* fs.writeFileSync("dist/transpiled-script.js", transpiled.code);
console.log("Transpiled script content written to transpiled-script.js"); */

// Ensure only one replacement by using substring and concatenation
const startIndex = match.index;
const endIndex = scriptRegex.lastIndex;
const beforeScript = html.substring(0, startIndex);
const afterScript = html.substring(endIndex);

const transpiledHtml = `${html}<script type="module" crossorigin>${transpiled.code}</script>`;

// Minify the HTML
/* const minifiedHtml = minify(transpiledHtml, {
  collapseWhitespace: true,
  minifyJS: true,
}); */

// Write the new content to index.html
fs.writeFileSync("dist/index.html", transpiledHtml);
console.log("New file written to index.html successfully.");
