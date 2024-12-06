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
    // Verificar red e intentar cargar los viajes
    this.checkNetwork().then(isConnected => {
      if (isConnected) {
        this.obtenerViajes();
      } else {
        this.sinInternet();
      }
    });
  }

  ionViewWillEnter() {
    // Recargar los datos al volver a la vista
    this.checkNetwork().then(isConnected => {
      if (isConnected) {
        this.obtenerViajes();
      } else {
        this.sinInternet();
      }
    });
  }

  async checkNetwork() {
    const status = await Network.getStatus();
    return status.connected;
  }

  sinInternet() {
    const viajesGuardados = this.utils.getFromlocalStorage('viajes');
    if (viajesGuardados) {
      console.log('Datos recuperados de localStorage:', viajesGuardados); // Verificar datos
      this.viajes = viajesGuardados;
    } else {
      console.log('No se encontraron viajes en localStorage');
      this.viajes = [];
    }
  }

  async obtenerViajes() {
    const loading = await this.utils.loading();
    loading.present();

    try {
      this.firebaseSvc.realtime
        .list('viajes')
        .snapshotChanges() // Escuchar cambios en tiempo real
        .subscribe((querySnapshot) => {
          console.log('Datos de Firebase:', querySnapshot); // Verificar si los datos están llegando
          this.viajes = []; // Reinicia el array en cada carga
          querySnapshot.forEach((action) => {
            const key = action.key; // Obtiene la clave única de cada nodo
            const data = action.payload.val(); // Obtiene el valor (datos)

            if (data && typeof data === 'object') {
              this.viajes.push({ id: key, ...data });
            }
          });

          // Guarda los viajes obtenidos en localStorage
          this.utils.saveInLocalStorage('viajes', this.viajes);
        });
    } catch (error) {
      console.error('Error al obtener los viajes:', error);
    } finally {
      loading.dismiss(); // Asegúrate de que el loading se cierra independientemente del resultado
    }
  }

  async verViaje(id: string) {
    const loading = await this.utils.loading(); // Mostrar loading al navegar
    loading.present();
    console.log(id);

    let xtras: NavigationExtras = {
      state: {
        id: id
      }
    };

    // Usar el objeto `xtras` dentro de `navigate`
    this.router.navigate(['confirmacion'], xtras).then(() => {
      loading.dismiss(); // Ocultar loading después de la navegación
    }).catch(() => {
      loading.dismiss(); // Asegúrate de ocultar el loading en caso de error
    });
  }

  // Método para ir al chat
  irAlChat(viajeId: string) {
    this.router.navigate(['chat', { id: viajeId }]); // Navegar al chat con el ID del viaje
  }
}
