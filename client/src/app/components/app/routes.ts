import {Routes, RouterModule} from '@angular/router';
import {DashboarcComponent} from '../dashboard/dashboard';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboarcComponent
    }
];

export const appRoutingProviders: any[] = [];
export const AppRoutes = RouterModule.forRoot(appRoutes);
