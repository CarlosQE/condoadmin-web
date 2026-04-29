import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface que espeja el DTO del backend
// Mismo contrato que AddBuildingOutput en C#
interface Building {
  id: number
  name: string
  address: string
  city: string
  totalUnits: number
  isActive: boolean
}

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.html',
  styleUrl: './buildings.css',
  imports: [CommonModule]
})
export class Buildings {
  // Lista de edificios — datos hardcodeados por ahora
  // En la Fase 3 estos vendrán de la API real
  buildings: Building[] = [
    {
      id: 1,
      name: 'Torre Altura',
      address: 'Av. Arce 2345',
      city: 'La Paz',
      totalUnits: 4,
      isActive: true
    },
    {
      id: 2,
      name: 'Residencial Verde',
      address: 'Calle 21 de Calacoto 890',
      city: 'La Paz',
      totalUnits: 2,
      isActive: true
    },
    {
      id: 3,
      name: 'Torre Norte',
      address: 'Av. Montes 123',
      city: 'La Paz',
      totalUnits: 0,
      isActive: false  // Inactivo — para probar @if
    }
  ]

  // Propiedad para el edificio seleccionado
  // null cuando no hay ninguno seleccionado
  selectedBuilding: Building | null = null

  // Método para seleccionar un edificio
  selectBuilding(building: Building) {
    this.selectedBuilding = building
  }

  // Método para cerrar el detalle
  clearSelection() {
    this.selectedBuilding = null
  }
}