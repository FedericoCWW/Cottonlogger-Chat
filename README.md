# Cottonlogger Chat

Aplicación open source en tiempo real, inspirada en Discord. Construida principalmente con React, Redux.js y Firebase.

🔗 **Enlace de app:** [discord-clone-fede.web.app](https://discord-clone-fede.web.app)

---

![](/public/screenshot.png)
---

## ✨ Características

- 🔐 **Autenticación** — Regístrate y inicia sesión con Email/Contraseña o Google, Twitter o Facebook
- 💬 **Mensajería en tiempo real** — Los mensajes se sincronizan instantáneamente entre todos los usuarios vía Firestore
- 😄 **Selector de emojis** — Envía emojis directamente en el chat
- 🎞️ **Soporte para GIFs** — Busca y envía GIFs impulsados por la API de Giphy
- 📁 **Canales** — Crea y cambia entre múltiples canales de chat
- 👤 **Edición de perfil** — Cambia tu nombre de visualización y foto de avatar
- 📱 **Diseño responsivo** — Funciona tanto en PC como Mobile.

---

## 🛠️ Stack tecnologico

| Tecnología | Uso |
|-----|-----|
| [React](https://reactjs.org/) | Interfaz de usuario frontend |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Gestión de estado global |
| [Firebase Auth](https://firebase.google.com/docs/auth) | Autenticación de usuarios |
| [Firestore](https://firebase.google.com/docs/firestore) | Base de datos en tiempo real |
| [Firebase Storage](https://firebase.google.com/docs/storage) | Almacenamiento de imágenes de avatar |
| [Firebase Hosting](https://firebase.google.com/docs/hosting) | Despliegue |
| [Material UI](https://mui.com/) | Componentes e iconos de UI |
| [Giphy API](https://developers.giphy.com/) | Búsqueda y envío de GIFs |
| [SCSS](https://sass-lang.com/) | Estilos |

---

## 🚀 Primeros Pasos

### Requisitos Previos
- Node.js >= 16
- Un proyecto de Firebase con Auth, Firestore y Storage habilitados

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/FedericoCWW/Cottonlogger-Chat.git
cd Cottonlogger-Chat
```

2. **Instalar dependencies**
```bash
npm install
```

3. **Configurar Firebase**

Crear `.env` en la raiz con la configuracion de Firebase:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. **Configura la API de Giphy**

En GifSelector.js, reemplaza YOUR_API_KEY_HERE con tu clave de API de Giphy [Giphy API key](https://developers.giphy.com/).

5. **Iniciar servidor**
```bash
npm start
```

Abrir: [http://localhost:3000](http://localhost:3000)
---

## 📦 Deploy

```bash
npm run build
firebase deploy
```

---

## 📁 Estructura

```
src/
├── components/
│   ├── Chat.js           # Main chat window
│   ├── ChatHeader.js     # Channel header + profile edit modal
│   ├── EmojiSelector.js  # Emoji picker
│   ├── GifSelector.js    # GIF search picker
│   ├── Message.js        # Individual message component
│   ├── Register.js       # Registration page
│   ├── Login.js          # Login page
│   ├── Sidebar.js        # Collapsible sidebar with channels
│   └── SidebarChannel.js # Individual channel item
├── features/
│   ├── appSlice.js       # Channel state
│   ├── userSlice.js      # User auth state
│   └── *.scss            # Component styles
└── firebase.js           # Firebase configuration
```

---

### Reglas Firestore
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 🤝 Colaboraciones

¡Las solicitudes de pull son bienvenidas! Para cambios importantes, por favor abrir un issue primero.

---

## 📄 Licencia

Este proyecto es open source y está disponible bajo la Licencia MIT:

Copyright 2026 - Federico Cando Wechsler

Por la presente se concede permiso, sin cargo, a cualquier persona que obtenga una copia de este software y los archivos de documentación asociados (el "Software"), para tratar el Software sin restricción, incluyendo sin limitación los derechos para usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del Software, y para permitir que las personas a quienes se les proporciona el Software lo hagan, sujeto a las siguientes condiciones:

El aviso de derechos de autor anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO, ENTRE OTRAS, LAS GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DE LOS DERECHOS DE AUTOR SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑOS U OTRAS RESPONSABILIDADES, YA SEA EN UNA ACCIÓN CONTRACTUAL, EXTRACONTRACTUAL O DE OTRO TIPO, QUE SURJA DE, SE DERIVE DE O EN RELACIÓN CON EL SOFTWARE O EL USO U OTRAS OPERACIONES EN EL SOFTWARE.



---
## Autor
**Federico** — [@FedericoCWW](https://github.com/FedericoCWW)
