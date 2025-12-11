# 📚 Fiche de révision : Classes ES6 🚀

---

### 1. Syntaxe de base d'une classe 🏗️

La syntaxe de base pour déclarer une classe en ES6. On utilise le mot-clé `class` suivi du nom de la classe. Le `constructor` est une méthode spéciale pour créer et initialiser un objet.

```javascript
export default class MaClasse {
  constructor(param1, param2) {
    this._param1 = param1;  // Convention : underscore pour "privé"
    this._param2 = param2;
  }
}
```

---

### 2. Getters et Setters 🚪

Les `getters` permettent de récupérer la valeur d'un attribut, et les `setters` de la modifier, souvent en y ajoutant une logique de validation.

```javascript
class Exemple {
  constructor(valeur) {
    this._valeur = valeur;
  }
  
  // Getter pour lire la valeur
  get valeur() {
    return this._valeur;
  }
  
  // Setter pour écrire la valeur avec validation
  set valeur(newValeur) {
    if (typeof newValeur !== 'string') {
      throw new TypeError('La valeur doit être une chaîne de caractères');
    }
    this._valeur = newValeur;
  }
}
```

---

### 3. Héritage 👨‍👩‍👧

Une classe peut hériter d'une autre en utilisant le mot-clé `extends`. La méthode `super()` permet d'appeler le constructeur de la classe parente.

```javascript
class Parent {
  constructor(valeur) {
    this._valeur = valeur;
  }
}

class Enfant extends Parent {
  constructor(valeur, autre) {
    super(valeur);  // Appelle le constructor du parent
    this._autre = autre;
  }
}
```

---

### 4. Méthodes statiques ⚙️

Les méthodes statiques sont appelées directement sur la classe, et non sur une instance de la classe.

```javascript
class Calcul {
  static multiplier(a, b) {
    return a * b;
  }
}

// Appel direct sur la classe
console.log(Calcul.multiplier(2, 3)); // Affiche 6
```

---

### 5. Symbol pour cloner des objets 🧬

Les `Symbol` peuvent être utilisés pour créer des méthodes "uniques" qui ne risquent pas d'entrer en conflit avec d'autres propriétés, idéal pour des fonctionnalités comme le clonage.

```javascript
const cloneSymbol = Symbol('clone');

class Voiture {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }
  
  // Méthode "privée" utilisant un Symbol
  [cloneSymbol]() {
    return new this.constructor();
  }
  
  // Méthode publique qui utilise la méthode Symbol
  cloneCar() {
    return this[cloneSymbol]();
  }
}
```