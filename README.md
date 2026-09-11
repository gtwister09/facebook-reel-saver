# Facebook Reel Saver

A Firefox extension that allows you to right-click on Facebook reels and save their links to a text file.

## Features

- Right-click context menu on Facebook reel links
- Saves reel URLs directly to `facebook_reels.txt`
- **Properly appends links** - each new link is added to the file without overwriting previous links
- No timestamps - only the links are saved
- Simple and lightweight

## Installation

1. Clone this repository or download the files
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from this extension folder
5. The extension will now be active

## Usage

1. Navigate to Facebook and find a reel
2. Right-click on the reel or its link
3. Select "Save Reel Link" from the context menu
4. The link will be appended to `facebook_reels.txt` in your Downloads folder
5. Each subsequent save will add new links to the existing file

## How It Works

- The extension maintains a list of all saved links in its internal storage
- When you save a reel link, it:
  1. Retrieves all previously saved links from storage
  2. Adds the new link to the collection
  3. Saves the updated collection back to storage
  4. Downloads the complete file with all accumulated links

- The downloaded `facebook_reels.txt` file always contains the complete list of all saved reels

## Files

- `manifest.json` - Extension configuration and permissions
- `background.js` - Background script handling context menu and file operations
- `README.md` - This file

## Notes

- Links are saved to your Downloads folder as `facebook_reels.txt`
- Each link is on a new line
- The file is created/updated automatically
- Multiple saves will properly append new links
- The extension stores the link history internally, so links persist even if the file is deleted
