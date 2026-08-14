import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Módulos do MDB Angular
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Usuario } from '../../../models/usuario';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MdbFormsModule, MdbCheckboxModule, MdbRippleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router = inject(Router);
  usuario: Usuario = new Usuario();

  submit(): void{
    if(this.usuario.nome === 'admin' && this.usuario.cofre === 'admin') {
      this.router.navigate(['dashboard/carros']);
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  }
}
