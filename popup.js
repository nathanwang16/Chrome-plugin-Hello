document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("llmResponse", (data) => {
        const responseDiv = document.getElementById("response");
        if (data.llmResponse) {
            responseDiv.textContent = data.llmResponse.output || JSON.stringify(data.llmResponse);
        } else {
            responseDiv.textContent = "No response from LLM yet.";
        }
    });
});

// document.addEventListener("DOMContentLoaded", () => {
//     chrome.storage.local.get("llmResponse", (data) => {
//         const responseDiv = document.getElementById("response");
//         if (data.llmResponse) {
//             responseDiv.textContent = data.llmResponse;
//         } else {
//             responseDiv.textContent = "No response from LLM yet.";
//         }
//     });
// });