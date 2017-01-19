import { Route} from '@angular/router';
import { AppComponent } from './app.component';
import { PartiesListComponent } from './parties/parties-list.component';
import { PartyDetailsComponent } from './parties/party-details.component';

export const routes: Route[]=[
    {path: '', component: PartiesListComponent, pathMatch: 'full'},
    {path:'party/:_id', component: PartyDetailsComponent, pathMatch: 'full', canActivate:['canActivateForLoggedIn']}
]


export const ROUTES_PROVIDERS=[{
    provide: 'canActivateForLoggedIn',
    useValue: () => !! Meteor.userId()
}]