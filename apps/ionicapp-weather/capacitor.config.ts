import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionicapp-weather',
  webDir: '../../dist/apps/ionicapp-weather/browser',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
