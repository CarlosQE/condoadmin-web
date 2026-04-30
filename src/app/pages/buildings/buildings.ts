import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingService } from '../../core/services/building';
import { Building } from '../../core/interfaces/building.interface';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.html',
  styleUrl: './buildings.css',
  imports: [CommonModule]
})
export class Buildings implements OnInit {
  private buildingService = inject(BuildingService)

  buildings = signal<Building[]>([])
  selectedBuilding = signal<Building | null>(null)
  isLoading = signal(true)
  errorMessage = signal('')

  ngOnInit() {
    this.loadBuildings()
  }

  loadBuildings() {
    this.isLoading.set(true)
    this.errorMessage.set('')

    this.buildingService.getAll().subscribe({
      next: (data) => {
        this.buildings.set(data)
        this.isLoading.set(false)
      },
      error: (err) => {
        this.errorMessage.set('No se pudo conectar con el servidor. Verifica que la API esté corriendo.')
        this.isLoading.set(false)
        console.error(err)
      }
    })
  }

  selectBuilding(building: Building) {
    this.selectedBuilding.set(building)
  }

  clearSelection() {
    this.selectedBuilding.set(null)
  }
}