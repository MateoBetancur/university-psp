import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            // {
            //     path: '',
            //     loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
            // },
            {
                path: 'sales',
                loadComponent: () => import('./features/sales/sales.component').then(m => m.SalesComponent)
            },
            {
                path: 'employees',
                loadComponent: () => import('./features/employees/employees.component').then(m => m.EmployeesComponent)
            },
            {
                path: 'commission-parameters',
                loadComponent: () => import('./features/commission-parameters/commission-parameters.component').then(m => m.CommissionParametersComponent)
            },
            {
                path: 'calculate-commissions',
                loadComponent: () => import('./features/calculate-commissions/calculate-commissions.component').then(m => m.CalculateCommissionsComponent)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    }
];
