# GameApp Setup Instructions

## Prerequisites
- Node.js >= 20
- For iOS: Xcode and CocoaPods
- For Android: Android Studio

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. iOS Setup (if running on iOS)
```bash
cd ios
pod install
cd ..
```

### 3. Run the App

#### For iOS:
```bash
npm run ios
```

#### For Android:
```bash
npm run android
```

## Features

### Persistent Storage
The app now saves each character's progress automatically:
- Level, experience, hunger, and happiness are saved per character
- Data persists across app restarts
- Each character has independent progress

### Architecture
- `/components` - Reusable UI components
- `/constants` - Game constants and configuration
- `/hooks` - Custom React hooks
- `/screens` - Screen components
- `/styles` - StyleSheet definitions
- `/types` - TypeScript type definitions
- `/utils` - Utility functions

## Troubleshooting

### iOS: AsyncStorage Not Found
If you get errors about AsyncStorage on iOS, make sure you've run:
```bash
cd ios && pod install && cd ..
```

### Clear Saved Data
To reset all character progress during development:
```typescript
import { clearAllProgress } from './utils/storage';

// Call this to reset all data
await clearAllProgress();
```

### TypeScript Errors
Run type checking:
```bash
npx tsc --noEmit
```

### Linting
Check code quality:
```bash
npm run lint
```

Fix auto-fixable issues:
```bash
npm run lint:fix
```
