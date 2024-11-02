function detectAndSendToLLM() {
    const forms = document.querySelectorAll("form");
    const inputs = document.querySelectorAll("input");
    const textareas = document.querySelectorAll("textarea");
    const tables = document.querySelectorAll("table");

    const hasFormElements = forms.length > 0 || inputs.length > 0 || textareas.length > 0;
    const hasTables = tables.length > 0;

    if (hasFormElements || hasTables) {
        const pageText = document.body.innerText;
        console.log("Detected forms or tables. Sending scraped text to background script.");

        chrome.runtime.sendMessage({ action: "sendToLLM", data: pageText });
    } else {
        console.log("No form or table elements detected on this page.");
    }
}

// Run the detection and scraping function
detectAndSendToLLM();

// function detectAndSendToLLM() {
//     const forms = document.querySelectorAll("form");
//     const inputs = document.querySelectorAll("input");
//     const textareas = document.querySelectorAll("textarea");
//     const tables = document.querySelectorAll("table");

//     const hasFormElements = forms.length > 0 || inputs.length > 0 || textareas.length > 0;
//     const hasTables = tables.length > 0;

//     if (hasFormElements || hasTables) {
//         // Scrape all visible text on the page
//         const pageText = document.body.innerText;

//         // Send the scraped text to the background script
//         chrome.runtime.sendMessage({ action: "sendToLLM", data: pageText });
//     }
// }

// // Run the detection and scraping function
// detectAndSendToLLM();