import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {ToastService} from "./components/toasts/toast.service";

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), ToastService]
};
