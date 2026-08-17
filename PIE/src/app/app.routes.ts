import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { LoginComponent } from './components/layout/login/login.component';
import { CarrosDetailsComponent } from './components/layout/carros/carros-details/carros-details.component';
import { PecasComponent } from './pecas/pecas.component';
import { ClientesListComponent } from './components/layout/clientes/clientes-list/clientes-list.component';
import { ClientesDetailsComponent } from './components/layout/clientes/clientes-details/clientes-details.component';
import { VendasCarrosDetailsComponent } from './components/layout/vendas/vendasCarros/vendas-carros-details/vendas-carros-details.component';
import { VendasCarrosListComponent } from './components/layout/vendas/vendasCarros/vendas-carros-list/vendas-carros-list.component';
import { VendasPecasDetailsComponent } from './components/layout/vendas/vendasPecas/vendas-pecas-details/vendas-pecas-details.component';
import { VendasPecasListComponent } from './components/layout/vendas/vendasPecas/vendas-pecas-list/vendas-pecas-list.component';
import { CarroslistComponent } from './components/layout/carros/carroslist/carroslist.component';
import { Component } from '@angular/core';


export const routes : Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: PrincipalComponent,
    children: [
      {path: 'carros', component: CarroslistComponent},
      {path: 'carros/new', component: CarrosDetailsComponent},
      {path: 'carros/edit/:id', component: CarrosDetailsComponent},
      { path: 'pecas', component: PecasComponent },
      {path: 'clientes', component: ClientesListComponent},
      {path: 'clientes/new', component: ClientesDetailsComponent},
      {path: 'clientes/edit/:id', component: ClientesDetailsComponent},
      {path: 'vendas', component: VendasCarrosListComponent},
      {path: 'vendas/new', component: VendasCarrosDetailsComponent},
      {path: 'vendas/edit/:id', component: VendasCarrosDetailsComponent},
      {path: 'vendas', component:  VendasPecasListComponent},
      {path: 'vendas/new', component: VendasPecasDetailsComponent},
      {path: 'vendas/edit/:id', component: VendasPecasDetailsComponent}
    ]
  }
];
