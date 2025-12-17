# 🔄 GESTION DE L'ASYNCHRONISME EN JAVASCRIPT

## 🎯 Introduction : Le Problème de l'Asynchronisme

JavaScript est un langage à **thread unique**. Cela signifie que deux scripts ne peuvent pas s'exécuter simultanément ; ils doivent s'exécuter l'un après l'autre. Dans les navigateurs, JavaScript partage son thread avec d'autres tâches comme la peinture, la mise à jour des styles et la gestion des actions utilisateur. 

⚠️ **Le problème** : Si une opération prend trop de temps (une requête réseau, par exemple), elle peut bloquer le thread principal, rendant l'interface utilisateur non réactive—ce que l'on veut absolument éviter.

### Évolution des solutions
- ❌ **Callbacks** : Traditionnellement utilisés, mais peuvent mener au "callback hell"
- ⚡ **Événements** : Pas toujours la meilleure solution pour gérer une réussite ou un échec asynchrone unique
- ✅ **Promesses** : Simplifient les calculs différés et asynchrones, représentent une opération qui n'est pas encore terminée

---

# 🤝 I. Les Objets Promise

L'objet **Promise** est un proxy pour une valeur qui n'est pas nécessairement connue au moment de la création de la promesse. Il permet d'associer des gestionnaires (handlers) à la valeur de succès ou à la raison d'échec éventuelle d'une action asynchrone.

## 1️⃣ Terminologie et États des Promesses

Une promesse passe par plusieurs états au cours de son cycle de vie. ⚠️ **Une fois qu'une promesse est réglée (réalisée ou rejetée), elle ne peut plus changer d'état.**

| Terme Français | Terme Anglais | Emoji | Définition |
|---|---|---|---|
| **En attente** | `Pending` | ⏳ | L'état initial, ni réalisée ni rejetée |
| **Réalisée** | `Fulfilled` | ✅ | L'action asynchrone associée à la promesse a réussi |
| **Rejetée** | `Rejected` | ❌ | L'action asynchrone associée à la promesse a échoué |
| **Réglée** | `Settled` | 🏁 | La promesse est soit réalisée, soit rejetée (mais pas en attente) |

💡 **Avantage** : Si une promesse a déjà été réalisée ou rejetée au moment où vous lui ajoutez un gestionnaire, le rappel approprié sera appelé, ce qui évite les conditions de concurrence (race conditions) des systèmes de rappels précédents.
---

## 2️⃣ Création et Consommation des Promesses

### 🏗️ Création (Constructeur Promise)

Pour créer une nouvelle promesse, vous utilisez le constructeur `Promise()`, généralement pour encapsuler des fonctions asynchrones qui n'utilisent pas encore de promesses (comme l'ancienne API `XMLHttpRequest`).

Le constructeur prend une fonction d'exécution (executor) avec deux arguments : `resolve` et `reject` :

```javascript
const promise = new Promise((resolve, reject) => {
  // Faites une action, possiblement asynchrone...
  if (/* tout s'est bien passé */) {
    resolve("Stuff worked!"); // ✅ Succès
  } else {
    reject(Error("It broke")); // ❌ Échec (toujours rejeter avec un objet Error)
  }
});
```
### 🔗 Consommation (Chaînage de Promesses)

Les méthodes `.then()`, `.catch()`, et `.finally()` sont utilisées pour associer des actions ultérieures à une promesse qui se règle.

#### `.then()` - Gérer le succès (et l'échec)

- ✅ Prend deux arguments optionnels : un rappel pour la réussite et un autre pour l'échec
- 🔄 **Chaînage de valeurs** : Vous pouvez transformer des valeurs en renvoyant simplement la nouvelle valeur à partir d'un rappel `then()`. Le `then()` suivant reçoit cette nouvelle valeur
- ⏳ **Chaînage d'actions asynchrones** : Si vous renvoyez une autre promesse depuis un bloc `then()`, le `then()` suivant attendra que cette nouvelle promesse soit réglée avant d'être appelé

```javascript
maPromesse
  .then(result => {
    // Traitement du succès
    return result * 2;
  })
  .then(newResult => {
    // Nouveau traitement
    console.log(newResult);
  });
```

#### `.catch()` - Gérer les erreurs

- ❌ Fonction qui gère le rejet de la promesse
- 🍬 Sucre syntaxique pour `then(undefined, func)`, mais plus lisible
- 📤 **Propagation des rejets** : Les rejets de promesse sont transmis à la fonction `then()` suivante qui dispose d'un rappel de rejet (ou `catch()`). Toute erreur levée (via `throw`) dans un callback rejette implicitement la promesse

```javascript
maPromesse
  .then(result => result * 2)
  .catch(error => {
    // Gestion d'erreur centralisée
    console.error('Erreur:', error);
  });
```

#### `.finally()` - Code de nettoyage

- 🧹 Ajoute un gestionnaire appelé lorsque la promesse est réglée (réalisée ✅ ou rejetée ❌)
- 💡 Utile pour exécuter du code de nettoyage, comme masquer un indicateur de chargement (spinner)

```javascript
maPromesse
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => {
    // Code de nettoyage
    hideSpinner();
  });
```
---

## 3️⃣ Méthodes Statiques de Concurrence

La classe `Promise` offre plusieurs méthodes statiques pour orchestrer la concurrence entre plusieurs tâches asynchrones.

| Méthode | Emoji | Description | Comportement |
|---|---|---|---|
| `Promise.all()` | 🎯 | **Toutes ou rien** | Se réalise quand **toutes** les promesses se réalisent. Rejette dès qu'**une seule** rejette |
| `Promise.race()` | 🏃 | **La première gagne** | Se règle avec l'état de la **première** promesse qui se règle |
| `Promise.any()` | 🎲 | **Au moins une** | Se réalise dès qu'**une seule** se réalise. Rejette si **toutes** rejettent |
| `Promise.allSettled()` | 📊 | **Toutes, avec détails** | Se réalise quand **toutes** sont réglées, avec un tableau des résultats (succès ✅ ou échec ❌) |

### Exemples pratiques

```javascript
// Promise.all - Attendre plusieurs opérations
const promises = [fetch('/api/users'), fetch('/api/posts'), fetch('/api/comments')];
Promise.all(promises)
  .then(([users, posts, comments]) => {
    // Toutes les requêtes ont réussi ✅
  })
  .catch(error => {
    // Au moins une requête a échoué ❌
  });

// Promise.race - Timeout ou requête la plus rapide
Promise.race([
  fetch('/api/data'),
  new Promise((_, reject) => setTimeout(() => reject('Timeout'), 5000))
])
  .then(data => console.log('Données reçues'))
  .catch(error => console.log('Trop lent ou erreur'));

// Promise.allSettled - Récupérer tous les résultats
const results = await Promise.allSettled(promises);
results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`Promesse ${index}: ✅`, result.value);
  } else {
    console.log(`Promesse ${index}: ❌`, result.reason);
  }
});
```

---

# ⚡ II. Async et Await (Simplification)

Les fonctions `async` et l'opérateur `await` sont des ajouts plus récents (ES2017+) qui se basent sur les promesses pour rendre le code asynchrone plus facile à lire et à écrire.

## 1️⃣ `async function` - Déclarer une fonction asynchrone

La déclaration `async function` crée une fonction asynchrone. **Ces fonctions retournent toujours une `Promise`.**

### Comportement

| Cas | Résultat |
|---|---|
| ✅ Retourne une valeur | Valeur implicitement enveloppée dans `Promise.resolve()` |
| ❌ Lève une exception (`throw`) | Promesse implicitement rejetée avec cette exception |
| ⏳ Contient `await` | L'exécution peut être suspendue |

```javascript
// Fonction async simple
async function getData() {
  return "Hello"; // Équivalent à : return Promise.resolve("Hello");
}

// Utilisation
getData().then(result => console.log(result)); // "Hello"

// Avec exception
async function failingFunction() {
  throw new Error("Something went wrong"); // Rejette la promesse
}

failingFunction().catch(error => console.error(error));
```
---

## 2️⃣ L'opérateur `await` - Attendre une promesse

L'opérateur `await` ne peut être utilisé qu'à l'intérieur d'une fonction `async` (ou au niveau supérieur d'un module).

### Caractéristiques

| Aspect | Description |
|---|---|
| 🎯 **Rôle** | Attendre qu'une Promesse se règle et obtenir sa valeur de réalisation |
| ⏸️ **Suspension** | L'exécution de la fonction `async` englobante est suspendue jusqu'à ce que la promesse soit réalisée ou rejetée |
| 🚫 **Non-bloquant** | Le thread principal n'est **pas** bloqué (autres opérations continuent) |
| 📝 **Syntaxe** | Rend les fonctions basées sur les promesses utilisables comme si elles étaient synchrones |

### Exemple d'utilisation

```javascript
async function asyncCall() {
  console.log('Début');
  
  // ⏸️ L'exécution s'interrompt ici jusqu'à ce que la promesse se réalise
  const result = await resolveAfter2Seconds();
  
  console.log(result); // La valeur de réalisation de la promesse
  console.log('Fin');
}

// Exemple pratique avec fetch
async function getUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data;
}
```
---

## 3️⃣ Gestion des Erreurs avec `async`/`await`

L'un des **avantages majeurs** de `async`/`await` est qu'il permet d'utiliser les constructions de gestion d'erreurs synchrones classiques (`try...catch`) avec du code asynchrone.

### Mécanisme

- ❌ Si une promesse est rejetée, l'opérateur `await` **lève** la raison du rejet
- 🎯 Vous pouvez intercepter cette erreur en enveloppant l'expression `await` dans un bloc `try...catch`
- 🔄 Alternativement, vous pouvez chaîner `.catch()` à la promesse avant l'opérateur `await`

### Méthode 1 : `try...catch` (recommandé)

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    // ❌ Gestion centralisée des erreurs
    console.error('Erreur lors de la récupération:', error);
    throw error; // Propager l'erreur si nécessaire
  } finally {
    // 🧹 Code de nettoyage (toujours exécuté)
    hideLoader();
  }
}
```

### Méthode 2 : `.catch()` avec valeur de secours

```javascript
async function getUserName(userId) {
  const user = await fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .catch(error => {
      // Valeur de secours en cas d'erreur
      return { name: 'Utilisateur inconnu' };
    });
  
  return user.name;
}
```

---

# 🍳 Résumé et Analogie

Les promesses et `async`/`await` résolvent le défi de l'asynchronisme en JavaScript.

## 👨‍🍳 Imaginez JavaScript comme un chef de cuisine travaillant seul (thread unique)

### 📋 Promesses : Le bon de commande

Si un plat demande un ingrédient spécial qui doit être commandé (opération asynchrone), le chef ne veut pas attendre devant le téléphone (bloquer le thread). 

Il remplit un **bon de commande** (la Promesse) qui dit :
- ✅ "Quand l'ingrédient arrive, tu le coupes (`.then()`)"
- ❌ "Si le magasin est fermé, tu m'appelles tout de suite (`.catch()`)"
- 🧹 "Dans tous les cas, tu nettoies la table (`.finally()`)"

### 🤖 `async`/`await` : L'assistant virtuel

Les fonctionnalités `async`/`await` sont comme si le chef avait un **assistant virtuel très efficace**.

Le chef écrit la recette comme si elle était séquentielle :
1. "D'abord, **attends** (`await`) l'ingrédient spécial"
2. "Ensuite, coupe-le"

L'assistant s'occupe de la communication asynchrone et ne dérange le chef que lorsque :
- ✅ L'ingrédient est là
- ❌ La commande a échoué

🎯 **Pendant que l'assistant attend, le chef peut continuer à préparer d'autres plats** (le thread principal n'est pas bloqué)

---

# 💡 III. Concepts Avancés

## 1️⃣ Micro-tâches et Event Loop

### 🔄 Ordre d'exécution

| Queue | Priorité | Exemples |
|---|---|---|
| **Microtask queue** 🥇 | Haute | Callbacks des promesses (`.then()`, `.catch()`), `queueMicrotask()` |
| **Task queue** 🥈 | Normale | `setTimeout()`, `setInterval()`, événements DOM |

```javascript
console.log('1: Synchrone'); // 1er

setTimeout(() => console.log('2: Task queue'), 0); // 3ème

Promise.resolve().then(() => console.log('3: Microtask queue')); // 2ème

console.log('4: Synchrone'); // 1er

// Ordre d'affichage: 1 → 4 → 3 → 2
```

💡 **Important** : Les callbacks des promesses sont exécutés **avant** les `setTimeout`, même si le timeout est à 0 !

---

## 2️⃣ Méthodes Utiles

### `Promise.resolve()` et `Promise.reject()`

```javascript
// ✅ Créer une promesse déjà résolue
const resolved = Promise.resolve(42);
resolved.then(value => console.log(value)); // 42

// ❌ Créer une promesse déjà rejetée
const rejected = Promise.reject(new Error('Erreur'));
rejected.catch(error => console.error(error));
```

### 🔧 Conversion callback → Promise (Promisify)

```javascript
// Fonction utilitaire pour convertir des fonctions à callback
function promisify(fonctionCallback) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fonctionCallback(...args, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  };
}

// Exemple d'utilisation
const fs = require('fs');
const readFilePromise = promisify(fs.readFile);

readFilePromise('file.txt', 'utf8')
  .then(content => console.log(content))
  .catch(error => console.error(error));
```

---

# 🎯 IV. Patterns Pratiques

## Pattern 1 : `Promise.all()` avec `async`/`await`

```javascript
async function executerTout() {
  try {
    // ✅ Exécution parallèle (plus rapide)
    const [result1, result2, result3] = await Promise.all([
      fonction1(),
      fonction2(),
      fonction3()
    ]);
    
    console.log(result1, result2, result3);
  } catch (error) {
    // ❌ Gestion si une promesse échoue
    console.error('Une erreur est survenue:', error);
  }
}
```

## Pattern 2 : Gestion d'erreurs avec `Promise.allSettled()`

```javascript
async function executerAvecDetails() {
  const results = await Promise.allSettled([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`✅ Promesse ${index}:`, result.value);
    } else {
      console.log(`❌ Promesse ${index} échouée:`, result.reason);
    }
  });
}
```

## Pattern 3 : Timeout avec `Promise.race()`

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), timeout)
  );
  
  return Promise.race([
    fetch(url),
    timeoutPromise
  ]);
}

// Utilisation
try {
  const data = await fetchWithTimeout('/api/slow-endpoint', 3000);
} catch (error) {
  console.error('Requête trop lente ou erreur:', error);
}
```

---

# ✅ V. Bonnes Pratiques et Erreurs à Éviter

## ❌ Erreurs courantes

| Erreur | Description | Solution |
|---|---|---|
| 🔴 Oublier `return` dans `.then()` | La valeur n'est pas passée au `.then()` suivant | Toujours `return` la valeur ou la promesse |
| 🔴 Mélanger `async`/`await` et `.then()` | Code moins lisible | Choisir un style et s'y tenir |
| 🔴 Oublier `catch` | Les erreurs ne sont pas gérées | Toujours ajouter `.catch()` ou `try...catch` |
| 🔴 `await` séquentiel inutile | Opérations indépendantes bloquées | Utiliser `Promise.all()` pour paralléliser |

## ✅ Bonnes pratiques

```javascript
// ❌ MAUVAIS : await séquentiel inutile
async function bad() {
  const user = await fetchUser();     // Attend 1s
  const posts = await fetchPosts();   // Attend encore 1s
  // Total: 2s
}

// ✅ BON : Exécution parallèle
async function good() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
  // Total: 1s (opérations parallèles)
}
```

---

# 🛠️ VI. Structures de Code Recommandées

## Pour les fonctions qui retournent des promesses

```javascript
export default function maFonction(param) {
  return new Promise((resolve, reject) => {
    // Logique asynchrone
    if (/* succès */) {
      resolve(valeur); // ✅ En cas de succès
    } else {
      reject(new Error('Description')); // ❌ En cas d'échec
    }
  });
}
```

## Pour les fonctions `async`

```javascript
export default async function maFonctionAsync(param) {
  try {
    // Utilisation de await
    const result = await autreFonctionAsync();
    return result; // ✅ Retour automatiquement enveloppé dans une promesse
  } catch (error) {
    // ❌ Gestion d'erreur
    console.error('Erreur:', error);
    throw error; // Propager l'erreur
  }
}
```

---

# 🎓 VII. Applications aux Tâches du Projet

| Tâche | Méthode Recommandée | Raison |
|---|---|---|
| **Task 6** (handleProfileSignup) | `Promise.allSettled()` | Tu dois gérer à la fois les succès ✅ et les échecs ❌ |
| **Task 7** (loadBalancer) | `Promise.race()` | Retourner la valeur de la promesse la plus rapide 🏃 |
| **Task 9** (guardrail) | `try...catch` avec `await` | Attraper les erreurs synchrones et asynchrones 🛡️ |

---

# 📚 VIII. Ressources Complémentaires

- [MDN - Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise) : Documentation complète sur les promesses
- [MDN - async/await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function) : Guide détaillé sur async/await
- [JavaScript.info - Promises](https://javascript.info/promise-basics) : Tutoriel interactif
- [Event Loop Visualizer](http://latentflip.com/loupe/) : Visualiser l'ordre d'exécution

**🎉 Happy coding !**