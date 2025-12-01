# 📚 Cours sur le Design d'API : HATEOAS, Pagination & Plus

Ce cours aborde deux aspects essentiels de l'architecture logicielle : une contrainte fondamentale du style REST (**HATEOAS**) et les meilleures pratiques pour la conception d'API modernes (**Filtrage, Pagination, Tri**).

---

## 1. HATEOAS : L'Hypermedia comme Moteur de l'État Applicatif 🚀

**HATEOAS** (Hypermedia as the Engine of Application State) est une contrainte qui distingue REST des autres styles architecturaux.

### 🎯 Définition et Objectif

| Élément | Explication |
|---|---|
| **🔑 Principe Clé** | Un client interagit avec une application dont les serveurs fournissent des informations dynamiquement via l'hypermedia. |
| **🧠 Connaissance Client** | Un client REST n'a besoin d'aucune connaissance préalable sur la manière d'interagir avec un serveur, au-delà d'une compréhension générique de l'hypermedia. |
| **🔓 Découplage** | Les restrictions HATEOAS découplent le client et le serveur, permettant à la fonctionnalité du serveur d'évoluer de manière indépendante. |
| **📜 Origine** | Le terme a été inventé en 2000 par Roy Fielding. C'est une partie essentielle de l'« interface uniforme » de REST. |

### ⚙️ Fonctionnement (L'exemple du Moteur d'État)

L'interaction RESTful est guidée par l'hypermedia, plutôt que par des informations hors bande.

```
1️⃣ Requête Initiale → 2️⃣ Découverte → 3️⃣ Transition d'État
```

1.  **🚪 Requête Initiale** : Un agent utilisateur effectue une requête HTTP vers un point d'entrée.
2.  **🔍 Découverte** : Toutes les requêtes subséquentes sont découvertes à l'intérieur de la réponse de chaque requête.
3.  **🔄 Transition d'État** : Le client transite à travers les états de l'application en sélectionnant des liens.

> **💡 Exemple concret :** Le terme "Engine of Application State" vient du fait que les actions possibles varient selon l'état de la ressource.
> 
> • 💰 Si un compte a un solde **positif**, la réponse JSON inclut des liens pour les dépôts, retraits, transferts, etc.
> 
> • 📉 Si le compte est à **découvert** (nouvel état), la réponse ne pourrait afficher qu'un seul lien : celui pour effectuer un dépôt.

### 🛠️ Implémentations Courantes

Plusieurs spécifications existent pour implémenter l'hypermedia sur des formats comme JSON ou XML :

| Spécification | Format de Base | Liens Définis | Actions Définies (Requêtes HTTP) |
|---|---|---|---|
| **HAL** 🔗 | JSON ou XML | ✅ Oui | ❌ Non |
| **JSON-LD** 🌐 | JSON | ✅ Oui | ❌ Non |
| **Siren** 🚨 | JSON | ✅ Oui | ✅ Oui |
| **Collection+JSON** 📦 | JSON | ✅ Oui | ✅ Oui |
| **JSON:API** 📡 | JSON | ✅ Oui | ✅ Oui |
| **Hydra** 🐙 | JSON-LD | ✅ Oui | ✅ Oui |

---

## 2. Conception d'API : Filtrage, Pagination et Tri 🛠️

Un bon design d'API améliore l'expérience développeur (DX), la performance et la maintenabilité.

### 🔍 Le Filtrage (Filtering)

Le filtrage est ajouté via des paramètres URL, composés de :
1.  Le nom de la **🏷️ propriété**.
2.  L'**⚡ opérateur** (ex: `eq`, `lte`, `gte`).
3.  La **💎 valeur** du filtre.

| Méthode | Exemple de Syntaxe | Avantages | Inconvénients |
|---|---|---|---|
| **🔲 LHS Brackets** | `GET /items?price[gte]=10` | ✨ Facile pour les clients, flexible. | ⚠️ Nécessite plus de parsing côté serveur. |
| **➡️ RHS Colon** | `GET /items?price=gte:10` | ⚡ Très facile à parser côté serveur. | ⚠️ Les valeurs littérales (ex: `gt:100`) nécessitent un traitement spécial. |
| **🔎 Search Query Param** | `GET /items?q=title:red AND price:[10 TO 100]` | 🎯 Requêtes très flexibles (supporte Lucene/ElasticSearch). | 📚 Plus difficile pour les débutants (syntaxe Lucene). |

### 📄 La Pagination (Pagination)

La pagination est nécessaire pour les endpoints qui retournent une grande liste d'entités.

| Méthode | Principe | Avantages | Inconvénients Notables |
|---|---|---|---|
| **📊 Offset Pagination** | Utilise `limit` et `offset` (`?limit=20&offset=100`). | ✅ Le plus facile à implémenter ; stateless. | ⚠️ Non performant pour les grands offsets ; inconsistances lors d'insertions (Page drift). |
| **🔑 Keyset Pagination** | Utilise la valeur du dernier élément comme filtre (`?limit=20&created:lte:2021-01-20`). | 🚀 Performance constante ; ordre consistant. | ⚠️ Couplage serré avec les filtres/tri ; ne fonctionne pas bien pour les champs à faible cardinalité. |
| **🎯 Seek Pagination** | Utilise un identifiant unique (`?limit=20&after_id=20`). | ⭐ Pas de couplage ; performance et ordre consistants. | 🔧 Plus complexe à implémenter côté backend. |

### 📊 Le Tri (Sorting)

Le tri permet de spécifier un ordre (ascendant/descendant) pour les listes.

**🎨 Formats recommandés :**
-   `GET /users?sort_by=asc(email)` 📧
-   `GET /users?sort_by=+email` (➕ pour asc, ➖ pour desc)
-   `GET /users?sort_by=email.asc` 🔼

> **💡 Tri Multi-Colonnes :** Pour trier par plusieurs colonnes, il est essentiel de coupler le champ et l'ordre.
> 
> `GET /users?sort_by=desc(last_modified),asc(email)` 📅✉️
> 
> Cela évite l'ambiguïté que des paramètres séparés pourraient causer.

---

## 3. 🏛️ Conclusion : La Métaphore de la Bibliothèque

> 📚 Si nous considérons le style architectural **REST** comme une bibliothèque immense :
> 
> 1.  **🔗 HATEOAS** est comme un catalogue interactif. Au lieu de vous donner une liste figée, il vous donne le livre demandé et, à l'intérieur, indique dynamiquement les chapitres connexes et les actions possibles.
> 
> 2.  Le **🔍 Filtrage**, la **📄 Pagination** et le **📊 Tri** sont les mécanismes de recherche avancés. Le filtrage trouve ce dont vous avez besoin, la pagination vous évite de porter des millions de livres, et le tri les organise. La **🎯 Seek Pagination** est la plus performante, car vous reprenez là où vous vous êtes arrêté, assurant une recherche rapide même si la bibliothèque s'agrandit.

---

## 🔗 SECTION : Du Concept au Code

### 1️⃣ HATEOAS en Pratique

**📖 Théorie (ton cours) :**

> *"HATEOAS fournit des liens vers les actions possibles"*

**💻 Exemple de code Python :**

```python
# 🎯 API Response avec HATEOAS
{
    "data": [...],  # 📦 Les données principales
    "links": {      # ← 🔗 HATEOAS en action !
        "self": "/api/items?page=1",
        "next": "/api/items?page=2",   # ➡️ Lien vers prochaine action
        "prev": None,                   # ⬅️ Pas de page précédente
        "first": "/api/items?page=1",
        "last": "/api/items?page=50"
    }
}

# 🛠️ Implémentation en Python
def get_hyper(self, page, page_size):
    return {
        'page_size': page_size,
        'page': page,
        'data': self.get_page(page, page_size),
        'next_page': page + 1 if page < total_pages else None,  # ← 🔗 HATEOAS !
        'prev_page': page - 1 if page > 1 else None,            # ← 🔗 HATEOAS !
        'total_pages': total_pages
    }
```

---

### 2️⃣ Pagination en Pratique

**📖 Théorie :**

> *"Offset Pagination utilise limit et offset"*

**💻 Exemple de code :**

```python
# 🌐 Dans une API REST (URL)
GET /items?limit=20&offset=100

# 🗄️ En SQL (ce que fait la DB)
SELECT * FROM items LIMIT 20 OFFSET 100;

# 🐍 En Python (ton projet)
def index_range(page, page_size):
    # limit = page_size, offset = (page-1)*page_size
    start = (page - 1) * page_size  # ← 📍 OFFSET
    end = page * page_size          # ← 📍 OFFSET + LIMIT
    return (start, end)
```

---

### 3️⃣ Filtrage en Pratique

**📖 Théorie :**

> *"Le filtrage via paramètres URL : ?price[gte]=10&price[lte]=100"*

**💻 Exemple de code :**

```python
# 🌐 URL de l'API
GET /api/products?price[gte]=10&price[lte]=100&category=electronics

# 📨 Ce que le backend Python reçoit
request.args = {
    'price[gte]': '10',
    'price[lte]': '100', 
    'category': 'electronics'
}

# 🔧 Ce que tu dois parser en Python
def parse_filters(request_args):
    filters = {}
    for key, value in request_args.items():
        if '[' in key and ']' in key:
            # Ex: price[gte] → {'field': 'price', 'op': 'gte', 'value': '10'}
            field, op = key.split('[')
            op = op.rstrip(']')
            filters.append({'field': field, 'op': op, 'value': value})
    return filters
```

---

## 🚀 Règle d'or pour ton apprentissage

Pour chaque concept théorique, cherche l'équivalent en code :

| Concept | 📖 Théorie | 💻 Code Python |
|---------|-----------|---------------|
| **🔗 HATEOAS** | Liens hypermedia | Dict avec `next_page`, `prev_page` |
| **📄 Pagination** | Découpage données | `index_range()` + slicing `list[start:end]` |
| **🔍 Filtrage** | Sélection données | Parsing de `request.args` |
| **📊 Tri** | Organisation | `sorted(data, key=lambda x: x['field'])` |

---

**🎓 Félicitations ! Tu maîtrises maintenant les concepts clés du design d'API REST moderne ! 🚀**