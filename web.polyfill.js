// Web polyfills for React Native components
if (typeof window !== 'undefined') {
  // Ensure smooth animations
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => setTimeout(callback, 16);
  }

  // Add console warning suppression for development
  const originalWarn = console.warn;
  console.warn = (...args) => {
    // Suppress known React Native Web warnings
    const msg = args[0];
    if (
      typeof msg === 'string' &&
      (msg.includes('componentWillReceiveProps') ||
       msg.includes('componentWillMount'))
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}
