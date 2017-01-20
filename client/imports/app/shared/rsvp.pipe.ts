import { Pipe, PipeTransform } from '@angular/core';
import { Party } from '../../../../both/models/party.model';

@Pipe({
    name: 'rsvp'
})

export class RsvpPipe implements PipeTransform {

    transform(party: Party, type: string) {

        if (!type) return 0;
        let total = 0;
        //const found = Parties.find(party._id);
        if (party) {
            total = party.rsvps ? party.rsvps.filter(rsvp => rsvp.response === type).length : 0;
        }

        return total;
    }

}