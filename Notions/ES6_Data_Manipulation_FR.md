# 📚 Fiche de révision : Manipulation de Données en ES6 📊

---

### Module 1 : Les Tableaux (Arrays) 🗂️

L'objet `Array` est une structure fondamentale en JavaScript pour stocker des collections d'éléments. Ils sont redimensionnables et peuvent contenir différents types de données.

#### Caractéristiques principales :
-   **Non-Primitifs** : Les tableaux sont des objets `Array`.
-   **Indexation par Entiers** : Accès aux éléments via des index numériques (à partir de 0).
-   **Propriété `length`** : Reflète le nombre d'éléments et peut être modifiée.
-   **Copies superficielles (Shallow Copies)** : Les méthodes de copie (`...`, `slice()`, etc.) ne dupliquent pas les objets contenus, seulement leurs références.

#### Méthodes et Comportement :
-   **Méthodes Itératives** : `map()`, `filter()`, `forEach()`, etc.
-   **Méthodes Mutatrices** : Modifient le tableau original (`push()`, `pop()`, `sort()`).
-   **Méthodes Non-Mutatrices** : Retournent un nouveau tableau (`slice()`, `concat()`, `toSorted()`).

---

### Module 2 : Les Tableaux Typés (Typed Arrays) 🔢

Les `Typed Arrays` fournissent une interface pour manipuler des données binaires brutes. Ils sont optimisés pour la performance et la gestion de la mémoire.

#### Buffers et Vues :
1.  **Buffer (`ArrayBuffer`)** : Un bloc de données brutes en mémoire. On ne peut pas le manipuler directement.
2.  **Vue (`Int8Array`, `Float64Array`, etc.)** : Fournit un contexte (type, décalage) pour lire et écrire dans le buffer.

#### Caractéristiques :
-   **Types de données binaires** : Chaque entrée est une valeur binaire (ex: entier 8 bits).
-   **Longueur Fixe** : Les méthodes qui modifient la longueur (`push`, `pop`) ne sont pas disponibles.
-   **`DataView`** : Une vue de bas niveau qui permet un contrôle fin, comme l'ordre des octets (endianness).

---

### Module 3 : L'Objet Map 🗺️

L'objet `Map` stocke des paires clé-valeur et mémorise l'ordre d'insertion. C'est une alternative moderne et plus sûre aux objets simples pour les dictionnaires.

#### Caractéristiques principales :
-   **Clés Flexibles** : N'importe quelle valeur (objet, primitive) peut être une clé.
-   **Unicité des Clés** : Chaque clé est unique. `NaN` est considéré comme égal à `NaN`.
-   **Itération Ordonnée** : L'itération se fait dans l'ordre d'insertion.
-   **Propriété `size`** : Retourne le nombre d'éléments.

#### Map vs. Object :
| Caractéristique | Map | Object |
| :--- | :--- | :--- |
| **Types de Clés** | N'importe quelle valeur | `String` ou `Symbol` |
| **Ordre** | Garanti (ordre d'insertion) | Complexe et historiquement non fiable |
| **Performance** | Optimisé pour ajouts/suppressions fréquents | Moins performant pour ces opérations |
| **Sécurité** | Pas de clés par défaut, plus sûr | Hérite d'un prototype, risque de collisions |

---

### Module 4 : L'Objet Set 🛡️

L'objet `Set` permet de stocker des valeurs uniques de n'importe quel type, en conservant l'ordre d'insertion.

#### Caractéristiques principales :
-   **Unicité** : Une valeur ne peut apparaître qu'une seule fois.
-   **Ordre d'Insertion** : Les éléments sont itérés dans leur ordre d'ajout.
-   **Égalité des Valeurs** : Basée sur l'algorithme `SameValueZero` (`NaN` est égal à `NaN`).
-   **Performance** : `has()` est généralement plus rapide que `Array.prototype.includes()`.

#### Opérations sur les Ensembles :
-   `union(B)` : Retourne un nouvel ensemble avec les éléments des deux.
-   `intersection(B)` : Retourne les éléments communs aux deux ensembles.
-   `difference(B)` : Retourne les éléments de A qui ne sont pas dans B.
-   `isSubsetOf(B)` : Vérifie si A est un sous-ensemble de B.

---

### Module 5 : L'Objet WeakMap 🔗

Un `WeakMap` est une collection clé-valeur qui ne crée pas de références fortes à ses clés, ce qui permet au ramasse-miettes de les nettoyer si elles ne sont plus utilisées ailleurs.

#### Clés et Références Faibles :
-   **Clés Autorisées** : Uniquement des objets ou des symboles non enregistrés.
-   **Nettoyage de Mémoire** : Si un objet clé n'est plus référencé, il peut être supprimé du `WeakMap` par le ramasse-miettes, prévenant ainsi les fuites de mémoire.
-   **Utilité** : Idéal pour associer des métadonnées à des objets sans empêcher leur suppression.

#### Limitations :
-   **Non-Énumérable** : On ne peut pas itérer sur un `WeakMap` ni obtenir sa taille (`size`). Ceci est une contrainte volontaire pour éviter un comportement non déterministe lié au ramasse-miettes.

---

### Synthèse 💡

> Pour résumer, JavaScript nous offre plusieurs types de collections :
> 1.  **`Array`** : Une étagère redimensionnable et polyvalente.
> 2.  **`TypedArray`** : Des conteneurs spécialisés pour manipuler des données binaires de manière performante.
> 3.  **`Map` & `Set`** : Des collections modernes garantissant l'unicité et/ou l'ordre.
> 4.  **`WeakMap`** : Un cas d'usage spécifique pour lier des données à des objets sans créer de fuites de mémoire.

Pensez à `WeakMap` comme un badge de sécurité temporaire : si l'employé (l'objet) quitte l'entreprise, son badge (la référence dans le `WeakMap`) est automatiquement désactivé.


---

## 🎯 SYNTAXES PRATIQUES

### 1. `map()` - Transformation 🔄

Transforme chaque élément d'un tableau en appliquant une fonction.

```javascript
// Extraire les IDs d'un tableau d'objets
const ids = students.map(student => student.id);

// Version complète (function classique)
const ids = students.map(function(student) {
  return student.id;
});
```

---

### 2. `filter()` - Filtrage 🔍

Sélectionne uniquement les éléments qui satisfont une condition.

```javascript
// Filtrer les étudiants d'une ville
const sanFranciscoStudents = students.filter(student => 
  student.location === 'San Francisco'
);

// Avec vérification de sécurité
const result = array.filter(item => item && item.property === value);
```

---

### 3. `reduce()` - Réduction/Agrégation ➕

Réduit un tableau à une seule valeur en accumulant les résultats.

```javascript
// Somme des IDs
const sum = students.reduce((total, student) => total + student.id, 0);
//                           └─ accumulateur  └─ élément actuel    └─ valeur initiale

// Sans valeur initiale (attention !)
const sum = students.reduce((total, student) => total + student.id);
// L'accumulateur commence avec le premier élément
```

---

### 4. `every()` - Tous vérifient une condition ✅

Vérifie si **tous** les éléments satisfont une condition.

```javascript
// Tous les éléments sont dans le Set ?
const allExist = array.every(element => set.has(element));
// ⚡ S'arrête au premier false (short-circuit) !
```

---

### 5. `startsWith()` - Vérifier le début d'un string 🔤

```javascript
// Vérifier si une chaîne commence par un préfixe
value.startsWith(startString)

// Extraire la partie après le préfixe
value.slice(startString.length) // Enlève le début
```

---

## 🚨 BONNES PRATIQUES

### ✅ Vérification des paramètres

```javascript
function maFonction(param) {
  // Vérifier plusieurs cas d'erreur
  if (!param || param.length === 0) {
    return valeurParDefaut;
  }
  
  // Vérifier le type
  if (!Array.isArray(param)) {
    return [];
  }
  
  if (!(param instanceof Map)) {
    throw new Error('Le paramètre doit être une Map');
  }
}
```

---

### ⚠️ Gestion d'erreurs

```javascript
// Pour les Typed Arrays - vérifier les limites
if (position < 0 || position >= length) {
  throw new Error('Position outside range');
}
```

---

### 🚀 Return Early Pattern

```javascript
function exemple(data) {
  if (!data) return null;          // ✅ Sortie précoce
  if (data.length === 0) return []; // ✅ Sortie précoce
  
  // Logique principale (seulement si data est valide)
  return data.map(...);
}
```

---

## 🔄 COMPARAISON DES APPROCHES

### Création de Map

```javascript
// 1️⃣ Direct (statique) - Données connues à l'avance
const map1 = new Map([['pommes', 10], ['bananes', 5]]);

// 2️⃣ Avec .set() (dynamique) - Ajout progressif
const map2 = new Map();
map2.set('pommes', 10);
map2.set('bananes', 5);

// 3️⃣ Boucle (données variables) - À partir d'un tableau
const items = [['pommes', 10], ['bananes', 5]];
const map3 = new Map();
items.forEach(([key, value]) => map3.set(key, value));
```

---

### Parcours de Map

```javascript
// ✅ Avec forEach - Modifier les valeurs
map.forEach((value, key) => {
  if (value === 1) {
    map.set(key, 100); // Modification en place
  }
});

// ✅ Avec for...of - Accès aux clés et valeurs
for (let [key, value] of map) {
  console.log(key, value);
}
```

---

## 💡 TRUCS ET ASTUCES

### Spread operator avec objets

```javascript
// Ajouter/Modifier une propriété dans un objet
return {
  ...student,          // 📋 Copie toutes les propriétés existantes
  grade: newGrade      // ✏️ Ajoute/modifie une propriété
};
```

---

### Vérification de tableau

```javascript
// ✅ LA meilleure méthode
Array.isArray(variable)

// ❌ Autres méthodes (moins bonnes)
variable instanceof Array              // Problèmes avec les iframes
typeof variable === 'object' && variable !== null  // Trop verbeux
```

---

### Chaînage de méthodes

```javascript
// ✨ Style fonctionnel élégant
return students
  .filter(student => student.location === city)
  .map(student => ({
    ...student,
    grade: getGrade(student.id)
  }));
```

---

## 📊 RÉSUMÉ DES STRUCTURES

| Structure | Quand l'utiliser ? | Méthodes clés |
|-----------|-------------------|---------------|
| **Array** 📚 | Liste ordonnée, avec doublons | `map`, `filter`, `reduce`, `forEach` |
| **Set** 🛡️ | Éléments uniques, vérification rapide | `add`, `has`, `delete`, `size` |
| **Map** 🗺️ | Paires clé-valeur, clés complexes | `set`, `get`, `has`, `forEach` |
| **TypedArray** 🔢 | Données binaires, performance | `setInt8`, `getInt8` (via `DataView`) |

---

## 🎓 LEÇONS CLÉS

> 💡 **`return` est souvent oublié** - Toujours vérifier qu'on retourne bien le résultat !

> ✅ **Vérifier les paramètres** - Surtout contre `undefined` et types incorrects

> 🔄 **`map` vs `filter`** - `map` transforme, `filter` sélectionne

> 🛡️ **Sets éliminent les doublons** - Utiliser pour avoir des valeurs uniques

> 🗺️ **Maps préservent l'ordre** - Contrairement aux objets simples

> 🔢 **TypedArrays = binaire** - Pour les données brutes, pas pour les tableaux normaux

---

## 🎯 SYNTAXES PRATIQUES (SUITE)
1. map() - Transformation
javascript
// Extraire les IDs d'un tableau d'objets
const ids = students.map(student => student.id);

// Version complète
const ids = students.map(function(student) {
  return student.id;
});
2. filter() - Filtrage
javascript
// Filtrer les étudiants d'une ville
const sanFranciscoStudents = students.filter(student => 
  student.location === 'San Francisco'
);

// Avec vérification
const result = array.filter(item => item && item.property === value);
3. reduce() - Réduction/Agrégation
javascript
// Somme des IDs
const sum = students.reduce((total, student) => total + student.id, 0);

// Accumulateur = première valeur si pas de valeur initiale
const sum = students.reduce((total, student) => total + student.id);
4. every() - Tous vérifient une condition
javascript
// Tous les éléments sont dans le Set ?
const allExist = array.every(element => set.has(element));
// S'arrête au premier false (short-circuit) !
5. startsWith() - Vérifier le début d'un string
javascript
// Pour cleanSet
value.startsWith(startString)
value.slice(startString.length) // Enlève le début
🚨 BONNES PRATIQUES APPRISES
Vérification des paramètres
javascript
function maFonction(param) {
  // Vérifier plusieurs cas
  if (!param || param.length === 0) {
    return valeurParDefaut;
  }
  
  // Vérifier le type
  if (!Array.isArray(param)) {
    return [];
  }
  
  if (!(param instanceof Map)) {
    throw new Error('Message d\'erreur');
  }
}
Gestion d'erreurs
javascript
// Pour les Typed Arrays
if (position < 0 || position >= length) {
  throw new Error('Position outside range');
}
Return early pattern
javascript
function exemple(data) {
  if (!data) return null;          // Sortie précoce
  if (data.length === 0) return []; // Sortie précoce
  
  // Logique principale
  return data.map(...);
}
🔄 COMPARAISON DES APPROCHES
Création de Map
javascript
// 1. Direct (statique)
const map1 = new Map([['pommes', 10], ['bananes', 5]]);

// 2. Avec .set() (dynamique)
const map2 = new Map();
map2.set('pommes', 10);
map2.set('bananes', 5);

// 3. Boucle (données variables)
const items = [['pommes', 10], ['bananes', 5]];
const map3 = new Map();
items.forEach(([key, value]) => map3.set(key, value));
Parcours de Map
javascript
// Modifier les valeurs
map.forEach((value, key) => {
  if (value === 1) {
    map.set(key, 100); // Modification en place
  }
});

// Avec for...of
for (let [key, value] of map) {
  console.log(key, value);
}
💡 TRUCS ET ASTUCES
Spread operator avec objets
javascript
// Ajouter une propriété à un objet existant
return {
  ...student,          // Copie toutes les propriétés
  grade: newGrade      // Ajoute/modifie une propriété
};
Vérification de tableau
javascript
// La meilleure méthode
Array.isArray(variable)  // ✅ Recommandé

// Autres méthodes (moins bonnes)
variable instanceof Array  // ❌ Problèmes avec les iframes
typeof variable === 'object' && variable !== null  // ❌ Trop verbeux
Chaînage de méthodes
javascript
// Style fonctionnel élégant
return students
  .filter(student => student.location === city)
  .map(student => ({
    ...student,
    grade: getGrade(student.id)
  }));
📊 RÉSUMÉ DES STRUCTURES
Structure	Quand l'utiliser ?	Méthodes clés
Array	Liste ordonnée, avec doublons	map, filter, reduce, forEach
Set	Éléments uniques, vérification rapide	add, has, delete, size
Map	Paires clé-valeur, clés complexes	set, get, has, forEach
TypedArray	Données binaires, performance	setInt8, getInt8 (via DataView)
🎓 LEÇONS CLÉS DE NOTRE SESSION
return est souvent oublié - Toujours vérifier qu'on retourne bien le résultat !

Vérifier les paramètres - Surtout contre undefined et types incorrects

map vs filter - map transforme, filter sélectionne

Sets éliminent les doublons - Utiliser pour avoir des valeurs uniques

Maps préservent l'ordre - Contrairement aux objets simples

TypedArrays = binaire - Pour les données brutes, pas pour les tableaux normaux


Synthèse
Pour résumer, l'étude de ces structures de données nous révèle trois catégories principales de collections indexées ou basées sur des clés/valeurs en JavaScript :
1. Collections ordonnées et mutables par index (Array) : Optimisées pour stocker et manipuler des listes d'éléments ordonnés, mais avec des implications sur l'accès aux propriétés et les copies.
2. Collections binaires spécialisées (Typed Arrays) : Axées sur l'efficacité et la manipulation de données brutes via des vues sur un buffer mémoire, avec des contraintes de longueur fixe.
3. Collections par clé/valeur et uniques (Map, Set, WeakMap) : Des structures modernes offrant des garanties sur l'ordre d'insertion (Map, Set) ou la gestion automatique de la mémoire (WeakMap).
Considérez l'objet Array comme une étagère redimensionnable capable de contenir n'importe quoi, tandis que Map agit comme un annuaire téléphonique ordonné où vous pouvez utiliser n'importe quel objet comme nom (clé). Enfin, WeakMap est comme un badge de sécurité temporaire attaché à un objet ; si l'objet est jeté, le badge disparaît automatiquement.