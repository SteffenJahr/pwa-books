import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {AppComponent} from './components/app/app';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutes, appRoutingProviders} from './components/app/routes';
import {DashboarcComponent} from './components/dashboard/dasboard';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutes
    ],
    declarations: [
        AppComponent,
        DashboarcComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        appRoutingProviders
    ]
})
export class AppModule {

}
