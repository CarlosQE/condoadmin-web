import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../shared/modal/modal';
import { RentalForm } from './rental-form/rental-form';

interface Rental {
  id: number
  tenantName: string
  tenantDNI: string
  unitNumber: string
  buildingName: string
  startDate: string
  endDate: string
  monthlyRent: number
  depositAmount: number
  creditBalance: number
  status: string
  pendingMonths: number
  totalDebt: number
}

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.html',
  styleUrl: './rentals.css',
  imports: [CommonModule, FormsModule, Modal, RentalForm]
})
export class Rentals implements OnInit {

  rentals       = signal<Rental[]>([])
  loading       = signal(true)
  error         = signal<string | null>(null)
  filter        = signal<string>('all')
  showModal     = signal(false)

  filteredRentals = computed(() => {
    const f = this.filter()
    if (f === 'all') return this.rentals()
    return this.rentals().filter(r =>
      r.status.toLowerCase() === f.toLowerCase()
    )
  })

  totalDebt = computed(() =>
    this.rentals()
      .filter(r => r.status === 'Active')
      .reduce((sum, r) => sum + r.totalDebt, 0)
  )

  totalCreditBalance = computed(() =>
    this.rentals()
      .filter(r => r.status === 'Active')
      .reduce((sum, r) => sum + r.creditBalance, 0)
  )

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadRentals()
  }

  loadRentals() {
    this.loading.set(true)
    this.error.set(null)

    this.http.get<Rental[]>('http://localhost:5065/api/rental').subscribe({
      next: (data) => {
        this.rentals.set(data)
        this.loading.set(false)
      },
      error: () => {
        this.error.set('No se pudieron cargar los contratos.')
        this.loading.set(false)
      }
    })
  }

  setFilter(f: string) {
    this.filter.set(f)
  }

  onRentalSaved() {
    this.showModal.set(false)
    this.loadRentals()
  }

  getContractProgress(startDate: string, endDate: string): number {
    const start = new Date(startDate).getTime()
    const end   = new Date(endDate).getTime()
    const now   = Date.now()

    if (now >= end)   return 100
    if (now <= start) return 0

    return Math.round(((now - start) / (end - start)) * 100)
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'Active':     'Activo',
      'Terminated': 'Terminado',
      'Cancelled':  'Cancelado'
    }
    return labels[status] ?? status
  }
}