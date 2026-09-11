// Store the downloads folder path in storage
let downloadsFolderPath = null;

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

// Function to save reel link by downloading incrementally
function saveReelLink(url) {
  try {
    // Get existing links from storage
    chrome.storage.local.get('reelLinks', (result) => {
      let allLinks = result.reelLinks || '';
      
      // Append new link
      allLinks += url + '\n';
      
      // Save to storage
      chrome.storage.local.set({ reelLinks: allLinks }, () => {
        // Create data URL with all accumulated links
        const encodedContent = encodeURIComponent(allLinks);
        const dataUrl = 'data:text/plain;charset=utf-8,' + encodedContent;
        
        // Download with overwrite (this ensures the file always has all links)
        chrome.downloads.download({
          url: dataUrl,
          filename: 'facebook_reels.txt',
          conflictAction: 'overwrite'
        }, (downloadId) => {
          if (chrome.runtime.lastError) {
            console.error('Download error:', chrome.runtime.lastError);
          } else {
            console.log('Reel link appended:', url);
            console.log('Total links saved:', allLinks.split('\n').filter(l => l).length);
          }
        });
      });
    });
  } catch (error) {
    console.error('Error saving reel link:', error);
  }
}
