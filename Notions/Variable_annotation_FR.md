# 🐍✨ Les Annotations de Type Python : Un Guide Complet

> 🎯 **Objectif :** Maîtriser le typage en Python pour un code plus robuste et maintenable !

---

## 1. 🔍 Comprendre le Typage Python

Python est fondamentalement un **langage à typage dynamique** 🌊. Cela signifie que les types des variables sont définis dynamiquement lors de l'exécution (au *run-time*), au moment où une valeur est assignée à la variable.

```python
# 🎭 Le type change dynamiquement !
x = 42        # x est un int
x = "hello"   # maintenant x est un str
```

Par exemple, si vous définissez une fonction `fn(a, b)`, les types de `a` et `b` ne sont connus que lorsque la fonction est appelée et que des valeurs leur sont assignées. Tenter d'additionner une chaîne de caractères (`str`) et un entier (`int`) ne lèvera une exception `TypeError` qu'au moment de l'exécution du code. ⚠️

## 2. 🎯 Rôle des Annotations de Type

En Python 3, l'ajout d'annotations de type **ne change pas** le fait que le langage reste dynamiquement typé. Les annotations servent principalement à deux objectifs :

1.  **📚 Documentation du code :** Elles indiquent clairement le type attendu pour chaque variable, ce qui aide les développeurs à réduire les bugs 🐛 et à accélérer le cycle de développement 🚀.
2.  **🔧 Linting et Validation :** Les éditeurs de code et les pipelines d'intégration continue (CI) peuvent utiliser des outils (comme mypy) pour valider le code annoté au *build-time* (avant l'exécution) et détecter les

*   **Déclaration avec initialisation :** `age: int = 1`.
*   **Déclaration sans initialisation :** Il est possible d'annoter une variable sans lui donner de valeur immédiate, ce qui peut être utile dans les branches conditionnelles.

Pour les types intégrés courants, vous utilisez simplement le nom du type :
*   `x: int = 1`
*   `x: str = "test"`
*   `x: bool = True`

### Collections (Listes, Ensembles, Dictionnaires, Tuples)

Pour les collections, vous spécifiez le type des éléments entre crochets:

| Collection | Python 3.9+ | Python 3.8 et antérieurs (Module `typing`) | Détails |
| :--- | :--- | :--- | :--- |
| **Liste** | `x: list[int] =` | `from typing import List; x: List[int] =` | Type de l'élément en crochets. |
| **Dictionnaire** | `x: dict[str, float]` | `from typing import Dict; x: Dict[str, float]` | Types de la clé et de la valeur (`[Clé, Valeur]`). |
| **Tuple (Taille Fixe)**| `x: tuple[int, str]` | `from typing import Tuple; x: Tuple[int, str]` | Spécifie le type de *chaque* élément. |
| **Tuple (Taille Variable)**| `x: tuple[int, ...]` | `x: Tuple[int, ...]` | Utilise `...` (ellipsis) pour indiquer une longueur quelconque d'éléments du même type. |

> ⚠️ **Note sur la compatibilité :** Avant Python 3.9, les noms des types de collection devaient être capitalisés et importés du module `typing` (ex: `List`, `Dict`). Depuis Python 3.9 (grâce à **PEP 585**), les types intégrés comme `list` et `dict` supportent l'indexation (`[]`) pour les génériques.

### Fonctions

Les fonctions sont annotées en spécifiant les types des arguments et le type de retour.

*   **Arguments et Retour :** Le type de l'argument suit le format `nom_arg: Type`. Le type de retour est indiqué par `-> Type`.
    ```python
    def stringify(num: int) -> str:
        return str(num) #
    
    def plus(num1: int, num2: int) -> int:
        return num1 + num2 #
    ```
*   **Absence de retour :** Si une fonction ne renvoie pas de valeur (comme celles qui ont un effet de bord tel qu'afficher quelque chose), utilisez `None` comme type de retour.
*   **Arguments par défaut :** La valeur par défaut d'un argument vient après l'annotation de type.

## 3. Types Spéciaux et Utilitaires (`typing` module)

Le module `typing` fournit un vocabulaire pour des annotations plus avancées.

### Union et Optionnel (Union / Optional)

Pour indiquer qu'une variable peut être de plusieurs types différents :

| Type | Python 3.10+ | Python 3.9 et antérieurs | Détails |
| :--- | :--- | :--- | :--- |
| **Union** | `x: int | str` | `from typing import Union; x: Union[int, str]` | Indique que `x` peut être soit un `int`, soit un `str`. |
| **Optionnel** | `x: str | None` | `from typing import Optional; x: Optional[str]` | Représente une valeur qui pourrait être `None`. `Optional[X]` est équivalent à `Union[X, None]`. |

> Notez que l'opérateur `|` (pipe) pour les unions est la méthode recommandée depuis Python 3.10.

### Any

Le type spécial `Any` indique un type illimité.

*   Un vérificateur de type considère que **tout type est compatible avec `Any`**, et que **`Any` est compatible avec tout type**.
*   Il sert de "porte de sortie" (*escape hatch*) lorsque vous devez mélanger du code dynamiquement et statiquement typé.
*   Il permet de réaliser n'importe quelle opération ou appel de méthode sans erreur de type.

### Type Aliases (Alias de Type)

Les alias de type simplifient les signatures complexes.

*   **Syntaxe moderne (Python 3.12+) :** Utilisant la déclaration `type`.
    ```python
    type Vector = list[float]
    ```
*   **Syntaxe compatible :** Une simple affectation peut créer un alias. Vous pouvez utiliser `TypeAlias` pour indiquer explicitement qu'une affectation est un alias de type et non une variable normale.

### NewType

`NewType` permet de créer des types distincts basés sur un type existant (ex: `int`) afin d'éviter des erreurs logiques.

*   **Exemple :** `UserId = NewType('UserId', int)`.
*   Le vérificateur de type traitera `UserId` comme un **sous-type** de `int`. Cela empêche d'utiliser accidentellement un simple `int` là où un `UserId` est attendu.
*   À l'exécution (*runtime*), `NewType` retourne simplement son argument inchangé, ce qui implique un faible surcoût.

### Classes et Héritage

Les classes définies par l'utilisateur sont des types valides dans les annotations.

*   **Variables d'Instance :** Dans la méthode `__init__`, mypy infère généralement les types des variables d'instance basés sur les types des paramètres.
*   **Variables de Classe :** Utilisez `ClassVar[T]` pour déclarer qu'un attribut est une variable de classe et non une variable d'instance.

### Classes de Type Dictionnaire (TypedDict)

`TypedDict` est un construit spécial pour ajouter des indications de type à un dictionnaire, spécifiant un ensemble de clés et les types de valeurs correspondants.

*   **Exemple :**
    ```python
    class Point2D (TypedDict):
        x: int
        y: int
    ```
*   **Clés requises vs. optionnelles :** Par défaut, toutes les clés sont requises. Vous pouvez utiliser `NotRequired[T]` pour marquer une clé comme non obligatoire ou définir la totalité à `total=False` pour que toutes les clés soient non requises par défaut.

## 4. Typage des Objets Fonctionnels et Génériques

### Callables (Fonctions)

Pour annoter un objet appelable (une fonction passée en argument), utilisez `Callable` (issu de `collections.abc` ou du module `typing`).

*   **Syntaxe :** `Callable[[Types des arguments], Type de retour]`.
    ```python
    # Un appelable qui prend un int et un float, et retourne un float
    x: Callable[[int, float], float] = f #
    ```
*   Si vous ne connaissez pas ou n'avez pas besoin de spécifier les arguments, utilisez `Callable[..., Type de retour]`.

### Protocoles et Sous-typage Structurel (Duck Typing)

Les protocoles permettent le **sous-typage structurel** (ou *static duck-typing*), qui est plus idiomatique pour Python.

*   **Définition :** Un Protocole définit les méthodes et attributs attendus (le "contrat"). Une classe est considérée comme un sous-type si elle implémente les membres requis, même sans héritage explicite.
    ```python
    from typing import Protocol
    class Proto(Protocol):
        def meth(self) -> int: ... #
    ```
*   **Types Duck Standard :** Pour les conteneurs qui n'ont besoin que d'être "list-like" ou "dict-like", utilisez des ABCs (Abstract Base Classes) standard comme `Iterable`, `Sequence`, `Mapping`, ou `MutableMapping`.

### Génériques (Generics) et TypeVar

Les types génériques permettent de créer des fonctions ou classes qui peuvent opérer sur différents types sans perdre l'information de type.

*   **TypeVar :** Les variables de type (`TypeVar`) sont les paramètres des types génériques.
    *   **Syntaxe Python 3.12+ :** `def first[T](l: Sequence[T]) -> T: ...`.
    *   **Syntaxe antérieure :** `T = TypeVar('T')` puis `def second(l: Sequence[T]) -> T: ...`.
*   **Contraintes :** Un `TypeVar` peut être **borné** (par `bound=Type`) ou **contraint** (par une liste de types `TypeVar('A', str, bytes)`).
    *   Un `TypeVar` borné accepte n'importe quel sous-type de la borne supérieure.
    *   Un `TypeVar` contraint n'accepte que les types listés.

### Fonctions Avancées et Décorateurs

| Notion | Description |
| :--- | :--- |
| **`@overload`** | Décorateur pour décrire des fonctions ou méthodes supportant plusieurs combinaisons d'arguments différents (surcharges) pour le vérificateur de type. |
| **`@final`** | Indique qu'une méthode ne peut être surchargée dans une sous-classe ou qu'une classe ne peut être sous-classée. |
| **`@override`** | Indique qu'une méthode dans une sous-classe est destinée à surcharger une méthode dans la superclasse. Le vérificateur de type lève une erreur si elle ne surcharge rien. |
| **`Literal`** | Permet de définir des "types littéraux" pour indiquer qu'un objet a une valeur équivalente à l'un des littéraux fournis (ex: `'r'`, `'w'`). |
| **`Annotated`** | Forme spéciale pour ajouter des métadonnées contextuelles à une annotation. Le vérificateur de type l'ignore et se concentre sur le type principal (ex: `Annotated[int, ValueRange(3, 10)]`). |
| **`TypeIs` / `TypeGuard`** | Utilisés pour annoter les fonctions de prédicat définies par l'utilisateur qui retournent un booléen et qui permettent au vérificateur de type d'affiner le type d'un argument dans un bloc conditionnel. |

## 5. Débogage et Introspection

Certains outils du module `typing` ne sont destinés qu'à l'analyse statique ou au débogage du typage :

*   **`reveal_type(obj)` :** Demande à un vérificateur de type statique de révéler le type inféré d'une expression. Très utile pour le débogage.
*   **`cast(type, value)` :** Force le vérificateur de type à traiter une valeur comme ayant un certain type. C'est une aide pour mypy ; il n'y a **aucune vérification à l'exécution**.
*   **`TYPE_CHECKING` :** Une constante spéciale qui est supposée être `True` par les vérificateurs de type statique, mais qui est `False` à l'exécution (*runtime*). Elle permet d'importer des modules coûteux uniquement pour le typage.
*   **`get_type_hints(obj)` :** Fonction d'introspection qui retourne un dictionnaire contenant les annotations de type pour une fonction, méthode, module ou classe.

***

## 6. Floors "Paliers"
Bonjour ! C'est une excellente question conceptuelle. Pas de code, promis, nous allons nous concentrer uniquement sur la logique derrière ce terme.

Pour faire simple, le "floor" (qui signifie "sol" ou "plancher" en anglais) est une méthode mathématique spécifique pour transformer un nombre à virgule (un float) en un nombre entier.

Voici l'explication détaillée de ce que c'est et de son utilité.

1. Qu'est-ce que le "Floor" ?
Imagine que tu te trouves dans un ascenseur ou sur un escalier.

L'image du Plancher : Le "floor" consiste à regarder le nombre à virgule et à descendre à l'entier qui se trouve juste en dessous (le "sol" sous tes pieds).

<img src="holbertonschool-web_back_end/Notions/Floors.jpg" alt="Floors diagram">

Cela semble évident pour les nombres positifs, mais c'est plus subtil pour les négatifs.

La différence cruciale : Positif vs Négatif
C'est ici que la distinction se fait avec une simple "coupure" des décimales (troncature).

La Règle d'Or : Il renvoie toujours le plus grand entier qui est inférieur ou égal au nombre donné.

| Type de nombre | Exemple (Float) | Action du Floor | Résultat | Explication |
|:---------------|:----------------|:----------------|:---------|:------------|
| Positif | 3.8 | On descend au "sol" | 3 | 3 est bien l'entier juste en dessous de 3.8. |
| Négatif | -3.8 | On descend encore | -4 | Attention ! -4 est plus petit que -3. Le "sol" sous -3.8, c'est -4, pas -3. |

2. À quoi ça sert concrètement ?
Pourquoi utiliser "floor" plutôt qu'un arrondi classique (où 3.9 deviendrait 4) ? Voici des cas d'usage fréquents dans la logique informatique :

La Discrétisation (Les cases d'une grille) : Imagine un jeu vidéo en 2D avec une grille (comme un échiquier). Si ton personnage est à la position horizontale 5.9, il est toujours physiquement dans la case numéro 5. Il n'est pas encore entré dans la case 6. Le "floor" permet de savoir instantanément dans quelle case "logique" se trouve un objet.

Calculs de temps (Intervalles complets) : Si tu veux savoir combien d'heures complètes se sont écoulées. Si le chronomètre indique 2.99 heures, cela fait toujours 2 heures complètes, pas 3. On ne passe à 3 que lorsque l'heure est totalement révolue.

Pagination (Interfaces Web) : C'est souvent utilisé (parfois couplé avec son opposé, le "ceiling" ou plafond) pour calculer le nombre d'éléments à afficher. Si tu as un index d'article à 15.4, tu sais que tu as dépassé le 15ème, mais la logique de "floor" aide à déterminer l'index de départ de la page actuelle.

Finance et Marketing : Parfois, pour des raisons psychologiques ou légales, on doit arrondir vers le bas. Si un calcul de réduction donne 19.99 euros de remise, une règle stricte de "floor" pourrait ramener cela à 19 euros (selon la logique métier choisie), bien que mathématiquement ce soit très proche de 20.

3. En résumé
Le "floor" est une opération simple mais puissante qui trouve son utilité dans de nombreux domaines de la programmation et des mathématiques appliquées. Il permet de "descendre" à l'entier le plus proche en dessous d'un nombre à virgule, ce qui est crucial pour des situations où la logique de positionnement, de temps ou de comptage doit être précise et cohérente.

---

## Conclusion

Si Python est une rivière à **typage dynamique** (le type est découvert en naviguant), les annotations de type agissent comme des **balises lumineuses** (les *type hints*) qui guident les vérificateurs statiques pour s'assurer que vous êtes bien sur la bonne voie avant même de mettre le bateau à l'eau.