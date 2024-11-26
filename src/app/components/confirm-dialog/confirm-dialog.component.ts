import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
  template: `<button (click)="notifyConfirm()">Aceptar</button>
    <button (click)="notifyCancel()">Cancelar</button> `,
})
export class ConfirmDialogComponent {
  @Input() action!: string; // Propiedad para recibir datos del padre
  @Output() confirmed = new EventEmitter<boolean>();
  constructor() {}

  notifyConfirm() {
    this.confirmed.emit(true); // Emitir el evento para notificar al padre
  }
  notifyCancel() {
    this.confirmed.emit(false); // Emitir el evento para notificar al padre
  }
}
