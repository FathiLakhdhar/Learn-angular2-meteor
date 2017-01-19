import { Parties } from '../../../both/collections/parties.collection';
import { Party } from '../../../both/models/party.model';

export function loadParties() {
    if (Parties.find().cursor.count() === 0) {
        let bool: boolean= true;
        for (var i = 0; i < 27; i++) {
            bool= !bool;
            Parties.insert({
                name: Fake.sentence(3),
                location: Fake.sentence(3),
                description: Fake.sentence(10),
                public: bool,
                invited: [],
            });
        }

    }
}