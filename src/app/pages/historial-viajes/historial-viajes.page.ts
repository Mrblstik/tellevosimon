import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.page.html',
  styleUrls: ['./historial-viajes.page.scss'],
})
export class HistorialViajesPage implements OnInit {

  viajes = [
    { fecha: new Date('2024-10-05'), costo: 4500, patente: 'AA-BB-11', chofer: 'Juan Pérez' },
    { fecha: new Date('2024-10-08'), costo: 7200, patente: 'CC-DD-22', chofer: 'Laura González' },
    { fecha: new Date('2024-10-12'), costo: 5200, patente: 'EE-FF-33', chofer: 'Carlos Ramírez' },
  ];

  constructor() { }

  ngOnInit() {}
}
