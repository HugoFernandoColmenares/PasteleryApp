import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class Notification {
  // --- Alerts (Blocking Modals) ---
  showAlertSuccess(message: string, title: string = '¡Logrado!') {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonColor: '#D4A5A5' // Matching pastry shop theme
    });
  }

  showAlertError(message: string, title: string = 'Hubo un error') {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: '#6B4F4F'
    });
  }

  showAlertWarning(message: string, title: string = 'Atención') {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonColor: '#6B4F4F'
    });
  }

  // --- Confirmations ---
  confirm(message: string, title: string = '¿Estás seguro?') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#D4A5A5',
      cancelButtonColor: '#6B4F4F'
    });
  }
}
