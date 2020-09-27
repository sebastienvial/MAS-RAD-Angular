import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Issue } from 'src/app/models/issue';
import { environment } from 'src/environments/environment';
import { Marker } from 'leaflet';
import { defaultIcon } from 'src/app/components/map/default-marker';
import { Commentissue } from 'src/app/models/commentissue';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IssueManagmentService {
  mapMarkers: Marker[] = new Array<Marker>(0);
  issueActive: Issue;
  issuesChoice: Issue[];

  public issuesChosen: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>(this.issuesChoice);
  public mapMarkersChosen: BehaviorSubject<Marker[]> = new BehaviorSubject<Marker[]>(this.mapMarkers);

  constructor(private http: HttpClient, private router: Router ) {
    this.getAllIssues();
    // console.log('Les markers sont : ', this.mapMarkers);
   }

  loadAllIssues(): Observable<Issue[]> {
      return this.http.get<Issue[]>(`${environment.apiUrl}/issues?include=issueType`).pipe(
        map(issues => {
          this.issuesChosen.next(issues);
          this.showMarkers(issues);
          return issues;
        })
      );
  }

  loadIssues(searchTxt: string): Observable<Issue[]> {
      return this.http.get<Issue[]>(`${environment.apiUrl}/issues?include=issueType&search=${searchTxt}`).pipe(
        map(issues => {
          this.issuesChosen.next(issues);
          this.showMarkers(issues);
          return issues;
        })
      );
  }

  getAllIssues() {
    this.loadAllIssues().subscribe({
      next:(res) => {
        this.issuesChoice = res.slice();
        this.issuesChosen.next(res);
        this.showMarkers(this.issuesChoice);
      },
      error: (error) => {
        console.warn("Issues load managment error", error);

      }
    });
  }

  
  showMarkers(issues: Issue[]) {
    this.mapMarkers = new Array<Marker>(0);
    var marker: Marker;
    issues.forEach(issue => {
      marker = new Marker([issue.location.coordinates[1],issue.location.coordinates[0]]) ;
      marker.setIcon(defaultIcon);
      if (issue.imageUrl) {
        marker.bindPopup(`<div><h4>${issue.description}</h4><br><img src="${issue.imageUrl}" class="card-img-top"></div>`).openPopup();
      } else {
        marker.bindPopup(`<div><h4>${issue.description}</h4><br></div>`).openPopup();  
      }
    this.mapMarkers.push(marker);
    });
    this.mapMarkersChosen.next(this.mapMarkers);

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
    // console.log('suppression :', id );
    return this.http.delete<any>(`${environment.apiUrl}/issues/${id}`);
  }

  addComment(id: string, newComment: Commentissue): Observable<Commentissue> {
    // console.log('Add comment');
    return this.http.post<Commentissue>(`${environment.apiUrl}/issues/${id}/comments`, newComment);
  }

  getComments(id: string): Observable<Commentissue[]> {
    return this.http.get<Commentissue[]>(`${environment.apiUrl}/issues/${id}/comments?inculde=author`);
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
