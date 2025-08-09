<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
    <img src="public/bot.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Chat MSW</h3>

  <p align="center">
    Aplicativo tipo chat que permita a los usuarios realizar consultas autónomas sobre la empresa (organigrama, misión, visión, proyectos, etc.) y recibir respuestas generadas automáticamente.
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de Contenido</summary>
  <ol>
    <li>
      <a href="#acerca-del-proyecto">Acerca del Proyecto</a>
      <ul>
        <li><a href="#tecnologias">Tecnologias</a></li>
      </ul>
    </li>
    <li>
      <a href="#instrucciones">Instrucciones</a>
      <ul>
        <li><a href="#pre-requisitos">Pre requisitos</a></li>
        <li><a href="#instalacion">Instalacion</a></li>
      </ul>
    </li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Acerca del Proyecto

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Desarrollar una aplicación web con chat integrado, donde los usuarios puedan realizar consultas sobre la empresa, enviar archivos, revisar historiales y continuar conversaciones anteriores. Todo debe operar sobre una arquitectura moderna basada en Next.js 15 y stack de herramientas asociadas.

<p align="right">(<a href="#readme-top"> ir arriba </a>)</p>



### Tecnologias

El proyecto se desarrollo con las siguientes tecnologias:

* [![Next][Next.js]][Next-url]
* [![Typescript][Typescript]][Typescript-url]
* [![React Query][ReactQuery]][ReactQuery-url]
* [![Tailwind][Tailwind]][Tailwind-url]
* [![SHADCN][SHADCN]][SHADCN-url]

<p align="right">(<a href="#readme-top"> ir arriba </a>)</p>

<!-- GETTING STARTED -->
## Instrucciones

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Pre requisitos

Instalación del gestor de paquetes pnpm
* pnpm
  ```sh
  npm install -g pnpm@latest-10
  ```

### Instalacion

Instalación y configuracion del proyecto

1. Clonar el repositorio
   ```sh
   git clone https://github.com/mrojas-fullstack/reto-alicorp.git
   ```
2. Crear el archivo .env file
   ```sh
   NODE_ENV='development'
   ```
3. Instalar los paquetes PNPM
   ```sh
   pnpm install
   pnpm run dev
   ```

<p align="right">(<a href="#readme-top"> ir arriba </a>)</p>

<!-- USAGE EXAMPLES -->
## Uso

El dashboard cuenta con un sidebar, donde tenemos:

* Opciones principales
  * Crear nuevo chat
  * Buscar en chats
* Historial
  * Lista de chats

Luego tenemos la sección donde se realiza la conversacion entre el servidor y el cliente.

La aplicacion cuenta con las siguientes funcionalidades:

* Chat Interactivo
  * Los usuarios pueden iniciar un nuevo chat y realizar consultas de forma libre.
  * Las respuestas serán generadas por una API externa simulada (mockeada con MSW).
  * El usuario podrá adjuntar archivos:
    * Imágenes (JPG, PNG): Se renderizan directamente en el chat.
    * Videos (MP4) y documentos (PDF): Se muestran como enlaces para descarga.

* Historial de Chats
  * Visualización del historial completo de chats.
  * Cada entrada del historial es accesible para ver todo el contenido anterior.
  * Posibilidad de continuar una conversación desde donde se dejó.

* Búsqueda en Historial
  * El historial puede ser filtrado usando un buscador.
  * El sistema mostrará resultados basados en coincidencias con el contenido textual de los mensajes.

* Gestión de Conversaciones
  * Los usuarios pueden eliminar cualquier conversación del historial.

<p align="right">(<a href="#readme-top"> ir arriba </a>)</p>

<!-- CONTACT -->
## Contacto

Miguel Rojas - [@mrojas](https://www.linkedin.com/in/miguel-rojas-a82614286/) - mrojas.fullstack@gmail.com

Project Link: [https://github.com/mrojas-fullstack/reto-alicorp](https://github.com/mrojas-fullstack/reto-alicorp)

<p align="right">(<a href="#readme-top"> ir arriba </a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: public/project.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Typescript]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge
[Typescript-url]: https://www.typescriptlang.org/
[ReactQuery]: https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white
[ReactQuery-url]: https://tanstack.com/query/latest
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC
[Tailwind-url]: https://tailwindcss.com/
[SHADCN]:https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge
[SHADCN-url]: https://tailwindcss.com/