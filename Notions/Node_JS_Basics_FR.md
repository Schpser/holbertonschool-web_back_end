# 🚀 Les Bases de Node.js

## 🎯 Introduction : Qu'est-ce que Node.js ?

**Node.js** est un environnement d'exécution JavaScript côté serveur qui permet d'exécuter du code JavaScript en dehors du navigateur.

### Caractéristiques principales
- ⚡ **Moteur V8** : Utilise le même moteur JavaScript que Google Chrome
- 🔄 **Architecture asynchrone** : Modèle à processus unique avec des E/S non bloquantes
- 🌐 **Haute concurrence** : Capable de gérer des milliers de connexions simultanées
- 📦 **Écosystème riche** : Accès à des millions de packages via npm

---

## 1️⃣ Exécuter du JavaScript avec Node.js

### 🏃 Commande de base
```bash
node server.js
```

### 💡 Points clés
- Node.js exécute les fichiers JavaScript directement depuis le terminal
- Le moteur V8 compile le JavaScript en code machine natif pour de meilleures performances
- L'architecture événementielle permet de gérer l'asynchronisme efficacement

---

## 2️⃣ Modules Node.js et Système de Fichiers

### 📥 Importation de modules (CommonJS)
```javascript
const http = require('node:http');
const fs = require('node:fs');
```

### 📤 Exportation de modules
```javascript
// Exporter une fonction
module.exports = myFunction;

// Exporter plusieurs éléments
module.exports = {
  functionOne,
  functionTwo,
  myClass
};
```

### 📁 Module fs (File System)

| Méthode | Usage |
|---------|-------|
| `fs.createWriteStream()` | Crée un flux d'écriture pour manipuler des fichiers |
| `fs.openSync()` | Ouvre un fichier de manière synchrone |
| `fs.readFile()` | Lit le contenu d'un fichier de manière asynchrone |
| `fs.writeFile()` | Écrit dans un fichier de manière asynchrone |

⚠️ **Attention** : Préférez les méthodes asynchrones pour ne pas bloquer l'event loop !

---

## 3️⃣ L'Objet process : CLI et Environnement

L'objet `process` est **global** et accessible partout sans import.

### 📋 Arguments de ligne de commande (`process.argv`)

```javascript
// Commande: node script.js arg1 arg2
console.log(process.argv);
// [
//   '/usr/bin/node',        // [0] Chemin de l'exécutable Node
//   '/path/to/script.js',   // [1] Chemin du fichier exécuté
//   'arg1',                 // [2] Premier argument
//   'arg2'                  // [3] Deuxième argument
// ]
```

### 🌍 Variables d'environnement (`process.env`)

```javascript
// Lire une variable d'environnement
const port = process.env.PORT || 3000;

// Définir une variable (visible uniquement dans le processus actuel)
process.env.NODE_ENV = 'production';
```

### 🍳 Analogie : L'objet process

Imaginez que votre application Node.js est un **ouvrier dans une usine** 👷‍♂️

```
Application Node.js (Ouvrier)
    ├── process.argv 📋 → Liste d'instructions reçues au début de la journée
    ├── process.env 🌡️ → Conditions ambiantes de l'usine (température, outils)
    └── process.exit() 🚪 → Sortie de l'usine à la fin du travail
```

---

## 4️⃣ Serveur HTTP : Natif vs Express

### 🔧 Serveur HTTP Natif (`node:http`)

```javascript
const http = require('node:http');

const server = http.createServer((req, res) => {
  // req : Objet de requête (headers, données, URL, méthode)
  // res : Objet de réponse
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### ⚡ Serveur Express.js

| Aspect | HTTP Natif | Express.js |
|--------|-----------|-----------|
| Installation | Intégré à Node.js | `npm install express` |
| Configuration | Manuelle | Simplifiée |
| Routage | À implémenter soi-même | Intégré et puissant |
| Middlewares | À créer manuellement | Écosystème riche |
| Version requise | - | Node.js 18+ pour Express 5.x |

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

💡 **Avantage Express** : Simplifie grandement le routage et la gestion des middlewares !

---

## 5️⃣ Développement Rapide avec Nodemon

**nodemon** surveille les changements de fichiers et redémarre automatiquement le serveur.

### 📦 Installation
```bash
npm install --save-dev nodemon
```

### 🚀 Utilisation
```bash
# Au lieu de
node server.js

# Utilisez
nodemon server.js
```

### ⚙️ Astuces pratiques

| Commande | Action |
|----------|--------|
| `rs` (dans le terminal) | Redémarre manuellement le serveur |
| Configuration par défaut | Ignore `node_modules` et `.git` |
| `--watch` flag | Surveille des dossiers spécifiques |

---

## 6️⃣ ES6, Babel et Tests

### 🎨 Babel : Transpilation ES6

Pour utiliser les fonctionnalités ES6 modernes (`import`/`export`) avec Node.js :

```javascript
// ES6 (avec Babel)
import http from 'node:http';
export default myFunction;

// CommonJS (natif Node.js)
const http = require('node:http');
module.exports = myFunction;
```

**Configuration** : Utilisez `babel-node` ou l'option `--require` pour enregistrer Babel.

### 🧪 Tests avec Jest/Mocha

| Framework | Avantages |
|-----------|-----------|
| **Jest** | Batteries incluses, mocking facile, snapshot testing |
| **Mocha** | Flexible, supporte callbacks, Promises et async/await |

```javascript
// Test asynchrone avec Jest
test('async operation', async () => {
  const data = await fetchData();
  expect(data).toBe('value');
});
```

### ✅ Linting avec ESLint

ESLint garantit la qualité et la cohérence du code selon des règles définies.

```bash
# Vérifier le code
npm run lint

# Corriger automatiquement
npm run lint -- --fix
```

---

## ⚠️ Exigences du Projet

### 📋 Checklist

| Élément | Détail |
|---------|--------|
| **Environnement** | Ubuntu 20.04 LTS + Node v20.x.x |
| **Fichiers requis** | `package.json`, `babel.config.js`, `.eslintrc.js`, `database.csv`, `README.md` |
| **Extensions** | Tous les fichiers doivent utiliser `.js` |
| **Formatage** | Chaque fichier doit se terminer par une nouvelle ligne |
| **Validation complète** | `npm run full-test` (tests + lint) |

### 🎯 Commande de validation finale
```bash
npm run full-test
```

Cette commande exécute :
1. ✅ Les tests (Jest)
2. ✅ Le linter (ESLint)

---

## 📚 Récapitulatif Visuel

```
Node.js Application 🚀
    │
    ├── Exécution ⚡
    │   └── node script.js
    │
    ├── Modules 📦
    │   ├── require() → Import
    │   └── module.exports → Export
    │
    ├── Process 🌍
    │   ├── process.argv → Arguments CLI
    │   └── process.env → Variables d'env
    │
    ├── Serveur 🌐
    │   ├── HTTP natif → node:http
    │   └── Express → Framework simplifié
    │
    ├── Dev Tools 🛠️
    │   ├── nodemon → Auto-restart
    │   ├── Babel → Transpilation ES6
    │   ├── Jest/Mocha → Tests
    │   └── ESLint → Linting
    │
    └── Validation ✅
        └── npm run full-test
```