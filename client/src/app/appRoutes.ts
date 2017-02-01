import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard';
import {AddComponent} from './components/add/add';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
    },
    {
        path: 'add',
        component: AddComponent
    }
];

export const appRoutingProviders: any[] = [];
export const AppRoutes = RouterModule.forRoot(appRoutes);
