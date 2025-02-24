import { AfterContentInit, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../../interfaces/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateMLCEngine, MLCEngine } from "@mlc-ai/web-llm";
import { max } from 'rxjs';

const SELECTED_ENGINE = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

const MODEL_CONFIG = {
  maxTokens: 100,
  temperature: 0.7,
}

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements AfterViewInit{

  infoText: string = "";
  engine: MLCEngine | null = null;
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('sendButton') sendButton!: ElementRef;

  conversacion: Message[] = []
  message: string = '';

  constructor() {
   
  }
  ngAfterViewInit(): void {
    //this.testConversation();
    this.initMLCEngine();
  }



  /**
   * Initialize the MLC Engine
   * This method is called when the component is created
   * and initializes the MLC Engine with the selected model.
   * The engine is stored in the component's state (SELECTED_ENGINE).
   */
  initMLCEngine() {
    const initProgressCallback = (progress: any) => {
      this.writeInfoText(`${progress.text}`);
      if(progress.progress === 1) {
        this.writeInfoText("Model loaded successfully!");
        this.sendButton.nativeElement.disabled = false

      }
    }

    CreateMLCEngine(
      SELECTED_ENGINE,
      { initProgressCallback },
      MODEL_CONFIG
    ).then((engine: MLCEngine) => {
      console.log("Model loaded successfully!");
      this.engine = engine;
      this.conversacion.push(
        {
          author: 'ChatBot',
          content: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?',
          timestamp: new Date()
        }
      )
    }).catch((error: any) => {
      console.error("Error loading model:", error);
    });
  }

  refreshScroll() {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }

  sendMessage_old() {
    this.conversacion.push({ author: 'User', content: this.message, timestamp: new Date() });
    this.message = '';
    this.simulateRespuesta();
    this.refreshScroll();
  }

  async sendMessage() {

    if(this.message === '') return;
    console.log("Sending message:");
    this.conversacion.push({ author: 'User', content: this.message, timestamp: new Date() });
    //Se mapean los mensajes de la conversación a un formato que acepta el modelo
    const messages: any = this.conversacion.map((msg) => {
      return {
        content: msg.content,
        role: msg.author === 'User' ? 'user' : 'assistant'
      }});
    console.log("Messages:", messages);

    //Se envía el mensaje al modelo
    const chunks = await this.engine?.chat.completions.create(
      {
        messages: messages,
        stream: true,
      }
    )

    let botMessageIndex = this.conversacion.push({ author: 'ChatBot', content: '', timestamp: new Date() })

    if (chunks) {
      for await (const chunk of chunks) {
        if(!(chunk.choices[0].finish_reason === "stop"))
          this.conversacion[botMessageIndex - 1].content += chunk.choices[0].delta.content;
        
        console.log(chunk.choices);
        this.refreshScroll();
      }
    }
    

    this.message = '';
  }

  simulateRespuesta() {
    this.conversacion.push({ author: 'ChatBot', content: 'Esto es una respuesta random para simular una respuesta de mi futuro bot', timestamp: new Date() });
    this.refreshScroll();
  }

  testConversation() {
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

  writeInfoText(text: string) {
    this.infoText = text;
  }
}
