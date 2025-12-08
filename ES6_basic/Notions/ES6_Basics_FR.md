# 🌟 I. Introduction à ES6 (ECMAScript 2015)
Qu'est-ce que ES6?
- 6ème édition d'ECMAScript, sortie en 2015
- Ajoute de nouvelles fonctionnalités au langage JavaScript
- Standardisation de pratiques courantes
- Compatibilité ascendante (backward compatible)

### Différences majeures avec ES5
| Fonctionnalité | ES5 | ES6 |
|---|---|---|
| **Déclaration variables** 📜 | `var` | `let`, `const` |
| **Fonctions** 🏹 | Fonctions normales | Arrow functions |
| **Concaténation strings** ✍️ | `+` | Template literals |
| **Paramètres** ⚙️ | `arguments` | Default/Rest parameters |
| **Modules** 📦 | Pas de standard | `export`/`import` |
---

# 🔤 II. Variables et Portées (Scope)
### `const` vs `let` vs `var`
| Type | Réassignable | Redéclarable | Scope | Hoisting |
|---|---|---|---|---|
| `const` ❌ | ❌ Non | ❌ Non | Bloc | Oui (pas initialisé) |
| `let` ✅ | ✅ Oui | ❌ Non | Bloc | Oui (pas initialisé) |
| `var` ⚠️ | ✅ Oui | ✅ Oui | Fonction | Oui (initialisé à `undefined`) |

#### Exemples
```javascript
// const - valeur constante
const PI = 3.14;
PI = 3.14159; // ❌ Erreur!

// let - variable de bloc
let count = 0;
count = 1; // ✅ OK

// var - ancienne syntaxe (à éviter)
var old = "dépassé";
```
### Block Scope (Portée de bloc)
```javascript
function example() {
  if (true) {
    let blockScoped = "visible uniquement ici";
    var functionScoped = "visible dans toute la fonction";
  }
  console.log(functionScoped); // ✅
  console.log(blockScoped); // ❌ ReferenceError
}
```
---

# 🏹 III. Arrow Functions (Fonctions fléchées)
### Syntaxe
```javascript
// ES5 - Fonction classique
const add = function(a, b) {
  return a + b;
};

// ES6 - Arrow function
const add = (a, b) => {
  return a + b;
};

// Forme courte (return implicite)
const add = (a, b) => a + b;

// Un seul paramètre
const square = x => x * x;

// Aucun paramètre
const greet = () => "Hello!";
```
### Différences importantes avec les fonctions normales
- **Pas de `this` propre** : utilise le `this` du contexte parent (lexical `this`).
- **Pas d'objet `arguments`**.
- Ne peut pas être utilisée comme **constructeur** (pas de `new`).
- Pas de propriété `prototype`.

### Quand utiliser des arrow functions?
```javascript
// ✅ Parfait pour les callbacks
[1, 2, 3].map(n => n * 2);

// ✅ Méthodes qui n'utilisent pas `this` ou qui ont besoin du `this` du parent
const obj = {
  values: [1, 2, 3],
  double: function() {
    // `this` ici est `obj`
    return this.values.map(v => v * 2); // `this` dans l'arrow function vient de `double`
  }
};

// ❌ Pas pour les méthodes d'objet qui ont besoin de leur propre `this`
const person = {
  name: "John",
  greet: () => {
    console.log(`Hello ${this.name}`); // ❌ `this` n'est pas `person`
  }
};
```
---

# ⚙️ IV. Paramètres de fonctions
### Default Parameters (Paramètres par défaut)
```javascript
// ES5
function multiply(a, b) {
  b = (typeof b !== 'undefined') ? b : 1;
  return a * b;
}

// ES6
function multiply(a, b = 1) {
  return a * b;
}

// Exemples
multiply(5);      // 5 (b prend la valeur 1)
multiply(5, 2);   // 10
multiply(5, undefined); // 5 (b prend la valeur 1)
multiply(5, null); // 0 (null est une valeur, donc b = null)
```
### Rest Parameters (Paramètres du reste)
Permet de regrouper un nombre indéfini d'arguments dans un tableau.
```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4); // 10

// Doit toujours être le dernier paramètre
function log(message, ...values) {
  console.log(message, values); // values sera un tableau
}
```
### Spread Operator (Opérateur de décomposition)
Décompose un itérable (tableau, chaîne) en éléments individuels.
```javascript
// Pour les tableaux
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Pour les chaînes
const str = "Hello";
const chars = [...str]; // ["H", "e", "l", "l", "o"]

// Pour les appels de fonction
const numbers = [1, 2, 3];
Math.max(...numbers); // 3 (équivalent à Math.max(1, 2, 3))
```
---

# 📝 V. Template Literals (Gabarits de chaînes)
### Syntaxe avec backticks (`)
```javascript
const name = "Alice";
const age = 30;

// ES5
const greeting = "Hello " + name + ", you are " + age + " years old.";

// ES6
const greeting = `Hello ${name}, you are ${age} years old.`;

// Multi-lignes
const multiline = `
  Line 1
  Line 2
  Line 3
`;

// Expressions
const price = 19.99;
const message = `Total: $${(price * 1.2).toFixed(2)}`;
```
---

# 🏗️ VI. Objets en ES6
### Shorthand Property Names (Noms de propriété abrégés)
```javascript
const name = "John";
const age = 25;

// ES5
const personES5 = {
  name: name,
  age: age,
  greet: function() {
    return "Hello";
  }
};

// ES6
const personES6 = {
  name,  // équivalent à name: name
  age,   // équivalent à age: age
  greet() {  // méthode raccourcie
    return "Hello";
  }
};
```
### Computed Property Names (Noms de propriété calculés)
```javascript
const prefix = "user_";
const id = 123;

// ES5
const objES5 = {};
objES5[prefix + id] = "value";

// ES6
const objES6 = {
  [`${prefix}${id}`]: "value",
  [`calculate${id}`]() {
    return this[`${prefix}${id}`];
  }
};
```
### Object Destructuring (Déstructuration d'objets)
```javascript
const person = {
  name: "Alice",
  age: 30,
  city: "Paris"
};

// Extraction simple
const { name, age } = person;

// Avec alias
const { name: userName, city: ville } = person;

// Valeurs par défaut
const { country = "France" } = person;

// Dans les paramètres de fonction
function display({ name, age }) {
  console.log(`${name} is ${age} years old`);
}
display(person);
```
---

# 🔄 VII. Itérateurs et boucles
### `for...of` vs `for...in`
| Boucle | Utilisation | Itère sur... |
|---|---|---|
| `for...of` | Pour les **valeurs** d'un itérable | Tableaux, Chaînes, Map, Set... |
| `for...in` | Pour les **clés/indices** d'un objet | Objets, Tableaux |

```javascript
const arr = ['a', 'b', 'c'];
arr.custom = 'd'; // Ajout d'une propriété

// for...of - pour les valeurs
for (const value of arr) {
  console.log(value); // 'a', 'b', 'c' (ignore `custom`)
}

// for...in - pour les indices/propriétés
for (const index in arr) {
  console.log(index); // '0', '1', '2', 'custom'
}

const obj = { a: 1, b: 2 };
// for...of ne marche pas directement avec les objets
// for...in est fait pour ça
for (const key in obj) {
  console.log(key); // 'a', 'b'
}
```
---

# 🧪 VIII. Tests avec Jest
### Structure de base des tests
```javascript
// Fichier de test : myfunction.test.js
import functionName from './myfunction.js';

describe('Test suite for functionName', () => {
  test('should do something correctly', () => {
    const result = functionName(args);
    expect(result).toBe(expectedValue);
  });
});
```
### Commandes utiles
| Commande | Description |
|---|---|
| `npm test` | Exécute tous les tests. |
| `npm test -- 0-constants.test.js` | Exécute un fichier de test spécifique. |
| `npm test -- --watch` | Mode "watch" qui ré-exécute les tests à chaque modification. |
---

# 🛠️ IX. Configuration du projet
### Structure des fichiers
```
ES6_basic/
├── package.json
├── babel.config.js
├── .eslintrc.js
├── *.js (fichiers de solution)
└── *.test.js (fichiers de test)
```
### Fichiers de configuration
- **`babel.config.js`** : Transpile ES6+ vers ES5 pour la compatibilité (notamment avec Jest).
```javascript
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```
- **`.eslintrc.js`** : Définit les règles de "linting" pour garder un code propre et cohérent.
```javascript
module.exports = {
  env: {
    browser: false,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/all',
  ],
  // ... Règles spécifiques
};
```
---

# 💡 X. Pièges courants à éviter
- ❌ Ne pas réassigner une `const`.
- 🤔 `null` est différent de `undefined` pour les paramètres par défaut.
- 🏹 Les arrow functions n'ont pas leur propre `this`.
- spread operator `...` ne fonctionne qu'avec des itérables.
- ✍️ Les template literals utilisent des backticks (``), pas des apostrophes (`'`) ou des guillemets (`"`).
- 📦 Toujours `export` les fonctions pour les rendre disponibles à l'extérieur.
- 📁 Les noms de fichiers dans les `import` doivent correspondre exactement.

📚 XI. Ressources supplémentaires
- [MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/JavaScript) : La référence absolue pour JavaScript.
- [ES6 Features](https://github.com/lukehoban/es6features) : Guide complet des fonctionnalités ES6.
- [JavaScript.info](https://javascript.info/) : Tutoriels modernes et détaillés.
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) : Un guide de style populaire pour des bonnes pratiques.

**🎉 Happy coding !**