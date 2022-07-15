# Twitter GPT-3 Extension

A simple extension to generate GPT-3 tweet replies inside Twitter.com

![Gif](demo.gif)

## Instructions

You will need an OpenAI Beta account: https://beta.openai.com/

1. Unzip this extension somewhere (and don't remove it)
2. Open `src/inject/inject.js`
3. Modify the second line to add your own GPT-3 Key, found here: https://beta.openai.com/account/api-keys

### Chrome:
4. Open [chrome://extensions/](chrome://extensions/)
5. Enable Developer Mode (toggle in upper right corner of screen)
6. Click "Load Unpacked" (top-left corner)
7. Select your extension directory

### Firefox: 
4. Navigate to (about:debugging#/runtime/this-firefox)[about:debugging#/runtime/this-firefox] in your browser.
5. Click Load Temporary Addon & then select the manifest.json in the folder you just created

### That's it!

Remember, Updates don't occur automatically when you manually install the extension from source. `¯\_(ツ)_/¯`


## Using the extension
1. Navigate to [https://twitter.com/home](Twitter.com), and reply to a Tweet in a modal window.
2. You will see emojis corresponding to various "moods" for your replies. Click one to generate a Tweet.
3. Repeat until you find a reply you like.