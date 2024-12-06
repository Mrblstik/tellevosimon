import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
})
export class PerfilUsuarioPage implements OnInit {
  userData: any = null;
  vehiculoData: any = null;
  private firebaseSvc: FirebaseService;
  private utils: UtilsService;

  constructor(router: Router, firebaseService: FirebaseService, utilsService: UtilsService) {
    this.firebaseSvc = firebaseService;
    this.utils = utilsService;
    this.router = router;
  }

  router: Router;

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    const datosUsuario = this.utils.getFromlocalStorage('user');
    if (datosUsuario) {
      this.userData = datosUsuario;
      console.log('Datos del usuario cargados:', this.userData);
    } else {
      console.log('No se encontraron datos del usuario en el almacenamiento local.');
    }
  }

  verHistorial(): void {
    console.log('Navegando al historial de viajes...');
    this.router.navigate(['/historial-viajes']);
  }

  editarInformacion(): void {
    console.log('Accediendo a la edición de datos personales y del vehículo...');
    this.router.navigate(['/registro-usuario']);
  }
}
