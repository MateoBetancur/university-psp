import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            // {
            //     path: '',
            //     loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
            // },
            {
                path: 'sales',
                loadComponent: () => import('./features/sales/sales.component').then(m => m.SalesComponent)
            }
        ]
    },
    // {
    //     path: 'login',
    //     loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent)
    // }
];
