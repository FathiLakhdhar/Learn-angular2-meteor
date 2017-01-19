import {loadParties} from './imports/fixtures/parties';
import './imports/publications/parties';

Meteor.startup(()=>{
    loadParties();
});