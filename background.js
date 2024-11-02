// Fixed personal information used for each LLM request
const personalInfo = `
Name: John Doe
Email: johndoe@example.com
Phone: 123-456-7890
Address: 123 Main Street, Anytown, USA
`;

// Instructions to guide the LLM on how to interpret the webpage content for form-filling
const formFillingCommand = `
Please review the provided context and identify the relevant information for each form field.
Use the personal information for name, email, phone, or address fields.
For other fields, refer to contextual information from the webpage.
`;

// Function to send the request to the Ollama API with structured data
async function sendToOllama(prompt) {
    console.log("Sending prompt to Ollama API...");

    try {
        const response = await fetch('http://localhost:11434/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'your-model-name',  // Replace with the actual model name, e.g., "llama-2"
                prompt: prompt
            })
        });

        if (!response.ok) throw new Error(`API error with status ${response.status}`);

        const result = await response.json();
        console.log("LLM Response received:", result);

        // Store the response in Chrome storage for access by the popup
        chrome.storage.local.set({ llmResponse: result });
    } catch (error) {
        console.error("Error in Ollama API request:", error);
    }
}

// Listener for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "sendToLLM") {
        console.log("Received context data from content script.");

        // Prepare the full prompt by combining personal info, command, and webpage context
        const prompt = `${personalInfo}\n${formFillingCommand}\n\nContext:\n${request.data}`;
        console.log("Constructed prompt for LLM:", prompt);

        // Send to Ollama API
        sendToOllama(prompt);
    }
});



// For the console output test which grabs all the elements in a webpage
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "sendToLLM") {
//         console.log("Received text from content script:", request.data);
        
//         // You could also store this directly in chrome.storage.local for viewing
//         chrome.storage.local.set({ receivedText: request.data });
//     }
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "sendToLLM") {
//         sendToLLM(request.data);
//     }
// });

// async function sendToLLM(text) {
//     try {
//         const response = await fetch('http://localhost:11434/generate', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 model: 'your-model-name', // Replace with the actual model name, e.g., "llama-2"
//                 prompt: text
//             })
//         });
//         const result = await response.json();
//         console.log("LLM Response:", result);

//         // Store the response so it can be accessed by the popup
//         chrome.storage.local.set({ llmResponse: result });
//     } catch (error) {
//         console.error("Error sending data to LLM:", error);
//     }
// }