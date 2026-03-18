import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public success(title: string, text?: string): void {
    Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonText: 'Genial'
    });
  }

  public error(title: string, text?: string): void {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText: 'Entendido'
    });
  }

  public warning(title: string, text?: string): void {
    Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonText: 'Aceptar'
    });
  }

  public info(title: string, text?: string): void {
    Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonText: 'Vale'
    });
  }

  public async confirm(title: string, text?: string): Promise<boolean> {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    });

    return result.isConfirmed;
  }

  public toast(title: string, icon: SweetAlertIcon = 'success'): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon,
      title
    });
  }
}
