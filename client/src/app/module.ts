import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {AppComponent} from './components/app/app';
import {AppRoutes, appRoutingProviders} from './appRoutes';
import {DashboardComponent} from './components/dashboard/dashboard';
import {ServiceWorkerService} from './services/serviceWorker';
import {BookService} from './services/book';
import {NotificationService} from './services/notification';
import {FormsModule} from '@angular/forms';
import {LocalStorageService} from './services/localStorage';
import {AddComponent} from './components/add/add';
import {InputFieldComponent} from './components/inputField/inputField';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutes,
        FormsModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        AddComponent,
        InputFieldComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        appRoutingProviders,
        ServiceWorkerService,
        BookService,
        NotificationService,
        LocalStorageService
    ]
})
export class AppModule {

}
