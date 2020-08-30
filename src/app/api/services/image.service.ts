import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from 'src/app/models/image';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})



export class ImageService {
  
  
  SERVER_URL: string = 'https://comem-qimg.herokuapp.com/api/images'; 
  formData = new FormData();
  img64 = new Image();

  constructor(private http: HttpClient) { }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


  postNewImage(newImage: File): Observable<Image> {
    var myHeaders = new HttpHeaders({
    ['Content-Type']: 'application/json',
    ['Authorization']: 'Bearer wazKs1G6kNBN8vRMNetni9GL060jEYhKwIiN3BeJXLz2vF8nWxuQN6nfEL7CYwtqPU/ZSvwJcLsz75EqlrLO475vGmEEJ0iLNa1o113yvDzgwLal6ZvLBnVW/7+iuE8XY5sKEqoaAnAFeoahNxdLn2Cmcr542KEpSyUF73t41Gs='
    });
    
    
    // this.getBase64(newImage).then(data => console.log(data));
    console.log({"data": this.img64.data});
     

    return this.http.post<Image>(this.SERVER_URL, {"data": this.img64.data}, {
        headers: myHeaders
      });
    
    
  }



  ggetBase64(file) : any {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      return reader.result;
      
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      return error;
    };
 }
  
  

  
}
