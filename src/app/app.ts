import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from './layout/navbar/navbar';
import { Buildings } from './pages/buildings/buildings';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [FormsModule, Navbar, Buildings]})

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
  
