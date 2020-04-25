import {
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angularx-social-login';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('238978380793966')
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('1036615037986-va1re4gedr6i8ll7lgge8gg7fp6ockvm.apps.googleusercontent.com')
    }
  ]);
  return config;
}