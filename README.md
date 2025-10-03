# 🎮 Emoji Alchemy - PWA Game

A fun puzzle game where you combine emojis to create new ones!

## 🚀 Deploy to Netlify

1. **Drag & Drop Method:**
   - Go to [netlify.com](https://netlify.com)
   - Drag the entire project folder to the deploy area
   - Done! Your PWA is live

2. **Git Method:**
   - Push to GitHub
   - Connect GitHub repo to Netlify
   - Auto-deploy on every commit

## 📱 PWA Features

- ✅ **Offline Support**: Works without internet
- ✅ **Add to Home Screen**: Install like a native app
- ✅ **Fullscreen**: No browser UI on mobile
- ✅ **Fast Loading**: Cached resources
- ✅ **Responsive**: Works on all devices

## 🔧 Files Structure

```
emoji-alchemy/
├── index.html          # Main game page
├── game.js            # Game logic (PixiJS)
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
├── netlify.toml      # Netlify config
├── _redirects        # Netlify redirects
├── icon-192.png      # App icon (192x192)
├── icon-512.png      # App icon (512x512)
└── create-icons.html # Icon generator
```

## 🎯 How to Play

1. Look at the two emojis shown
2. Guess what they combine into
3. Tap the correct answer
4. Progress through 20 levels!

## 🛠 Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS
- **Game Engine**: PixiJS
- **PWA**: Service Worker + Manifest
- **Hosting**: Netlify
- **Icons**: Canvas-generated PNG

Enjoy the game! 🎉
