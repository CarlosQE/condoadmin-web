import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Interface para cada tarjeta de estadística
interface StatCard {
  label: string
  value: number
  icon: string
  color: string
  route: string        // A dónde navega al hacer clic
}

// Interface para actividad reciente
interface RecentActivity {
  id: number
  type: 'sale' | 'rental' | 'payment' | 'maintenance'
  description: string
  date: string
  status: 'completed' | 'pending'
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [RouterLink]
})
export class Dashboard {
  // Tarjetas de resumen — datos hardcodeados por ahora
  // En Fase 3 vendrán de la API
  stats: StatCard[] = [
    {
      label: 'Edificios',
      value: 2,
      icon: '🏢',
      color: '#3498db',
      route: '/buildings'
    },
    {
      label: 'Unidades',
      value: 6,
      icon: '🏠',
      color: '#2ecc71',
      route: '/units'
    },
    {
      label: 'Residentes',
      value: 4,
      icon: '👤',
      color: '#e67e22',
      route: '/residents'
    },
    {
      label: 'Contratos activos',
      value: 1,
      icon: '📋',
      color: '#9b59b6',
      route: '/rentals'
    }
  ]

  // Actividad reciente simulada
  recentActivity: RecentActivity[] = [
    {
      id: 1,
      type: 'sale',
      description: 'Venta unidad 101 — Carlos Mamani',
      date: '28 May 2023',
      status: 'completed'
    },
    {
      id: 2,
      type: 'rental',
      description: 'Contrato alquiler unidad 201 — María Condori',
      date: '01 Ene 2025',
      status: 'completed'
    },
    {
      id: 3,
      type: 'maintenance',
      description: 'Puerta de balcón no cierra — Unidad 102',
      date: '08 Mar 2025',
      status: 'pending'
    },
    {
      id: 4,
      type: 'payment',
      description: 'Pago expensa Marzo 2025 — Carlos Mamani',
      date: '10 Mar 2025',
      status: 'pending'
    }
  ]

  // Devuelve el ícono según el tipo de actividad
  getActivityIcon(type: RecentActivity['type']): string {
    const icons = {
      sale:        '💰',
      rental:      '📋',
      payment:     '💳',
      maintenance: '🔧'
    }
    return icons[type]
  }
}