import {loadParties} from './imports/fixtures/parties';
import './imports/publications/parties';
import './imports/publications/users'; 

Meteor.startup(()=>{
    loadParties();
});