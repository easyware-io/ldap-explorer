import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/config/app.config';
import { MainLayout } from './app/layout/main/main.layout';

bootstrapApplication(MainLayout, appConfig).catch((err) => console.error(err));
