const IDX = "index.html"; // file name for Svelte output
const APPNAME = `Onboard App`;

import { getAddOnEnvironment } from "./addOn";

export function doGet(e) {
  console.log("doGet called iwth event: ", e);
  let template = HtmlService.createTemplateFromFile("index");

  // Extract parameters from the `e` object and format them as a single string
  let params = Object.keys(e.parameter)
    .map((key) => `${key}=${e.parameter[key]}`)
    .join(".");
  console.log("doGet called w/ params ", params);
  // Construct the context string
  let context = `${getAddOnEnvironment()}.dialog.mode.${params}`;

  // Pass the context string to the template
  template.context = context;
  // Check for the 'usethesource' parameter
  if (e.parameter.usethesource) {
    let htmlOutput = template.evaluate();
    let rawHtml = htmlOutput.getContent();
    return ContentService.createTextOutput(rawHtml).setMimeType(
      ContentService.MimeType.TEXT
    );
  } else {
    return template.evaluate();
  }
}

export function showSidebar() {
  let template = HtmlService.createTemplateFromFile(IDX);
  let addOn = getAddOnEnvironment();
  template.context = `${addOn}.sidebar`;
  let html = template.evaluate();
  let app = getAppForAddOn(addOn);
  if (app) {
    app.getUi().showSidebar(html);
  }
}

export function getAppForAddOn(
  addOn: "Slides" | "Docs" | "Sheets" | "Unknown"
) {
  if (addOn == "Slides") {
    return SlidesApp;
  } else if (addOn == "Docs") {
    return DocumentApp;
  } else if (addOn == "Sheets") {
    return SpreadsheetApp;
  }
  throw new Error(`Unknown addOn ${addOn}`);
}

export function showDialog(title: string = APPNAME, modal = true) {
  let addOn = getAddOnEnvironment();
  let template = HtmlService.createTemplateFromFile(IDX);
  let context = `${addOn}.dialog.${modal ? "modal" : "modeless"}`;
  template.context = context;
  let app = getAppForAddOn(addOn);
  let html = template.evaluate();
  if (modal) {
    app.getUi().showModalDialog(html, title);
  } else {
    app.getUi().showModelessDialog(html, title);
  }
}
