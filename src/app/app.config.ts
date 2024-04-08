import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(), 
    importProvidersFrom(provideFirebaseApp(
      () => initializeApp(
        {
          "projectId":"ar-app-data-12e87",
          "appId":"1:176756428364:web:252bbb7cae5e2ca0636ee9",
          "storageBucket":"ar-app-data-12e87.appspot.com",
          "apiKey":"AIzaSyCgmPd8fHcEdK2cFEsEI2AhK89dJ4GAfAc",
          "authDomain":"ar-app-data-12e87.firebaseapp.com",
          "messagingSenderId":"176756428364","measurementId":
          "G-7Z9LYD3QGY"
        }
      )
    )), 
    importProvidersFrom(
      provideFirestore(
        () => getFirestore()
      )
    ),
  ]
};
