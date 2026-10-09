import { Routes } from '@angular/router';
import { roleGuard } from './service/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./component/landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./component/auth/auth.component').then((m) => m.AuthComponent),
    data: { mode: 'login' },
  },
  {
    path: 'register',
    loadComponent: () => import('./component/auth/auth.component').then((m) => m.AuthComponent),
    data: { mode: 'signup' },
  },
  {
    path: 'customer',
    canActivate: [roleGuard('customer')],
    loadComponent: () =>
      import('./component/shared/components/customer-layout.component').then((m) => m.CustomerLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      {
        path: 'products',
        loadComponent: () =>
          import('./component/spare-parts/products.component').then((m) => m.ProductsComponent),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./component/spare-parts/product-detail.component').then((m) => m.ProductDetailComponent),
      },
      {
        path: 'cart',
        loadComponent: () => import('./component/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./component/orders/checkout.component').then((m) => m.CheckoutComponent),
      },
      {
        path: 'orders',
        loadComponent: () => import('./component/orders/orders.component').then((m) => m.OrdersComponent),
      },
      {
        path: 'emergencies/request',
        loadComponent: () =>
          import('./component/emergency/emergency-request.component').then((m) => m.EmergencyRequestComponent),
      },
      {
        path: 'emergencies',
        loadComponent: () =>
          import('./component/emergency/my-emergencies.component').then((m) => m.MyEmergenciesComponent),
      },
      {
        path: 'vehicles',
        loadComponent: () =>
          import('./component/vehicles/vehicles.component').then((m) => m.VehiclesComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./component/users/profile.component').then((m) => m.ProfileComponent),
      },
    ],
  },
  {
    path: 'technician',
    canActivate: [roleGuard('technician')],
    loadComponent: () =>
      import('./component/shared/components/tech-layout.component').then((m) => m.TechLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./component/technicians/tech-dashboard.component').then((m) => m.TechDashboardComponent),
      },
      {
        path: 'emergencies',
        loadComponent: () =>
          import('./component/emergency/available-emergencies.component').then(
            (m) => m.AvailableEmergenciesComponent,
          ),
      },
      {
        path: 'current',
        loadComponent: () =>
          import('./component/emergency/current-emergency.component').then((m) => m.CurrentEmergencyComponent),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./component/emergency/emergency-history.component').then((m) => m.EmergencyHistoryComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./component/technicians/tech-profile.component').then((m) => m.TechProfileComponent),
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [roleGuard('admin')],
    loadComponent: () =>
      import('./component/shared/components/admin-layout.component').then((m) => m.AdminLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./component/admin/admin-dashboard.component').then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./component/users/user-management.component').then((m) => m.UserManagementComponent),
      },
      {
        path: 'technicians',
        loadComponent: () =>
          import('./component/technicians/technician-management.component').then(
            (m) => m.TechnicianManagementComponent,
          ),
      },
      {
        path: 'emergencies',
        loadComponent: () =>
          import('./component/emergency/emergency-management.component').then(
            (m) => m.EmergencyManagementComponent,
          ),
      },
      {
        path: 'emergencies/:id',
        loadComponent: () =>
          import('./component/emergency/emergency-management.component').then(
            (m) => m.EmergencyManagementComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./component/spare-parts/products-management.component').then((m) => m.ProductsManagementComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./component/orders/orders-management.component').then((m) => m.OrdersManagementComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
