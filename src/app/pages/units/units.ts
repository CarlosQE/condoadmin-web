import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../shared/modal/modal';
import { SaleForm } from './sale-form/sale-form';

interface Unit {
  id: number
  unitNumber: string
  floor: number
  areaM2: number
  monthlyFee: number
  status: string        // ← string ahora
  buildingId: number
  buildingName: string  // ← string directo
}

interface Building {
  id: number
  name: string
}

@Component({
  selector: 'app-units',
  templateUrl: './units.html',
  styleUrl: './units.css',
  imports: [CommonModule, FormsModule, Modal, SaleForm]
})
export class Units implements OnInit {

  units     = signal<Unit[]>([])
  buildings = signal<Building[]>([])
  loading   = signal(true)
  error     = signal<string | null>(null)
  showSaleModal = signal(false)

  selectedBuildingId = signal<number | null>(null)
selectedStatus     = signal<string | null>(null)

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

  statusLabels: Record<string, string> = {
  'Available': 'Disponible',
  'Sold':      'Vendida',
  'Rented':    'Alquilada'
}

statusColors: Record<string, string> = {
  'Available': 'available',
  'Sold':      'sold',
  'Rented':    'rented'
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
      error: () => {
        this.error.set('No se pudieron cargar las unidades.')
        this.loading.set(false)
      }
    })
  }

  loadBuildings() {
    this.http.get<Building[]>('http://localhost:5065/api/building').subscribe({
      next: (data) => this.buildings.set(data),
      error: (err) => console.error(err)
    })
  }

  filterByBuilding(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  this.selectedBuildingId.set(value === '' ? null : Number(value))
}

filterByStatus(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  this.selectedStatus.set(value === '' ? null : value)
}

  clearFilters() {
  this.selectedBuildingId.set(null)
  this.selectedStatus.set(null)
}

  // Al guardar la venta recargamos las unidades
  // para que las vendidas cambien su estado visualmente
  onSaleSaved() {
    this.showSaleModal.set(false)
    this.loadUnits()
  }
}