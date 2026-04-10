import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.grade9portal',
  appName: 'Grade 9 Portal',
  webDir: 'dist',
  android: {
    allowMixedContent: true
  }
};

export default config;
