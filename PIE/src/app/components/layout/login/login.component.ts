import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Módulos do MDB Angular
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MdbFormsModule, MdbCheckboxModule, MdbRippleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
