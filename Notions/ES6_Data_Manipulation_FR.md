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


--------------------------------------------------------------------------------
Module 2 : Les Tableaux Typés JavaScript (Typed Arrays)
Les tableaux typés ne sont pas destinés à remplacer les tableaux normaux, mais à fournir une interface familière pour la manipulation de données binaires brutes.
Buffers et Vues (Views)
L'implémentation des tableaux typés est scindée en deux parties pour maximiser la flexibilité et l'efficacité :
1. Le Buffer (ArrayBuffer ou SharedArrayBuffer) : Représente un bloc de données brutes en mémoire et n'a pas de format spécifique. On ne peut ni lire ni écrire directement dans un buffer.
2. La Vue (Typed Array Views ou DataView) : Fournit le contexte (type de données, décalage de départ et nombre d'éléments) pour accéder à la mémoire contenue dans le buffer.
Les vues de tableau typé ont des noms auto-descriptifs (ex : Int8Array, Float64Array) et interprètent les données dans le buffer selon le type numérique spécifié.
Caractéristiques et Différences
• Types de données binaires : Chaque entrée d'un tableau typé est une valeur binaire brute dans un format pris en charge (ex : entiers 8 bits, nombres flottants 64 bits).
• Longueur Fixe : Les tableaux typés sont, en principe, de longueur fixe. Par conséquent, les méthodes de tableau qui peuvent modifier la longueur (comme push(), pop(), splice(), shift(), et unshift()) ne sont pas disponibles.
• Différence Array.isArray() : L'appel de Array.isArray() sur un tableau typé retourne false.
• DataView : C'est une interface de plus bas niveau qui permet un contrôle granulaire de l'accès aux données, notamment en permettant de contrôler l'ordre des octets (endianness), contrairement aux vues de tableau typé qui utilisent l'ordre des octets natif de la plateforme.

--------------------------------------------------------------------------------
Module 3 : L'Objet Map
L'objet Map détient des paires clé-valeur et a la particularité de se souvenir de l'ordre d'insertion original des clés.
Caractéristiques principales
• Clés Flexibles : N'importe quelle valeur (objets, primitives, fonctions) peut être utilisée comme clé.
• Unicité des Clés : Une clé ne peut apparaître qu'une seule fois dans la collection Map.
• Égalité des Clés : L'égalité des valeurs est basée sur l'algorithme SameValueZero. Cela signifie que NaN est considéré comme égal à NaN (même si NaN !== NaN est vrai). Pour les clés d'objet, l'égalité est basée sur l'identité de l'objet (comparaison par référence).
• Itération : L'itération se fait par paires clé-valeur dans l'ordre d'insertion. Une boucle for...of retourne un tableau à deux membres [key, value] pour chaque itération.
• Propriété size : Le nombre d'éléments est facilement récupéré via la propriété size.
Map vs. Object
Map est souvent préférable à l'utilisation d'un objet (Object) pour les collections clé-valeur : | Caractéristique | Map | Object | | :--- | :--- | :--- | | Clés Accidentelles | Ne contient aucune clé par défaut ; uniquement ce qui est inséré explicitement, ce qui le rend plus sûr avec des clés fournies par l'utilisateur. | Possède un prototype, ce qui peut entraîner des collisions avec les clés par défaut. | | Types de Clés | Peut être n'importe quelle valeur (objet, fonction, primitive). | Les clés doivent être une chaîne de caractères ou un Symbol. | | Ordre | Itère les entrées dans l'ordre d'insertion. | Bien que l'ordre des clés soit défini maintenant, il était historiquement complexe, et il est préférable de ne pas s'y fier. | | Performance | Meilleure performance pour les ajouts et suppressions fréquents. | Moins optimisé pour les ajouts et suppressions fréquents. |

--------------------------------------------------------------------------------
Module 4 : L'Objet Set
L'objet Set permet de stocker des valeurs uniques de n'importe quel type.
Caractéristiques principales
• Unicité : Une valeur ne peut apparaître qu'une seule fois dans la collection Set.
• Ordre d'Insertion : Les éléments sont itérés dans l'ordre où ils ont été insérés avec succès via la méthode add().
• Égalité des Valeurs : L'égalité est basée sur l'algorithme SameValueZero (comme pour Map).
• Opérations : Les opérations de base sont add(), delete(), has(), et clear(). La propriété size retourne le nombre de valeurs.
• Performance : La méthode has() est en moyenne plus rapide que Array.prototype.includes() pour vérifier si une valeur est présente.
• Itération : Les méthodes keys() et values() sont des alias et renvoient les valeurs. La méthode entries() retourne un tableau de [value, value] pour chaque élément, afin de maintenir une signature similaire à celle de Map.
Composition d'Ensembles (Set Composition)
L'objet Set fournit des méthodes permettant d'effectuer des opérations mathématiques sur les ensembles :
• union(B) : Retourne un nouvel ensemble contenant les éléments des deux ensembles.
• intersection(B) : Retourne un nouvel ensemble contenant les éléments communs aux deux ensembles.
• difference(B) : Retourne un nouvel ensemble contenant les éléments de l'ensemble A qui ne sont pas dans l'ensemble B.
• isSubsetOf(B) : Retourne un booléen indiquant si tous les éléments de l'ensemble A sont dans l'ensemble B.

--------------------------------------------------------------------------------
Module 5 : L'Objet WeakMap
Un WeakMap est une collection clé/valeur conçue spécifiquement pour la gestion de la mémoire, car il ne crée pas de références fortes à ses clés.
Clés et Références Faibles (Weak References)
• Clés Autorisées : Les clés doivent être des objets ou des symboles non enregistrés (non-registered symbols). Les primitives ne peuvent généralement pas être utilisées comme clés.
• Nettoyage de Mémoire (Garbage Collection) : Si un objet utilisé comme clé n'est plus référencé ailleurs dans le programme, le fait qu'il soit une clé dans un WeakMap ne l'empêchera pas d'être collecté par le ramasse-miettes. Une fois la clé collectée, sa paire valeur/clé correspondante devient également candidate au nettoyage.
• Utilité : Les WeakMap sont idéales pour associer des métadonnées (données supplémentaires) à des objets sans affecter la durée de vie de ces objets, prévenant ainsi les fuites de mémoire.
Limitations
• Non-Énumérable : L'objet WeakMap n'est pas énumérable. Il ne possède pas de méthode pour obtenir la liste de ses clés, ni de propriété size.
• Raison de la limitation : Si l'énumération était possible, la liste des clés dépendrait de l'état non déterministe du ramasse-miettes, ce qui est évité par cette restriction. Pour obtenir une liste de clés, il faut utiliser un Map.

--------------------------------------------------------------------------------
Synthèse
Pour résumer, l'étude de ces structures de données nous révèle trois catégories principales de collections indexées ou basées sur des clés/valeurs en JavaScript :
1. Collections ordonnées et mutables par index (Array) : Optimisées pour stocker et manipuler des listes d'éléments ordonnés, mais avec des implications sur l'accès aux propriétés et les copies.
2. Collections binaires spécialisées (Typed Arrays) : Axées sur l'efficacité et la manipulation de données brutes via des vues sur un buffer mémoire, avec des contraintes de longueur fixe.
3. Collections par clé/valeur et uniques (Map, Set, WeakMap) : Des structures modernes offrant des garanties sur l'ordre d'insertion (Map, Set) ou la gestion automatique de la mémoire (WeakMap).
Considérez l'objet Array comme une étagère redimensionnable capable de contenir n'importe quoi, tandis que Map agit comme un annuaire téléphonique ordonné où vous pouvez utiliser n'importe quel objet comme nom (clé). Enfin, WeakMap est comme un badge de sécurité temporaire attaché à un objet ; si l'objet est jeté, le badge disparaît automatiquement.