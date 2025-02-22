import { Component, ViewChild } from '@angular/core';
import { Message } from '../../interfaces/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  @ViewChild('chatContainer') chatContainer!: HTMLDivElement;
  
  conversacion: Message[] = []
  message: string = '';

  constructor() {
    this.conversacion.push({
      author: 'User',
      content: 'Hola, necesito ayuda con mi pedido.',
      timestamp: new Date()
    });

    this.conversacion.push({
      author: 'ChatBot',
      content: 'Claro, ¿puedes proporcionarme tu número de pedido?',
      timestamp: new Date()
    });

    this.conversacion.push({
      author: 'User',
      content: 'Sí, es el 12345.',
      timestamp: new Date()
    });

    this.conversacion.push({
      author: 'ChatBot',
      content: 'Gracias. Estoy verificando la información de tu pedido.',
      timestamp: new Date()
    });

  }

  refreshScroll(){
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  sendMessage() {
    this.conversacion.push({author: 'User', content: this.message, timestamp: new Date()});
    this.message = '';
    this.simulateRespuesta();
    this.refreshScroll();
  }

  simulateRespuesta(){
    this.conversacion.push({author: 'ChatBot', content: 'Esto es una respuesta random para simular una respuesta de mi futuro bot', timestamp: new Date()});
    this.refreshScroll();
  }
}
