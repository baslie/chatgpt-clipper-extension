function copyCorrespondence() {
  const correspondenceContainers = document.querySelectorAll(".group");
  let textToCopy = "";
  let lastIsHuman = false;

  correspondenceContainers.forEach((container) => {
    const textElement = container.querySelector(".items-start");

    if (textElement) {
      const chatGPTElement = textElement.querySelector(".markdown.prose");

      if (chatGPTElement) {
        // ChatGPT message
        if (lastIsHuman) {
          textToCopy += "\n\n[CHATGPT]\n";
          lastIsHuman = false;
        }
        textToCopy += chatGPTElement.innerText.trim() + "\n";
      } else {
        // Human message
        if (!lastIsHuman) {
          textToCopy += "\n\n[HUMAN]\n";
          lastIsHuman = true;
        }
        textToCopy += textElement.innerText.trim() + "\n";
      }
    }
  });

  return textToCopy.trim();
}

copyCorrespondence();