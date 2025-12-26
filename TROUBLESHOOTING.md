# Troubleshooting Guide

## ✅ FIXED: AsyncStorage Native Module Error

### Error Message:
```
[@RNC/AsyncStorage]: NativeModule: AsyncStorage is null.
```

### Solution Applied:
```bash
cd ios
bundle exec pod install
cd ..
```

Then rebuild the app:
```bash
npm run ios
```

## How to Run the App

### iOS (After pods are installed):
```bash
npm run ios
```

### Android:
```bash
npm run android
```

### Reset Metro Cache (if needed):
```bash
npm start -- --reset-cache
```

## Common Issues

### 1. Metro Bundler Won't Start
**Solution:**
```bash
npx react-native start --reset-cache
```

### 2. Build Fails After Adding Dependencies
**Solution (iOS):**
```bash
cd ios && bundle exec pod install && cd ..
npm run ios
```

**Solution (Android):**
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

### 3. Want to Clear All Saved Character Progress
Add this temporarily to your App.tsx:
```typescript
import { clearAllProgress } from './utils/storage';

// Call once on app start
useEffect(() => {
  clearAllProgress(); // Remove after testing
}, []);
```

### 4. TypeScript Errors
```bash
npx tsc --noEmit
```

### 5. Linting Warnings
```bash
npm run lint:fix
```

## What Was Fixed

✅ AsyncStorage native module now properly linked
✅ Fixed async function type signatures
✅ Fixed potential infinite loop in auto-save
✅ All TypeScript checks pass
✅ All pods installed successfully

## Next Steps

1. **Run the app:** `npm run ios` or `npm run android`
2. **Test persistence:**
   - Select a character
   - Play and level up
   - Close the app
   - Reopen - your progress should be saved!
3. **Switch characters:**
   - Each character has independent progress
   - Try all three: Lizard, Cat, and Unicorn

## Need Help?

Check the main [README.md](./README.md) for more details about the app features and setup.
