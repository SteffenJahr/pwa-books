import {NgModule, Renderer} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {AppComponent} from './components/app/app';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutes, appRoutingProviders} from './appRoutes';
import {DashboarcComponent} from './components/dashboard/dashboard';
import {ServiceWorkerService} from './services/serviceWorker';
import {BookService} from './services/book';
import {NotificationService} from './services/notification';
import {FormsModule} from '@angular/forms';
import {LocalStorageService} from './services/localStorage';
import {AddComponent} from './components/add/add';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutes,
        FormsModule
    ],
    declarations: [
        AppComponent,
        DashboarcComponent,
        AddComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        appRoutingProviders,
        ServiceWorkerService,
        BookService,
        NotificationService,
        LocalStorageService
    ]
})
export class AppModule {

}
