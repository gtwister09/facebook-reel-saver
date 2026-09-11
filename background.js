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

// Function to save reel link with proper appending
function saveReelLink(url) {
  try {
    // Get existing links from storage
    chrome.storage.local.get('reelLinks', (result) => {
      let allLinks = result.reelLinks || '';
      
      // Only add if not already in the list (avoid duplicates)
      if (!allLinks.includes(url)) {
        // Append new link
        allLinks += url + '\n';
        
        // Save to storage
        chrome.storage.local.set({ reelLinks: allLinks }, () => {
          // Download the complete file with all links
          downloadCompleteFile(allLinks);
        });
      } else {
        console.log('Link already saved:', url);
      }
    });
  } catch (error) {
    console.error('Error saving reel link:', error);
  }
}

// Function to download the complete accumulated file
function downloadCompleteFile(content) {
  // Generate a unique timestamp to force Firefox to re-download (not use cache)
  const timestamp = new Date().getTime();
  const encodedContent = encodeURIComponent(content);
  const dataUrl = 'data:text/plain;charset=utf-8,' + encodedContent;
  
  chrome.downloads.download({
    url: dataUrl,
    filename: 'facebook_reels.txt',
    conflictAction: 'overwrite',  // This must be overwrite to update the file
    saveAs: false
  }, (downloadId) => {
    if (chrome.runtime.lastError) {
      console.error('Download error:', chrome.runtime.lastError);
    } else {
      const linkCount = content.split('\n').filter(l => l.trim()).length;
      console.log('File updated with', linkCount, 'total links');
    }
  });
}
