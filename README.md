# Travel Planner ✈️

Un'applicazione web moderna per pianificare il viaggio perfetto in coppia. Progetta itinerari, gestisci budget e organizza attività con facilità.

## 📋 Descrizione del Progetto

Travel Planner è un'applicazione full-stack che permette agli utenti di:
- **Pianificare viaggi** con destinazione, date e note
- **Gestire il budget** con tracking delle spese
- **Organizzare attività** giorno per giorno
- **Sincronizzare i dati** tra frontend e backend

L'app guida l'utente attraverso 5 step per completare la pianificazione del viaggio.

## 🏗️ Architettura del Progetto

Il progetto è diviso in due cartelle principali:

```
travel-planner/
├── frontend/          # Applicazione Vue 3 + TypeScript
├── backend/           # Cloudflare Workers + Durable Objects
└── README.md          # Questo file
```

## 🚀 Tecnologie Utilizzate

### Frontend
- **Vue 3** - Framework JavaScript per UI interattive
- **TypeScript** - Type safety
- **Vite** - Build tool moderno
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management
- **PostCSS** - CSS processing

### Backend
- **Cloudflare Workers** - Serverless computing platform
- **Durable Objects** - Persistent storage per trip
- **TypeScript** - Type safety
- **Wrangler** - Cloudflare Workers CLI tool

## 📁 Struttura Frontend

```
frontend/
├── src/
│   ├── components/              # Componenti Vue riutilizzabili
│   │   ├── ProgressBar.vue     # Barra di progresso step
│   │   ├── StepActivities.vue  # Step per gestire attività
│   │   ├── StepBudget.vue      # Step per gestire budget
│   │   ├── StepDate.vue        # Step per selezionare date
│   │   ├── StepInfo.vue        # Step per info viaggio
│   │   └── Summary.vue         # Riepilogo finale
│   ├── stores/
│   │   └── tripStore.ts        # Pinia store per gestione stato
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── App.vue                 # Root component
│   ├── main.ts                 # Entry point
│   └── style.css               # Stili globali
├── index.html
├── vite.config.ts              # Configurazione Vite
├── tailwind.config.js           # Configurazione Tailwind
├── postcss.config.js            # Configurazione PostCSS
└── package.json
```

## 📁 Struttura Backend

```
backend/
├── src/
│   ├── index.ts               # Main handler Cloudflare Workers
│   └── TripStore.ts           # Durable Object per persistenza
├── wrangler.toml              # Configurazione Wrangler
└── package.json
```

## 🔌 API Endpoints

### Trips
- `POST /trip` - Crea un nuovo viaggio
- `GET /trip/:id` - Recupera un viaggio
- `PUT /trip/:id` - Aggiorna un viaggio
- `DELETE /trip/:id` - Elimina un viaggio
- `GET /health` - Health check

### Formato Trip

```typescript
interface Trip {
  id?: string;
  title: string;
  destination: string;
  country: string;
  notes?: string;
  startDate: string;
  endDate: string;
  flexible: boolean;
  totalBudget: number;
  expenses: Array<{ id: string; name: string; amount: number }>;
  activities: Array<{
    id: string;
    title: string;
    day?: number;
    cost?: number;
    notes?: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}
```

## 🛠️ Setup e Installazione

### Prerequisiti
- Node.js 18+ e npm
- Wrangler CLI (`npm install -g wrangler`)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev        # Development server
npm run build      # Build per produzione
npm run preview    # Preview della build
npm run deploy     # Deploy su Cloudflare Pages
```

### Backend Setup

```bash
cd backend
npm install
npm run dev        # Development server
npm run deploy     # Deploy su Cloudflare Workers
```

## 👥 Flusso dell'Applicazione

1. **Step 1 - Info Viaggio**: Inserisci titolo, destinazione, paese e note
2. **Step 2 - Date**: Seleziona date inizio/fine e se il viaggio è flessibile
3. **Step 3 - Budget**: Imposta il budget totale e aggiungi spese
4. **Step 4 - Attività**: Organizza attività giorno per giorno
5. **Step 5 - Riepilogo**: Rivedi tutti i dati e conferma

## 🎨 Design

L'applicazione utilizza:
- Gradient background (pink → purple → blue)
- Componenti arrotondati con shadow
- Transizioni smooth tra gli step
- Icone SVG inline
- Responsive design mobile-first

## 📝 State Management

Lo store Pinia (`tripStore.ts`) gestisce:
- Dati attuali del viaggio
- Step corrente
- Validazioni di progresso
- Comunicazione con il backend

## 🔐 CORS

Tutti gli endpoint backend includono headers CORS per permettere richieste dal frontend:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## 🚢 Deployment

### Frontend (Cloudflare Pages)
```bash
cd frontend
npm run deploy
```

### Backend (Cloudflare Workers)
```bash
cd backend
npm run deploy
```

## 📄 Licenza

MIT

## 👨‍💻 Autore

Progetto sviluppato da Alessio Zanella

---

**Buon viaggio! ✈️🌍**
