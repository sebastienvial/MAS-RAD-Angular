import { Location } from './location';
import { IssueType } from './issue-type';

export class Issue {
    assigneeHref?: string;
    createdAt: string;
    creatorHref?: string;
    description: string;
    id?: string;
    href?: string;
    imageUrl?: string;
    additionalImageUrls?: string[];
    issueTypeHref?: string;
    issueType?: IssueType;
    location: Location; 
    state?: string;
    tags?: string[]; 
    updatedAt?: string;

}

// {
//     "assigneeHref": "/api/users/58c55a0af2dc592bf95e5d80",
//     "createdAt": "2016-09-07T13:35:13.027Z",
//     "creatorHref": "/api/users/58c55a09f2dc592bf95e5d77",
//     "description": "Ozac nospusi ge oj def gufeh afepevih onoir kulsih umrer kovfi juwe fu.",
//     "id": "58c55a0bf2dc592bf95e6712",
//     "href": "/api/issues/58c55a0bf2dc592bf95e6712",
//     "imageUrl": "http://example.com/image.png",
//     "additionalImageUrls": [],
//     "issueTypeHref": "/api/issueTypes/58c55a0af2dc592bf95e5d86",
//     "location": {
//       "coordinates": [
//         6.6243,
//         46.7737
//       ],
//       "type": "Point"
//     },
//     "state": "inProgress",
//     "tags": [
//       "ibural",
//       "disnejwuw"
//     ],
//     "updatedAt": "2017-03-12T14:24:12.556Z"
//   }



// {
//     "createdAt": "2016-09-09T15:36:41.947Z",
//     "description": "Dondoen aw rol koseko zez nimjolor ra wimupa kiolono uwi ostiibe irce ve.",
//     "imageUrl": "http://example.com/image.png",
//     "additionalImageUrls": [
//       "http://example.com/image-2.png"
//     ],
//     "issueTypeHref": "/api/issueTypes/58c55a0af2dc592bf95e5d86",
//     "location": {
//       "coordinates": [
//         6.6398,
//         46.7678
//       ],
//       "type": "Point"
//     },
//     "tags": [
//       "rom",
//       "re"
//     ]
//   }
