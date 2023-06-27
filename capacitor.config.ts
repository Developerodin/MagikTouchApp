import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.MagikTouch.App',
  appName: 'Magiktouch Services',
  webDir: 'build',
  server: {
    "allowNavigation": [
      "*"
    ]
  }
};

export default config;
