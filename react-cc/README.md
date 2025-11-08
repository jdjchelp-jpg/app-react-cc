# React CC - Christmas Countdown App

A beautiful, festive Christmas countdown mobile application built with React Native and Expo.

## Features

- 🎄 **Real-time Countdown**: Live countdown timer showing days, hours, minutes, and seconds until Christmas
- ❄️ **Animated Snowfall**: Adjustable snow intensity (0-100%)
- ✨ **Sparkle Particles**: Magical floating sparkle effects
- 🎨 **9 Beautiful Themes**: Classic, Winter, Royal, Candy, Golden, Icy, Forest, Sunset, and Aurora
- 📅 **Year Selection**: Choose any Christmas year from current to +35 years
- 🎵 **Background Music**: Play/pause holiday music with volume control
- 🔔 **Push Notifications**: Customizable notifications for 1 week, 3 days, and 1 day before Christmas
- 🌍 **Multi-language Support**: English, Spanish, French, and Dutch
- 📊 **Progress Circle**: Visual progress indicator showing year completion percentage
- 🎁 **Animated Gift Boxes**: Playful bouncing gift boxes at the bottom
- 🎄 **Special Christmas Tree**: Appears on Dec 24th and decorates over 24 hours
- 🎉 **Confetti Celebration**: Special celebration on Christmas Day

## Installation

1. Install dependencies:
```bash
cd react-cc
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your physical device

## Project Structure

```
react-cc/
├── app/
│   ├── (tabs)/
│   │   └── index.tsx          # Main countdown screen
│   └── _layout.tsx            # Root layout
├── components/
│   ├── Snow.tsx               # Snowfall animation
│   ├── Sparkles.tsx           # Sparkle particles
│   ├── CountdownTimer.tsx     # Timer display
│   ├── ProgressCircle.tsx     # Progress indicator
│   └── GiftBoxes.tsx          # Animated gift boxes
├── constants/
│   ├── quotes.ts              # 500+ holiday quotes
│   ├── themes.ts              # Theme definitions
│   └── translations.ts        # Multi-language support
├── utils/
│   ├── countdown.ts           # Countdown calculations
│   ├── storage.ts             # AsyncStorage utilities
│   ├── notifications.ts      # Push notification system
│   └── music.ts               # Background music control
└── package.json
```

## Configuration

### Default Music URL
The app uses a default holiday music track from JukeHost. You can replace it in settings with your own JukeHost URL.

### Notifications
To enable notifications:
1. Open Settings (hamburger menu)
2. Toggle "Enable Notifications"
3. Grant notification permissions when prompted
4. Customize notification messages for each milestone

### Themes
Choose from 9 beautiful themes:
- **Classic**: Red & Green (default)
- **Winter**: Blue & White
- **Royal**: Purple & Gold
- **Candy**: Pink & Red
- **Golden**: Amber & Gold
- **Icy**: Slate & Sky
- **Forest**: Emerald & Teal
- **Sunset**: Orange & Rose
- **Aurora**: Indigo & Fuchsia

## Special Features

### Christmas Tree Decoration
- Tree appears at midnight on December 24th
- Decorates gradually over 24 hours (0-100% progress)
- Fully decorated at midnight on December 25th
- Disappears at midnight on December 26th
- Countdown automatically switches to next year

### Auto Year Rollover
- On December 26th at midnight, the app automatically switches to the next year's Christmas
- All settings are preserved

## Data Persistence

All user preferences are saved locally using AsyncStorage:
- Selected year
- Current theme
- Snow intensity
- Music volume
- Custom music URL
- Notification settings
- Language preference

## Requirements

- Node.js 18+
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)
- Or Expo Go app on physical device

## Building for Production

To build for production, you'll need to set up EAS (Expo Application Services):

```bash
npm install -g eas-cli
eas login
eas build --platform ios
eas build --platform android
```

## License

Private project - All rights reserved

## Support

For issues or questions, please check the Expo documentation or create an issue in the repository.
