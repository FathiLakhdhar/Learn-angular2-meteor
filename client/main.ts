import 'angular2-meteor-polyfills';
import 'bootstrap';


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './imports/app/app.module';
import '../both/methods/parties.methods';
import '../both/methods/images.methods';


platformBrowserDynamic().bootstrapModule(AppModule);