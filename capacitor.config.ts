import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.grade9portal',
  appName: 'Grade 9 Portal',
  webDir: 'dist',
  server: {
    url: 'https://2fedd0a6-db5c-4f96-8bfe-35265ebbfe64.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
