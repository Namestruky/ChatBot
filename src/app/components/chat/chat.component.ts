import { Component, ViewChild } from '@angular/core';
import { Message } from '../../interfaces/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateMLCEngine, MLCEngine  } from "@mlc-ai/web-llm";

const SELECTED_ENGINE = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  engine: any;
  @ViewChild('chatContainer') chatContainer!: HTMLDivElement;
  
  conversacion: Message[] = []
  message: string = '';

  constructor() {
    this.testConversation();
    //this.initMLCEngine();
  }

  /**
   * Initialize the MLC Engine
   * This method is called when the component is created
   * and initializes the MLC Engine with the selected model.
   * The engine is stored in the component's state (SELECTED_ENGINE).
   */
  initMLCEngine() {
    const initProgressCallback = (progress: any) => {
      console.log("Model loading progress:", progress);
    }

    this.engine = CreateMLCEngine(SELECTED_ENGINE, { initProgressCallback }).then((engine: MLCEngine) => {
      console.log("Model loaded successfully!");
      this.engine = engine;
    }).catch((error: any) => {
      console.error("Error loading model:", error);
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

  testConversation(){
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
}
