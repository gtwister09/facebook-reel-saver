// Create context menu for Facebook reels
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-reel-link",
    title: "Save Reel Link",
    contexts: ["link"],
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

// Function to save reel link to file
async function saveReelLink(url) {
  try {
    const fileName = "facebook_reels.txt";
    
    // Create blob with the link
    const blob = new Blob([url + "\n"], { type: "text/plain" });
    
    // Create object URL and trigger download
    const blobUrl = URL.createObjectURL(blob);
    
    // Trigger download
    chrome.downloads.download({
      url: blobUrl,
      filename: fileName,
      conflictAction: "overwrite"
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
