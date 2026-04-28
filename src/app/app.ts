import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [FormsModule]})

  export class App {
    titulo = 'CondoAdmin';
    subtitulo = 'Sistema de adminsitracion de condominios';
    totalEdificios = 2;
    totalUnidades = 6;

    menuAbierto = false;

    busqueda = ''

    toggleMenu() {
      this.menuAbierto = !this.menuAbierto;
    }
  }
  
