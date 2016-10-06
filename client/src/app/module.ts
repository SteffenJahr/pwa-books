import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {AppComponent} from './components/app/app';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutes, appRoutingProviders} from './appRoutes';
import {DashboarcComponent} from './components/dashboard/dashboard';
import {NavigationComponent} from './components/navigation/navigation';
import {ServiceWorkerService} from './services/serviceWorker';
import {BookService} from './services/book';
import {NotificationService} from './services/notification';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutes
    ],
    declarations: [
        AppComponent,
        DashboarcComponent,
        NavigationComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        appRoutingProviders,
        ServiceWorkerService,
        BookService,
        NotificationService
    ]
})
export class AppModule {

}
