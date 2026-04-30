import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Espeja el DTO del backend
interface Unit {
  id: number
  unitNumber: string
  floor: number
  areaM2: number
  monthlyFee: number
  status: number        // 0=Available, 1=Sold, 2=Rented
  buildingId: number
  building: {
    id: number
    name: string
    city: string
  }
}

interface Building {
  id: number
  name: string
}

@Component({
  selector: 'app-units',
  templateUrl: './units.html',
  styleUrl: './units.css',
  imports: [CommonModule, FormsModule]
})
export class Units implements OnInit {

  // Signals — forma moderna de manejar estado en Angular 21
  units    = signal<Unit[]>([])
  buildings = signal<Building[]>([])
  loading  = signal(true)
  error    = signal<string | null>(null)

  // Filtros
  selectedBuildingId = signal<number | null>(null)
  selectedStatus     = signal<number | null>(null)

  // computed — se recalcula automáticamente cuando cambian los signals
  // Aplica los filtros activos sobre la lista completa
  filteredUnits = computed(() => {
    let result = this.units()

    const buildingId = this.selectedBuildingId()
    if (buildingId !== null) {
      result = result.filter(u => u.buildingId === buildingId)
    }

    const status = this.selectedStatus()
    if (status !== null) {
      result = result.filter(u => u.status === status)
    }

    return result
  })

  // Labels para los estados del enum UnitStatus del backend
  statusLabels: Record<number, string> = {
    0: 'Disponible',
    1: 'Vendida',
    2: 'Alquilada'
  }

  statusColors: Record<number, string> = {
    0: 'available',
    1: 'sold',
    2: 'rented'
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUnits()
    this.loadBuildings()
  }

  loadUnits() {
    this.loading.set(true)
    this.error.set(null)

    this.http.get<Unit[]>('http://localhost:5065/api/unit').subscribe({
      next: (data) => {
        this.units.set(data)
        this.loading.set(false)
      },
      error: (err) => {
        this.error.set('No se pudieron cargar las unidades. Verifica que la API esté corriendo.')
        this.loading.set(false)
        console.error(err)
      }
    })
  }

  loadBuildings() {
    this.http.get<Building[]>('http://localhost:5065/api/building').subscribe({
      next: (data) => this.buildings.set(data),
      error: (err) => console.error(err)
    })
  }

  // Métodos para los filtros
  filterByBuilding(event: Event) {
    const value = (event.target as HTMLSelectElement).value
    this.selectedBuildingId.set(value === '' ? null : Number(value))
  }

  filterByStatus(event: Event) {
    const value = (event.target as HTMLSelectElement).value
    this.selectedStatus.set(value === '' ? null : Number(value))
  }

  clearFilters() {
    this.selectedBuildingId.set(null)
    this.selectedStatus.set(null)
  }
}