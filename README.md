# ChatBot

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 19.0.5.

## Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté en funcionamiento, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques alguno de los archivos fuente.

## Generación de código

Angular CLI incluye herramientas poderosas para la generación de código. Para generar un nuevo componente, ejecuta:

```bash
ng generate component nombre-del-componente
```

Para obtener una lista completa de los esquemas disponibles (como `components`, `directives` o `pipes`), ejecuta:

```bash
ng generate --help
```

## Construcción

Para construir el proyecto, ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los artefactos de construcción en el directorio `dist/`. Por defecto, la construcción en producción optimiza tu aplicación para rendimiento y velocidad.

## Ejecución de pruebas unitarias

Para ejecutar pruebas unitarias con el corredor de pruebas [Karma](https://karma-runner.github.io), usa el siguiente comando:

```bash
ng test
```

## Ejecución de pruebas end-to-end

Para pruebas end-to-end (e2e), ejecuta:

```bash
ng e2e
```

Angular CLI no incluye un marco de pruebas end-to-end por defecto. Puedes elegir uno que se adapte a tus necesidades.

## Recursos adicionales

Para más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visita la página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

## Descripción del Proyecto

Este proyecto es un ChatBot que utiliza el motor MLC para generar respuestas automáticas. El ChatBot está diseñado para interactuar con los usuarios y proporcionar respuestas basadas en el modelo de lenguaje seleccionado.

### Estructura del Proyecto

- **src/app/components/chat/chat.component.ts**: Componente principal del ChatBot.
- **src/app/interfaces/message.ts**: Interfaz para los mensajes del chat.
- **src/app/app.component.ts**: Componente raíz de la aplicación.
- **src/app/app.config.ts**: Configuración de la aplicación.
- **src/app/app.routes.ts**: Rutas de la aplicación.

### Configuración del Motor MLC

El motor MLC se inicializa en el método `initMLCEngine` del componente `ChatComponent`. El motor se carga con el modelo seleccionado y se utiliza para generar respuestas automáticas en el chat.

### Envío de Mensajes

El método `sendMessage` se utiliza para enviar mensajes al chat. Este método agrega el mensaje del usuario a la conversación, envía todos los mensajes al modelo y obtiene la respuesta. La respuesta se agrega a la conversación y se muestra en el chat.

### Estilos

Los estilos de la aplicación se definen en archivos SCSS. Los estilos globales se encuentran en `src/styles.scss` y los estilos específicos del componente de chat se encuentran en `src/app/components/chat/chat.component.scss`.

### Requisitos

- Node.js
- Angular CLI

### Instalación

Para instalar las dependencias del proyecto, ejecuta:

```bash
npm install
```

### Ejecución

Para ejecutar la aplicación, utiliza:

```bash
ng serve
```

### Construcción

Para construir la aplicación para producción, utiliza:

```bash
ng build --prod
```

### Pruebas

Para ejecutar las pruebas unitarias, utiliza:

```bash
ng test
```

Para ejecutar las pruebas end-to-end, utiliza:

```bash
ng e2e
```