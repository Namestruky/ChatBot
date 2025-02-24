import { AfterContentInit, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../../interfaces/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateMLCEngine, MLCEngine } from "@mlc-ai/web-llm";

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
export class ChatComponent implements AfterViewInit {

  infoText: string = "";
  engine: MLCEngine | null = null;
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('sendButton') sendButton!: ElementRef;

  conversacion: Message[] = []
  message: string = '';

  constructor() {

  }
  ngAfterViewInit(): void {
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
      if (progress.progress === 1) {
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


  /**
   * Refresh the chat scroll to show the latest messages at the bottom
   */
  refreshScroll() {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }


  /**
   * Send a message to the chat
   * This method is called when the user sends a message
   * and sends the message to the MLC Engine to get a response.
   * The response is then added to the conversation.
   */
  async sendMessage() {
    if (this.message === '') return;

    //Add the user message to the conversation
    this.conversacion.push({ author: 'User', content: this.message, timestamp: new Date() });

    //Map the conversation to the format expected by the model
    const messages: any = this.conversacion.map((msg) => {
      return {
        content: msg.content,
        role: msg.author === 'User' ? 'user' : 'assistant'
      }
    });

    //Send all messages to the model and get the response
    const chunks = await this.engine?.chat.completions.create(
      {
        messages: messages,
        stream: true,
      }
    )

    //Add a new empty message to the conversation
    let botMessageIndex = this.conversacion.push({ author: 'ChatBot', content: '', timestamp: new Date() })

    //Each time the model sends a message, it is added to the new message
    if (chunks) {
      for await (const chunk of chunks) {
        if (!(chunk.choices[0].finish_reason === "stop"))
          this.conversacion[botMessageIndex - 1].content += chunk.choices[0].delta.content;

        console.log(chunk.choices);
        this.refreshScroll();
      }
    }

    //Clear the input
    this.message = '';
  }

  /**
   * Write an info text to the chat
   * This method is called when the component needs to write an info text to the chat.
   * The info text is shown to the user.
   * @param text The text to write to the chat
   * @returns void
   */
  writeInfoText(text: string) {
    this.infoText = text;
  }
}
