import {loadParties} from './imports/fixtures/parties';
import './imports/publications/parties';
import './imports/publications/users'; 
import './imports/publications/images'; 
import '../both/methods/parties.methods';
import '../both/methods/images.methods';

Meteor.startup(()=>{
    loadParties();
});