document.addEventListener("DOMContentLoaded", () => {
    const linkDisplay = document.getElementById("linkDisplay");
    const downloadBtn = document.getElementById("downloadBtn");

    function updateDisplay(url) {
        linkDisplay.textContent = url || "No URL detected yet.";
        if (!url || url === "No URL detected yet.") {
            downloadBtn.disabled = true;
            downloadBtn.style.backgroundColor = "#ccc"; // greyed out
            downloadBtn.style.cursor = "not-allowed";
        } else {
            downloadBtn.disabled = false;
            downloadBtn.style.backgroundColor = ""; // reset to default
            downloadBtn.style.cursor = "pointer";
        }
    }

    // Load the single saved URL
    async function loadLink() {
        const { downloadUrl = "" } = await chrome.storage.local.get("downloadUrl");
        linkDisplay.textContent = downloadUrl || "No URL detected yet.";
        updateDisplay(linkDisplay.textContent);
    }

    // Download the stored URL
    downloadBtn.addEventListener("click", () => {
        const url = linkDisplay.textContent;

        if (!url) return;

        chrome.downloads.download({
            url,
            conflictAction: "uniquify",
        });

        window.close();
    });

    // Listen for changes in storage and update automatically
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "local" && changes.downloadUrl) {
            updateDisplay(changes.downloadUrl.newValue);
        }
    });

    loadLink();
});
