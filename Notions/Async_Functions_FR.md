💡 Cours Concis : Python Asynchrone et Concurrence

## 1. Comprendre la Concurrence et le Parallélisme 🔄

Ces concepts définissent la manière dont plusieurs tâches sont gérées dans un programme.

| Concept | Définition | Implémentation en Python | Idéal pour... |
|---------|-----------|-------------------------|---------------|
| **Parallélisme** 🚀 | Exécution de multiples opérations au même moment. | Multiprocessing (répartit les tâches sur les cœurs du CPU). | Tâches liées au CPU (CPU-bound), comme les calculs mathématiques intensifs. |
| **Concurrence** ⚡ | La capacité pour plusieurs tâches de s'exécuter de manière chevauchante (overlapping), sans nécessiter le parallélisme strict. | Threading ou Async I/O. | Tâches liées à l'I/O (I/O-bound). |
| **Async I/O** 🔀 | Modèle concurrentiel mono-threadé utilisant le multitâche coopératif. Il évite la surcharge de la gestion des threads. | La librairie asyncio avec les mots-clés async et await. | Tâches I/O-bound où l'application passe beaucoup de temps à attendre (ex: requêtes réseau, accès fichiers). |

**💡 Bon à savoir :** Une tâche I/O-bound est dominée par l'attente d'entrée/sortie (I/O), tandis qu'une tâche CPU-bound exige que les cœurs du CPU travaillent continuellement. L'Async I/O brille car elle utilise le temps d'attente d'une tâche pour exécuter une autre tâche.

---

## 2. Les Fondations d'asyncio 🏗️

La librairie asyncio permet d'écrire du code concurrent en utilisant la syntaxe async/await.

### 1. Coroutines et Fonctions Asynchrones 📜
• **Coroutine (Coro)** : Un objet awaitable (susceptible d'être attendu) qui peut suspendre son exécution et rendre le contrôle à la boucle d'événements pour reprendre plus tard.
• **Fonction Coroutine** : Définie en utilisant la syntaxe `async def`.

### 2. Les Mots-clés Magiques ✨
• **`async`** : Utilisé pour définir une fonction coroutine (`async def`) ou une structure asynchrone (`async with`, `async for`).
• **`await`** : Utilisé uniquement à l'intérieur d'une fonction `async def`. Il suspend l'exécution de la coroutine courante et demande à la boucle d'événements de laisser d'autres routines s'exécuter pendant qu'elle attend le résultat de l'objet awaitable.
    ◦ ⚠️ **Règle stricte** : Utiliser `await` en dehors d'une fonction `async def` génère une `SyntaxError`.

### 3. La Boucle d'Événements (Event Loop) ⚙️
• **Rôle central** : C'est le cœur de l'application asynchrone. C'est une boucle infinie qui surveille les coroutines, planifie les tâches et réveille les coroutines en attente lorsque leurs opérations I/O sont terminées.
• **Démarrage** : La manière recommandée de lancer la boucle et d'exécuter la coroutine principale est `asyncio.run(main())` (dans le code synchrone de départ).

---

## 3. Modèles et Outils de Programmation asyncio 🛠️

### 1. Planification des Tâches 📋

| Fonction | Description |
|----------|-------------|
| `asyncio.run(main)` | Exécute la coroutine `main()` et gère la boucle d'événements. |
| `asyncio.create_task(coroutine)` | Planifie l'exécution d'une coroutine sur la boucle d'événements, la transformant en objet Task. |
| `asyncio.gather(*awaitables)` | Exécute plusieurs coroutines ou tâches concurrentiellement. Attend que toutes se terminent. |
| `asyncio.as_completed(awaitables)` | Permet de traiter les tâches dynamiquement au fur et à mesure qu'elles se terminent. |

### 2. Patterns de Communication 💬
• **Chaînage de Coroutines** : C'est un flux de travail où le résultat d'une coroutine est utilisé comme entrée pour la coroutine suivante (ex: `user = await fetch_user()`, puis `await fetch_posts(user)`).
• **Intégration de Files d'attente (Queues)** : Utilisation de `asyncio.Queue` pour permettre aux producteurs d'ajouter des éléments et aux consommateurs de les retirer de manière asynchrone.

### 3. Fonctionnalités Avancées 🎯
• **Async Iterators et `async for`** : Permet d'itérer sur des générateurs de données qui sont produits de manière asynchrone.
• **Async Context Managers et `async with`** : Utilisé pour gérer des ressources qui nécessitent des étapes de configuration et de nettoyage asynchrones.
• **Gestion des Exceptions (Python 3.11+)** : La classe `ExceptionGroup` et la nouvelle syntaxe `except*` permettent de gérer gracieusement plusieurs exceptions simultanées.
• **Asyncio REPL** : Un shell interactif où vous pouvez utiliser `await` directement au niveau supérieur.

---

## 4. Le Module random (Génération Aléatoire) 🎲

Le module random est utilisé pour générer des nombres pseudo-aléatoires pour diverses distributions.

| Fonction | Usage |
|----------|-------|
| `random.choice(seq)` | Sélectionne un élément aléatoire. |
| `random.sample(population, k)` | Retourne k éléments uniques (échantillonnage sans remplacement). |
| `random.seed(a)` | Initialise le générateur pour la reproductibilité. |

**⚠️ Sécurité** : Les générateurs pseudo-aléatoires de ce module ne doivent pas être utilisés à des fins cryptographiques. Utilisez le module `secrets` à la place.

---

## 🍳 Analogie de Conclusion : Async I/O

Pensez à l'Async I/O comme un chef de cuisine (la **Boucle d'Événements**) qui prépare plusieurs plats (**Coroutines**) seul dans sa cuisine (le seul **Thread**).

```
Chef (Event Loop) 👨‍🍳
    ├── Pizza au four 🍕 [En attente I/O]
    ├── Hacher légumes 🥗 [Exécution active]
    └── Soupe qui mijote 🍲 [En attente I/O]
```

Quand il met une pizza au four (une opération I/O qui prend du temps), il ne reste pas à regarder. Au lieu de cela, il hache les légumes pour la salade. Lorsque la minuterie sonne, il met les légumes de côté et s'occupe de la pizza.

Il gère toutes les tâches seul, mais en changeant d'activité chaque fois qu'une tâche doit attendre, ce qui **maximise son efficacité** ! ⚡

---

## 5. Patrons et Astuces Pratiques en Asyncio 🚀

### 1. Trier des résultats concurrents sans `sort()` 📊

Lorsqu'on travaille avec des tâches concurrentes, attendre que toutes les tâches se terminent pour ensuite trier les résultats peut être inefficace.

**💡 Pourquoi éviter `sort()` après `gather()` ?**
`asyncio.gather()` attend que *toutes* les tâches soient finies. Si vous avez besoin de traiter les résultats dès qu'ils sont prêts, utilisez `asyncio.as_completed()`.

**Le Patron du Tri Concurrent :**
```python
# Pour trier les résultats sans sort()
results = []
for task in asyncio.as_completed(tasks):
    result = await task
    # Insertion dans une liste triée (tri par insertion)
    results.append(result)
```

### 2. Mesurer le temps avec précision ⏱️

Pour mesurer les performances, `time.perf_counter()` est plus précis que `time.time()`.

**Le Pattern Classique :**
```python
import time
import asyncio

async def main():
    start = time.perf_counter()
    await asyncio.sleep(1) 
    end = time.perf_counter()
    
    total_time = end - start
    print(f"Temps total : {total_time:.2f}s")

asyncio.run(main())
```

### 3. Coroutine vs. Task : Quelle est la différence ? 🤔

| Type | Description | Symbole |
|------|-------------|---------|
| **Coroutine** | Une fonction définie avec `async def`. Ne fait rien tant qu'on ne l'attend pas. | 📜 |
| **Task** | Un wrapper qui planifie la coroutine pour exécution immédiate sur la boucle d'événements. | 🚀 |

> **⚡ Important** : `asyncio.create_task()` lance l'exécution tout de suite !

### 4. Résumé des Points Clés 📝

| Élément | Fonction |
|---------|----------|
| `async def` | Définit une **coroutine** 📜 |
| `await` | **Suspend** l'exécution ⏸️ |
| `asyncio.run()` | **Point d'entrée** principal 🚪 |
| `asyncio.create_task()` | Lance une tâche en **arrière-plan** 🔄 |
| `asyncio.gather()` | Exécute plusieurs coroutines **concurrentiellement** ⚡ |

---

## 6. Compréhensions Asynchrones (PEP 530) 📜

La PEP 530 (introduite en Python 3.6) ajoute des versions asynchrones des syntaxes de compréhension (listes, ensembles, dictionnaires) et des expressions de générateur pour améliorer la lisibilité.

### A. Syntaxe et Types

Les compréhensions asynchrones permettent d'utiliser l'instruction `async for`.

| Type de Compréhension | Exemple de Syntaxe | Supporté par PEP 530 |
|-----------------------|------------------------------------|----------------------|
| Liste | `[i async for i in agen()]` | Oui |
| Ensemble (Set) | `{i async for i in agen()}` | Oui |
| Dictionnaire (Dict) | `{i: i ** 2 async for i in agen()}` | Oui |
| Expression de Générateur | `(i ** 2 async for i in agen())` | Oui |

**Exemple de lisibilité :**
Le code `result = []` suivi de `async for i in aiter(): if i % 2: result.append(i)` peut être remplacé par :
`result = [i async for i in aiter() if i % 2]`

### B. Restrictions d'Usage

1.  **Contexte Obligatoire** : Les compréhensions asynchrones sont uniquement autorisées à l'intérieur d'une fonction définie avec `async def`.
2.  **Itérateur Asynchrone** : L'objet sur lequel on itère doit implémenter la méthode `__aiter__`. Utiliser `async for` avec un itérable synchrone (comme `range`) génère une `TypeError`.

### C. L'utilisation d'`await`

La PEP 530 permet également d'utiliser des expressions `await` dans tous les types de compréhensions (synchrones ou asynchrones), à condition que la compréhension soit dans le corps d'une fonction `async def`.

-   **Exemple synchrone utilisant `await`**: `result = [await fun() for fun in funcs]`
-   **Exemple asynchrone utilisant `await`**: `result = [await fun() async for fun in funcs]`

---

## 7. Générateurs et Annotation de Type (Type Hinting) 🧬

Les générateurs (fonctions utilisant `yield`) et l'annotation de type (PEP 484) sont liés pour indiquer clairement ce qu'une fonction de générateur retourne.

### Le Type `Generator`

Pour annoter le type de retour d'une fonction de générateur, on utilise le type générique `Generator` du module `typing`.

La syntaxe est : `Generator[YieldType, SendType, ReturnType]`.

-   **`YieldType`**: Le type de la valeur produite (`yield`).
-   **`SendType`**: Le type de la valeur qui peut être envoyée au générateur via `generator.send()`.
-   **`ReturnType`**: Le type de la valeur retournée par le générateur.

Si `SendType` et `ReturnType` ne sont pas utilisés, ils peuvent être réglés sur `None` ou omis.

### Distinctions entre `Iterable`, `Iterator` et `Generator`

| Type | Description |
|---|---|
| **Iterable** | Le plus général. Tout objet qui peut être itéré (`__iter__()` ou `__getitem__()`). |
| **Iterator** | Un sous-type de `Iterable`. Implémente le protocole d'itérateur (`__iter__()` et `__next__()`). Pour les générateurs simples, `Iterator[YieldType]` est souvent suffisant. |
| **Generator** | Un sous-type plus spécialisé d' `Iterator`, produit par une fonction `yield`. Son usage est conseillé pour spécifier `SendType` ou `ReturnType`. |
