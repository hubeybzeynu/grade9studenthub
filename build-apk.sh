#!/bin/bash
# Grade 9 Portal — Android APK Build Script
# Requirements: Node.js, npm, Android Studio (with SDK)

set -e

echo "📦 Installing dependencies..."
npm install

echo "🤖 Adding Android platform..."
npx cap add android 2>/dev/null || echo "Android platform already added"

echo "🔨 Building web app..."
npm run build

echo "🔄 Syncing to Android..."
npx cap sync android

echo "📱 Building APK..."
cd android
./gradlew assembleDebug

APK_PATH="app/build/outputs/apk/debug/app-debug.apk"

if [ -f "$APK_PATH" ]; then
  echo ""
  echo "✅ APK built successfully!"
  echo "📍 Location: android/$APK_PATH"
else
  echo "❌ APK build failed. Open in Android Studio instead:"
  echo "   npx cap open android"
fi
