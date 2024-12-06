import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavigationExtras, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { Network } from '@capacitor/network';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.page.html',
  styleUrls: ['./lista-viajes.page.scss'],
})
export class ListaViajesPage implements OnInit {
  viajes: any[] = [];

  constructor(private router: Router, private platform: Platform) { }
  firebaseSvc = inject(FirebaseService);
  utils = inject(UtilsService);

  ngOnInit() {
    if (this.checkNetwork) {
      this.obtenerViajes();
    }
    else {
      this.sinInternet();
    }
  }

  ionViewWillEnter() {
    
    if (this.checkNetwork) {
      this.obtenerViajes();
    } else {
      this.sinInternet();
    }
  }
  async checkNetwork() {
    return (await Network.getStatus()).connected;
  }
  sinInternet() {
    this.viajes = this.utils.getFromlocalStorage('viaje');
  }
  async obtenerViajes() {
    const loading = await this.utils.loading();
    loading.present();

    try {
      this.firebaseSvc.realtime
        .list('viajes')
        .snapshotChanges() 
        .subscribe((querySnapshot) => {
          this.viajes = []; 
          querySnapshot.forEach((action) => {
            const key = action.key; 
            const data = action.payload.val(); 

            if (data && typeof data === 'object') {
              this.viajes.push({ id: key, ...data });
            }
          });
        });
    } catch (error) {
      console.error('Error al cargar los viajes:', error);
    } finally {
      loading.dismiss(); 
    }
  }

  async verViaje(id: string) {
    const loading = await this.utils.loading(); 
    loading.present();
    console.log(id);

    let xtras: NavigationExtras = {
      state: {
        id: id
      }
    };

    
    this.router.navigate(['confirmacion'], xtras).then(() => {
      loading.dismiss(); 
    }).catch(() => {
      loading.dismiss(); 
    });
  }

  irAlChat(viajeId: string) {
    this.router.navigate(['chat', { id: viajeId }]); 
  }
}
