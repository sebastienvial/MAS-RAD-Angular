import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Image } from 'src/app/models/image';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  

  tabImages: Image[];

  constructor(private http: HttpClient) {
    // this.getImages().subscribe(images => {
    //   this.tabImages = images;
    // });
   }

  // getImages(): Observable<Image[]> {
    
  //   return this.http.get<Image[]>(`${environment.apiUrlImg}/images`, this.options);
  // }

  // getImage(id:string): Observable<Image> {
  //   return this.http.get<Image>(`${environment.apiUrlImg}/image`);
  // }

  // delImage(id:string): Observable<any> {
  //   return this.http.delete<Image>(`${environment.apiUrlImg}/image`, this.options );
  // }

  postImage(imgFile: File) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data; boundary=AaB03x");
    myHeaders.append("Authorization", "Bearer wazKs1G6kNBN8vRMNetni9GL060jEYhKwIiN3BeJXLz2vF8nWxuQN6nfEL7CYwtqPU/ZSvwJcLsz75EqlrLO475vGmEEJ0iLNa1o113yvDzgwLal6ZvLBnVW/7+iuE8XY5sKEqoaAnAFeoahNxdLn2Cmcr542KEpSyUF73t41Gs=");

    var formdata = new FormData();
    formdata.append("image", imgFile, "/D:/MAS-RAD/3-CAS-DAR/dfa-course/Projet/citizen-engagement/src/assets/images/grafitti.png");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    fetch("https://comem-qimg.herokuapp.com/api/images", requestOptions)
      .then(response => console.log(response.text()))
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
  }

  uploadImage(pathImg){
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "multipart/form-data; boundary=AaB03x");
    // myHeaders.append("Authorization", "Bearer wazKs1G6kNBN8vRMNetni9GL060jEYhKwIiN3BeJXLz2vF8nWxuQN6nfEL7CYwtqPU/ZSvwJcLsz75EqlrLO475vGmEEJ0iLNa1o113yvDzgwLal6ZvLBnVW/7+iuE8XY5sKEqoaAnAFeoahNxdLn2Cmcr542KEpSyUF73t41Gs=");

    // var formdata = new FormData();
    // formdata.append("image", "/D:/MAS-RAD/3-CAS-DAR/dfa-course/Projet/citizen-engagement/src/assets/images/grafitti.png");

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: 'follow'
    // };

    // fetch("https://comem-qimg.herokuapp.com/api/images", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
    //   }
  }

}
