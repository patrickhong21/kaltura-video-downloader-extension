async function setDownloadUrl(url) {
    await chrome.storage.local.set({ downloadUrl: url });
}

chrome.webRequest.onCompleted.addListener(async (details) => {
    const url = details.url;

    if (!url.includes("kaltura.com")) {
        return;
    }

    let parsed;
    try {
        parsed = new URL(url);
    } catch {
        return;
    }

    // pathname does NOT include ?Policy=... etc
    if (!parsed.pathname.endsWith(".ts")) {
        return;
    }

    const downloadUrl = url
        .replace("/hls", "")
        .replace(/\/seg-[^/]+\.ts(\?.*)?$/, "");

    console.log(`FOUND URL: ${downloadUrl}`);
    await setDownloadUrl(downloadUrl);
},
{
    urls: ["<all_urls>"]
});

// clear the url if tab is changed
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    await setDownloadUrl("");
});

// clear the url if there is page navigation
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    await setDownloadUrl("");
});

