import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { LoginComponent } from './components/layout/login/login.component';
import { CarrosDetailsComponent } from './components/layout/carros/carros-details/carros-details.component';
import { PecasListComponent } from './components/layout/pecas/pecas-list/pecas-list.component';
import { PecasDetailsComponent } from './components/layout/pecas/pecas-details/pecas-details.component';
import { ClientesListComponent } from './components/layout/clientes/clientes-list/clientes-list.component';
import { ClientesDetailsComponent } from './components/layout/clientes/clientes-details/clientes-details.component';
import { VendasDetailsComponent } from './components/layout/vendas/vendas-details/vendas-details.component';
import { VendasListComponent } from './components/layout/vendas/vendas-list/vendas-list.component';
import { CarrosListComponent } from './components/layout/carros/carros-list/carros-list.component';
export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: PrincipalComponent,
    children: [
      {path: 'carros', component: CarrosListComponent},
      {path: 'carros/new', component: CarrosDetailsComponent},
      {path: 'carros/edit/:id', component: CarrosDetailsComponent},
      {path: 'pecas', component: PecasListComponent},
      {path: 'pecas/new', component: PecasDetailsComponent},
      {path: 'pecas/edit/:id', component: PecasDetailsComponent},
      {path: '', redirectTo: 'carros', pathMatch: 'full'},
      {path: 'clientes', component: ClientesListComponent},
      {path: 'clientes/new', component: ClientesDetailsComponent},
      {path: 'clientes/edit/:id', component: ClientesDetailsComponent},
      {path: 'vendas', component: VendasListComponent},
      {path: 'vendas/new', component: VendasDetailsComponent},
      {path: 'vendas/edit/:id', component: VendasDetailsComponent},
    ]
  },
];
