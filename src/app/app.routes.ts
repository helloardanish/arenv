import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'AR Env Homepage',
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'AR Env Homepage'
    },
];
