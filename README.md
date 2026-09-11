# Facebook Reel Saver

A Firefox extension that allows you to right-click on Facebook reels and save their links to a text file.

## Features

- Right-click context menu on Facebook reel links
- Saves reel URLs directly to `facebook_reels.txt`
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

## Files

- `manifest.json` - Extension configuration and permissions
- `background.js` - Background script handling context menu and file operations
- `README.md` - This file

## Notes

- Links are saved to your Downloads folder as `facebook_reels.txt`
- Each link is on a new line
- The file is created automatically if it doesn't exist
- Multiple clicks will append new links to the existing file
