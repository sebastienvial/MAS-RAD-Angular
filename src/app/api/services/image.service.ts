import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from 'src/app/models/image';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ImageService {  
  
  SERVER_URL: string = 'https://comem-qimg.herokuapp.com/api/images'; 

  constructor(private http: HttpClient) { }

  postNewImage(newImage: File): Observable<Image> {
    const formData: FormData = new FormData();
    formData.append('image', newImage);
    return this.http.post<Image>(this.SERVER_URL, formData, {
      headers: {
        ['Authorization']: 'Bearer wazKs1G6kNBN8vRMNetni9GL060jEYhKwIiN3BeJXLz2vF8nWxuQN6nfEL7CYwtqPU/ZSvwJcLsz75EqlrLO475vGmEEJ0iLNa1o113yvDzgwLal6ZvLBnVW/7+iuE8XY5sKEqoaAnAFeoahNxdLn2Cmcr542KEpSyUF73t41Gs='
      }
    });   
  }

  // postNewImages(images: File[]): Observable<boolean> {
  //   var myObs = new Observable()
  //   return of(true);
  // }

  



}
