import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import * as mapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-programar-viaje',
  templateUrl: './programar-viaje.page.html',
  styleUrls: ['./programar-viaje.page.scss'],
})
export class ProgramarViajePage implements OnInit {
  formularioViaje: FormGroup;
  currentLocation: { lat: number; lng: number } | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService,
    private utilsService: UtilsService,
    private chatService: ChatService
  ) {
    this.formularioViaje = this.crearFormulario();
  }

  ngOnInit(): void {
    this.configurarGeocoder();
    this.obtenerUbicacionActual();
  }

  private crearFormulario(): FormGroup {
    return this.formBuilder.group({
      horaSalida: [new Date().toISOString(), Validators.required],
      destino: ['', Validators.required],
      costo: ['', [Validators.required, Validators.min(1)]],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      asientos: [1, [Validators.required, Validators.min(1)]],
    });
  }

  private obtenerUbicacionActual(): void {
    if (!navigator.geolocation) {
      console.error('Geolocalización no está soportada por este navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.currentLocation = { lat: latitude, lng: longitude };

        this.formularioViaje.patchValue({
          latitud: latitude,
          longitud: longitude,
        });
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error);
      }
    );
  }

  async confirmarViaje(): Promise<void> {
    if (!this.formularioViaje.valid) {
      return;
    }

    const loading = await this.utilsService.loading();
    await loading.present();

    try {
      const usuarioActual = await this.firebaseService.auth.currentUser;

      if (usuarioActual) {
        const viajeData = {
          ...this.formularioViaje.value,
          ubicacionActual: this.currentLocation,
        };

        const path = `viajes/${usuarioActual.uid}`;
        await this.firebaseService.setRealtimeData(path, viajeData);
        this.chatService.deleteChat(usuarioActual.uid);
      }
    } catch (error) {
      console.error('Error al confirmar el viaje:', error);
    } finally {
      loading.dismiss();
      this.router.navigate(['/home']);
    }
  }

  private configurarGeocoder(): void {
    mapboxGeocoder.accessToken = 'pk.eyJ1IjoiZi1jLXUiLCJhIjoiY200YWt4OWR6MDEzbzJrbXpmeG11azRmZSJ9.CF9dLV9uCV3lC-FdxiTzew';

    const geocoder = new mapboxGeocoder({
      accessToken: mapboxGeocoder.accessToken,
      marker: { color: 'orange' },
      mapboxgl: mapboxGeocoder,
    });

    const contenedorGeocoder = document.getElementById('geocoder');
    if (contenedorGeocoder) {
      contenedorGeocoder.appendChild(geocoder.onAdd());
    }

    geocoder.on('result', (event) => {
      const { coordinates } = event.result.geometry;
      this.formularioViaje.patchValue({
        destino: event.result.place_name,
        latitud: coordinates[1],
        longitud: coordinates[0],
      });
    });
  }
}
