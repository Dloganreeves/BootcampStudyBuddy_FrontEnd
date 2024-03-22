import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { SecretModel } from './Models/secret-model';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideHttpClient(),
     {
     provide: 'SocialAuthServiceConfig',
     useValue: {
       autoLogin: false,
       providers: [
         {
           id: GoogleLoginProvider.PROVIDER_ID,
           provider: new GoogleLoginProvider(
             //Remove the .apps.googleusercontent.com from the client id
             //MAKE SURE TO HIDE IT FROM GITHUB
             SecretModel
           ),
         },
       ],
       onError: (err) => {
         debugger;
         console.error(err);
       },
      } as SocialAuthServiceConfig,
    }
  ]
}
  

