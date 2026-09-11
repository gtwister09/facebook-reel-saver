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
    if (reelUrl) {
      saveReelLink(reelUrl);
    }
  }
});

// Function to save reel link to file (truly appendable)
async function saveReelLink(url) {
  try {
    // Get existing content from storage
    const result = await chrome.storage.local.get('reelLinks');
    let allLinks = result.reelLinks || '';
    
    // Append new link
    allLinks += url + '\n';
    
    // Save back to storage
    await chrome.storage.local.set({ reelLinks: allLinks });
    
    // Download the updated file
    const dataUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent(allLinks);
    
    chrome.downloads.download({
      url: dataUrl,
      filename: 'facebook_reels.txt',
      conflictAction: 'overwrite'  // Overwrite with accumulated links
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error('Download error:', chrome.runtime.lastError);
      } else {
        console.log('Reel link saved and file updated:', url);
      }
    });
  } catch (error) {
    console.error('Error saving reel link:', error);
  }
}
