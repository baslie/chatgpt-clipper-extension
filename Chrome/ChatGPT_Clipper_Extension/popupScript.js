function setButtonState(button, state) {
  if (state === "success") {
    button.textContent = "Copied";
    button.style.backgroundColor = "#4CAF50";
    button.style.pointerEvents = "none";
  } else if (state === "error") {
    button.textContent = "Error";
    button.style.backgroundColor = "#f44336";
    button.style.pointerEvents = "none";
  }
}

document.getElementById("copyButton").addEventListener("click", function () {
  const copyButton = this;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    
    if (!currentTab.url.startsWith("https://chat.openai.com")) {
      setButtonState(copyButton, "error");
      return;
    }

    chrome.scripting.executeScript(
      {
        target: { tabId: currentTab.id },
        files: ["contentScript.js"],
      },
      (results) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          setButtonState(copyButton, "error");
          return;
        }

        const textToCopy = results[0].result;
        navigator.clipboard.writeText(textToCopy).then(
          function () {
            console.log("Correspondence copied to clipboard");
            setButtonState(copyButton, "success");
          },
          function (err) {
            console.error("Failed to copy correspondence: ", err);
            setButtonState(copyButton, "error");
          }
        );
      }
    );
  });
});