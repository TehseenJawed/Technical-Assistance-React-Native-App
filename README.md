# 📘 Technical Assistance React Native App

A single-screen React Native application that provides:

- Live camera preview
- Microphone mute toggle
- VoIP-style incoming call notifications
- Background push handling
- Proper permission management
- Safe camera resource cleanup on unmount

Built using:

- react-native-vision-camera  
- @notifee/react-native  
- @react-native-firebase/messaging  

---

# 🚀 Project Overview

This project demonstrates:

- Camera preview with lifecycle control
- Permission handling without crashes
- VoIP-style high-priority notifications
- Background wake using data-only push
- Production-aware scaling considerations

---

# 🛠 Prerequisites

## macOS (Required for iOS builds)

- Node.js (LTS)
- Watchman
- Xcode (latest stable)
- CocoaPods
- JDK 17
- Android Studio (for Android builds)

## Windows

- Node.js (LTS)
- JDK 17
- Android Studio

---

# 📦 Installation

```bash
git clone <your-repository-url>
cd TechnicalAssistanceApp
npm install