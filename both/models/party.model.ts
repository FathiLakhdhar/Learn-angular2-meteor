import {CollectionObject} from './collection-object.model';
export interface Party extends CollectionObject{
    name: string;
    description: string;
    location: string;
    owner?: string;
    public: boolean;
    invited?: string[];
    rsvps?: RSVP[];
    images?: string[];
}


interface RSVP{
    userId: string,
    response: string
}