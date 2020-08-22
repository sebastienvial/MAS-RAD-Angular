import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choice-position-page',
  templateUrl: './choice-position-page.component.html',
  styleUrls: ['./choice-position-page.component.scss']
})
export class ChoicePositionPageComponent implements OnInit {

  town: string;
  coordonee = {cd: 4};
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showPosition(form : NgForm) {
    console.log (form);
    if (form.valid) {
      console.log("formulaire valide : " + this.town);

      //requête pour identifier les coordonéées gps selon un code postal en Suisse
      // https://nominatim.openstreetmap.org/search?format=json&limit=3&q=1623,Switzerland

      //appel de la carte avec les coordonnées
      //this.router.navigate(['/map', this.coordonee]);
      this.router.navigateByUrl('/map');
      
    }
  }

  getPosition() {

    console.log("donner la position");
    
  //   $("#formulaire").on("submit", function(e) {
  //     e.preventDefault(); // Empêcher la page de se recharger
  //     var adresse = $("#adresse").val(); // Nous récupérons le contenu du champ adresse
  //     if(adresse != ""){ // Si l'adresse n'est pas vide
  //         var geocoder =  new google.maps.Geocoder(); // On instancie le geocoder
  //         geocoder.geocode( { 'address': adresse}, function(results, status) {
  //             if (status == google.maps.GeocoderStatus.OK) { // Si l'adresse a été résolue
  //                 lat = results[0].geometry.location.lat(); // On récupère la latitude
  //                 lon = results[0].geometry.location.lng(); // On récupère la longitude
  //             } else {
  //                 alert("Something got wrong " + status);
  //             }
  //         });
  //     }
  // });

  }


}
