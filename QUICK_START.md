# 🚀 Quick Start Guide

## Run Your App

### iOS
```bash
cd ios && pod install && cd ..
npm run ios
```

### Android
```bash
npm run android
```

### Web Browser ⭐
```bash
npm run web
```
Opens at **http://localhost:3000**

## ✨ What You Have

### 🎮 Game Features
- 3 characters: Lizard 🦎, Cat 🐱, Unicorn 🦄
- Feed & play mechanics
- Level up system with XP
- Persistent progress per character
- Dark mode support

### 📱 Fully Responsive
- **Phone** (< 768px) - Optimized for mobile
- **Tablet** (768-1023px) - Enhanced spacing
- **Desktop** (≥ 1024px) - Centered layout

### 💾 Auto-Save
- **iOS/Android:** AsyncStorage (native)
- **Web:** localStorage (browser)
- Progress saves after every action

## 🌐 Access on Other Devices

1. Find your computer's IP address
2. Start the web server: `npm run web`
3. Visit on any device: `http://YOUR_IP:3000`

## 📂 Project Structure

```
GameApp/
├── components/      # UI components
├── constants/       # Game config
├── hooks/          # Custom hooks
├── screens/        # Main screens
├── styles/         # Styling
├── types/          # TypeScript types
├── utils/          # Utilities
├── public/         # Web assets
└── webpack.config.js  # Web build
```

## 🎯 Test Responsiveness

### Browser DevTools
1. Press F12
2. Click device icon 📱
3. Select device:
   - iPhone 14 Pro
   - iPad Air
   - Desktop

### Real Devices
Visit from your phone/tablet using your computer's IP!

## 🏗️ Build for Production

```bash
npm run build:web
```

Creates optimized build in `dist/` folder.

## 📚 More Info

- [WEB_SETUP.md](./WEB_SETUP.md) - Web deployment
- [RESPONSIVE.md](./RESPONSIVE.md) - Responsive design details
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Fix common issues

## 🎉 You're Ready!

Your app works on iOS, Android, and Web with full responsive support!
