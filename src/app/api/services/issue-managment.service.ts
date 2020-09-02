import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/models/issue';
import { environment } from 'src/environments/environment';
import { Marker, marker } from 'leaflet';
import { defaultIcon, greenIcon } from 'src/app/components/map/default-marker';
import { IssueResponse } from 'src/app/models/issue-response';
import { Commentissue } from 'src/app/models/commentissue';

@Injectable({
  providedIn: 'root'
})
export class IssueManagmentService {
  mapMarkers: Marker[] = new Array<Marker>(0);
  issueActive: Issue;

  constructor(private http: HttpClient ) {
    this.getAllMarkers();
    console.log('Les markers sont : ', this.mapMarkers);
   }

  loadAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${environment.apiUrl}/issues?include=issueType`);
  }

  // getAllMarkers(): Observable<Marker[]> {
  getAllMarkers() {
    // création de Marker
    // this.mapMarkers = [
    //   marker([ 46.778186, 6.641524 ], { icon: greenIcon, draggable: true }).bindTooltip('Hello'),
    //   marker([ 46.780796, 6.647395 ], { icon: greenIcon }),
    //   marker([ 46.784992, 6.652267 ], { icon: greenIcon })
    // ];



    this.loadAllIssues().subscribe(issues => {issues.forEach(issue => {
      //console.log(issue.location.coordinates);
      if ( this.issueActive==issue){
        this.mapMarkers.push(marker([issue.location.coordinates[1],issue.location.coordinates[0]], { icon: greenIcon }));  
        console.log('marker vert',issue.description);
      } else {
        this.mapMarkers.push(marker([issue.location.coordinates[1],issue.location.coordinates[0]], { icon: defaultIcon }));
      }
    })});
      
   
    
  }

  postNewIssue(newIssue: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${environment.apiUrl}/issues`, newIssue);
  }

  getIssue(id: string): Observable<Issue> {
    return this.http.get<Issue>(`${environment.apiUrl}/issues/${id}?inculde=issueType`);
  }

  patchIssue(id: string, updatedIssue: Issue): Observable<Issue> {
    return this.http.patch<Issue>(`${environment.apiUrl}/issues/${id}`, updatedIssue);
  }

  deleteIssue(id: string): Observable<any> {
    console.log('suppression :', id );
    return this.http.delete<any>(`${environment.apiUrl}/issues/${id}`);
  }

  addComment(id: string, newComment: Commentissue): Observable<Commentissue> {
    console.log('Add comment');
    return this.http.post<Commentissue>(`${environment.apiUrl}/issues/${id}/comments`, newComment);
  }

  getComments(id: string): Observable<Commentissue[]> {
    return this.http.get<Commentissue[]>(`${environment.apiUrl}/issues/${id}/comments`);
  }

  







  // loadAllFakeIssues(): Issue[] {
    
  //   return [
  //     {
  //       "assigneeHref": null,
  //       "createdAt": "2016-09-09T15:36:41.947Z",
  //       "creatorHref": "/api/users/58c55a0af2dc592bf95e5d85",
  //       "description": "Ma petite description de l'accident.",
  //       "href": "/api/issues/58c55a0bf2dc592bf95e6749",
  //       "id": "58c55a0bf2dc592bf95e6749",
  //       "imageUrl": "",
  //       "additionalImageUrls": [],
  //       "issueTypeHref": "/api/issueTypes/58c55a0af2dc592bf95e5d86",
  //       "location": {
  //         "coordinates": [
  //           6.6398,
  //           46.7678
  //         ],
  //         "type": "Point"
  //       },
  //       "state": "new",
  //       "tags": [
  //         "rom",
  //         "re"
  //       ],
  //       "updatedAt": "2017-03-12T14:24:11.738Z"
  //     },
  //     {
  //       "assigneeHref": "/api/users/58c55a0af2dc592bf95e5d80",
  //       "createdAt": "2016-09-07T13:35:13.027Z",
  //       "creatorHref": "/api/users/58c55a09f2dc592bf95e5d77",
  //       "description": "Encore des peinture sur le mur",
  //       "id": "58c55a0bf2dc592bf95e6712",
  //       "href": "/api/issues/58c55a0bf2dc592bf95e6712",
  //       "imageUrl": "http://example.com/image.png",
  //       "additionalImageUrls": [],
  //       "issueTypeHref": "/api/issueTypes/58c55a0af2dc592bf95e5d86",
  //       "location": {
  //         "coordinates": [
  //           6.6243,
  //           46.7737
  //         ],
  //         "type": "Point"
  //       },
  //       "state": "inProgress",
  //       "tags": [
  //         "ibural",
  //         "disnejwuw"
  //       ],
  //       "updatedAt": "2017-03-12T14:24:12.556Z"
  //     }
  //   ];
  // }



}
