import { Route} from '@angular/router';
import { AppComponent } from './app.component';
import { PartiesListComponent } from './parties/parties-list.component';
import { PartyDetailsComponent } from './parties/party-details.component';

export const routes: Route[]=[
    {path: '', component: PartiesListComponent},
    {path:'party/:_id', component: PartyDetailsComponent}
]
