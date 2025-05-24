import { Component } from '@angular/core';
import {ProfileService} from './service/profile.service';
import Swal from 'sweetalert2';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {User} from './service/profile.service';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User = this.resetUser();
  passwordData: any = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private profileService: ProfileService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const user = this.authService.getUserFromToken();
    this.profileService.getUserByUsername(user.sub).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error al cargar datos del usuario', error);
      }
    );
  }

  updateProfile(): void {
    this.profileService.updateUser(this.user).subscribe(
      (response) => {
        Swal.fire('¡Éxito!', 'Tus datos se actualizaron correctamente', 'success');
      },
      (error) => {
        Swal.fire('Error', 'No se pudieron actualizar los datos', 'error');
      }
    );
  }

  changePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    this.profileService.changePassword(this.user.id, this.passwordData.newPassword)
      .subscribe({
        next: updatedUser => {
          alert('Contraseña actualizada correctamente');
          this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
        },
        error: err => {
          alert('Error al actualizar la contraseña');
          console.error(err);
        }
      });
  }


  resetUser() {
    return {
      username: "",
      password: "",
      name: "",
      id: 0,
      phoneNumber: "",
      email: "",
      address: "",
      roleId:2,
      roleName:"EMPLOYE",
      enabled: true
    };
  }
}
