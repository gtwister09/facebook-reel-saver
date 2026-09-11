// Create context menu for Facebook reels
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-reel-link",
    title: "Save Reel Link",
    contexts: ["link", "page"],
    targetUrlPatterns: [
      "*://facebook.com/reel/*",
      "*://www.facebook.com/reel/*",
      "*://facebook.com/watch/*",
      "*://www.facebook.com/watch/*"
    ]
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-reel-link") {
    const reelUrl = info.linkUrl || info.pageUrl;
    saveReelLink(reelUrl);
  }
});

// Function to save reel link to file (appendable)
async function saveReelLink(url) {
  try {
    const fileName = "facebook_reels.txt";
    
    // Use chrome.downloads.download with a data URL
    // This will append to existing file
    const dataUrl = "data:text/plain;charset=utf-8," + encodeURIComponent(url + "\n");
    
    chrome.downloads.download({
      url: dataUrl,
      filename: fileName,
      conflictAction: "uniquify"  // Changed to uniquify to prevent overwrite
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error("Download error:", chrome.runtime.lastError);
      } else {
        console.log("Reel link saved:", url);
      }
    });
  } catch (error) {
    console.error("Error saving reel link:", error);
  }
}
