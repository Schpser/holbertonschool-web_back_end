# 🎓 Introduction aux Bases de Données NoSQL et MongoDB

## 1. Fondamentaux du NoSQL 📖

> **NoSQL** signifie « **Not only SQL** ». C'est une approche qui s'éloigne des bases de données relationnelles traditionnelles pour offrir plus de flexibilité.

| Propriété | SGBDR (SQL) | NoSQL |
|---|---|---|
| **Modèle de données** | 🏛️ Relationnel (Tables, lignes, colonnes) | 📄 Non-relationnel (Document, Clé-Valeur, Graphe...) |
| **Schéma** | 📏 Strict et prédéfini | 🤸 Dynamique ou Sans Schéma |
| **Scalabilité** | ⬆️ Verticale (plus de puissance) | ➡️ Horizontale (plus de machines) |

### 🎯 Les 4 Types de Bases NoSQL

1.  📄 **Magasins de Documents** : Stockent des documents JSON/BSON (ex: **MongoDB**).
2.  🔑 **Magasins Clé-Valeur** : Simples et rapides (ex: Redis).
3.  🏛️ **Magasins à Colonnes Larges** : Colonnes flexibles (ex: Cassandra).
4.  🕸️ **Magasins de Graphes** : Idéals pour les relations complexes (ex: Neo4j).

---

## 2. MongoDB : Le Document Store 📄

> **MongoDB** est une base de données **orientée document** très populaire, classifiée comme NoSQL. Elle vise à **bien s'adapter à l'échelle**, stocker des **structures de données riches** et fournir un **mécanisme de requête sophistiqué**.

### 🏗️ Structure des Données

```
📚 Base de données
    └── 🗂️ Collection (≈ Table SQL)
             └── 📄 Document (≈ Ligne SQL)
                        └── 🔑 Champs: Valeurs (paires clé-valeur)
```

- **📄 Document** : L'unité de stockage dans MongoDB, équivalent à une ligne. Les documents stockent des paires **champ-valeur** et sont extrêmement polyvalents car ils peuvent contenir des **tableaux** ou des **documents imbriqués**.
- **📦 BSON** (Binary JSON) : Le format dans lequel MongoDB stocke ses documents, c'est une représentation **binaire** de JSON (JavaScript Object Notation).
- **🗂️ Collection** : Un groupe de documents. Contrairement aux tables, une collection **n'impose pas de schéma rigide**, permettant aux documents d'avoir des structures différentes.

### 🤔 Modélisation : Imbriquer ou Référencer ?

> Une décision cruciale en modélisation est d'opter pour l'**imbrication** (stocker les données dans le même document) ou la **référence** (utiliser une soft foreign key).

| Stratégie | Description | ✅ Idéal pour... | ⚠️ Attention |
|---|---|---|---|
| **🎁 Imbrication** (Embedding / Nesting) | Les données associées sont stockées **dans le même document**. Agit comme une **jointure pré-calculée** (pre-computed join). | ✅ Données imbriquées nécessaires **80% du temps** avec le document conteneur.<br>✅ Relation "**un-à-peu**".<br>✅ Ensemble de données **borné et petit**. | ⚠️ Limite de **16 Mo par document**.<br>⚠️ Duplication de données si mal utilisé. |
| **🔗 Référence** | Un document contient l'**ID** d'un autre document, similaire à une clé étrangère. | ✅ Données **rarement demandées ensemble**.<br>✅ Relation "**un-à-plusieurs**" ou "**plusieurs-à-plusieurs**".<br>✅ Ensemble de données **non borné** (ex: logs, vues de page).<br>✅ Évite la **duplication de données**. | ⚠️ Nécessite des requêtes multiples ou des `$lookup`. |

---

## 3. 🛠️ Opérations CRUD et Agrégation

### 📋 Opérations CRUD

| Opération | Méthode (Shell/Driver) | 🎯 Rôle | 💡 Note |
|---|---|---|---|
| **Create** ➕ (Créer) | `insertOne()` / `insertMany()` | Ajoute un ou plusieurs documents. | `insertMany()` est plus rapide pour les insertions en masse. |
| **Read** 🔍 (Lire) | `find()` / `findOne()` | Récupère les documents correspondant aux critères. | Utilisez des **projections** pour ne retourner que certains champs : `{ title: 1, _id: 0 }`. |
| **Update** ✏️ (Mettre à jour) | `updateOne()` / `updateMany()` | Modifie un ou plusieurs documents. | Utilisez des opérateurs `$` pour des mises à jour atomiques. |
| **Delete** 🗑️ (Supprimer) | `deleteOne()` / `deleteMany()` | Supprime un ou plusieurs documents. | Attention : `deleteMany({})` supprime TOUT ! |

### ⚛️ Opérateurs de Mise à Jour Atomique

> Utilisez ces opérateurs préfixés par `$` pour des **mises à jour sûres et performantes** en situations concurrentes.

| Opérateur | Emoji | Action | Exemple d'utilisation |
|---|---|---|---|
| `$set` | ✏️ | Remplace ou ajoute un champ. | Modifier le titre d'un article. |
| `$inc` | ➕➖ | Incrémente ou décrémente un nombre. | Incrémenter un compteur de vues. |
| `$mul` | ✖️ | Multiplie la valeur d'un champ. | Appliquer une réduction de 10%. |
| `$push` | 📥 | Ajoute un élément à un tableau. | Ajouter un commentaire à une liste. |
| `$addToSet` | ✨ | Ajoute un élément à un tableau (sans doublon). | Ajouter un tag unique. |
| `$pull` | 📤 | Retire des éléments d'un tableau. | Supprimer un tag spécifique. |

### 📊 Le Pipeline d'Agrégation

> Le **Pipeline d'Agrégation** est la méthode d'agrégation privilégiée : une série d'**étapes (stages)** qui traitent les documents de manière **séquentielle**.

```
Documents → [$match] → [$group] → [$sort] → [$limit] → Résultat
```

| Étape (Stage) | Emoji | Fonction | 💡 Exemple d'utilisation |
|---|---|---|---|
| `$match` | 🎯 | **Filtre** les documents pour les étapes suivantes. | Réduire le nombre de documents avant un regroupement (ex: filtrer par date). |
| `$group` | 🧩 | **Regroupe** les documents pour calculer des résultats (somme, moyenne, etc.). | Compter le nombre de vols par compagnie aérienne. |
| `$sort` | 📈📉 | **Trie** les documents. | Trier les compagnies par nombre de vols (décroissant). |
| `$limit` | 🔢 | **Restreint** le nombre de documents qui passent à l'étape suivante. | Retourner uniquement les 3 premières compagnies. |
| `$project` | 🎬 | **Sélectionne** ou transforme les champs à retourner. | Renommer des champs ou calculer de nouvelles valeurs. |
| `$lookup` | 🔗 | Effectue une **jointure** avec une autre collection. | Joindre les commandes avec les clients. |

---

## 4. 💻 Outils et Intégration Python

### 🖥️ Interfaces MongoDB

| Outil | Type | Description | 🎯 Usage |
|---|---|---|---|
| **`mongosh`** | 🐚 CLI | Le shell interactif basé sur **JavaScript** et **Node.js** pour interagir directement avec MongoDB. | Exécuter des opérations CRUD, tester des requêtes, administration. |
| **Robo 3T / Studio 3T** | 🎨 GUI | Interface graphique pour visualiser et gérer vos données. | Exploration visuelle, édition de documents, requêtes complexes. |

**💡 Astuce :** Utilisez `use <db_name>` dans `mongosh` pour changer de base de données !

### 🐍 Intégration avec Python

MongoDB possède un excellent support Python via deux outils principaux :

#### 📦 **PyMongo** (Driver Bas Niveau - Officiel)

> Le driver Python **officiel** et de bas niveau pour communiquer avec MongoDB.

```python
from pymongo import MongoClient

# 🔌 Connexion
client = MongoClient('mongodb://localhost:27017/')
db = client['ma_base']
collection = db['ma_collection']

# 📄 Les documents sont des dictionnaires Python
doc = {"nom": "Alice", "age": 30}
collection.insert_one(doc)
```

| Aspect | Détail |
|---|---|
| **Connexion** | Via `MongoClient()` |
| **Représentation** | Les documents MongoDB = **dictionnaires Python** 📚 |
| **Méthodes** | `.insert_one()`, `.insert_many()`, `.find()`, `.find_one()`, etc. |
| **Curseur** | `.find()` retourne un **Cursor** qui fournit les documents à la demande. |

#### 🏗️ **MongoEngine** (ODM - Object-Document Mapper)

> Un ODM de haut niveau construit sur PyMongo, comparable à un **ORM SQL**.

```python
from mongoengine import Document, StringField, IntField, connect

connect('ma_base')

# 📋 Définition du schéma
class User(Document):
        nom = StringField(required=True, max_length=50)
        age = IntField(min_value=0)

# ✨ Création et sauvegarde
user = User(nom="Alice", age=30)
user.save()

# 🔍 Requête
users = User.objects(age__gte=18)
```

| Aspect | Détail |
|---|---|
| **Classes de Modèle** | Héritent de `mongoengine.Document` 🏛️ |
| **Schéma** | **Explicite** via des champs typés (`StringField`, `ListField`, `required=True`) pour **validation** ✅ |
| **Opérations** | `.save()` pour insérer/mettre à jour<br>`.objects()` pour récupérer (ex: `Tutorial.objects(author="Alex")`) |
| **Avantage** | Moins d'erreurs, validation automatique, code plus propre 🎯 |

---

## 5. ⚙️ Administration et Fonctionnalités Avancées

### 🆔 ObjectID (_id)

> L'identifiant unique de **24 caractères hexadécimaux** attribué à chaque document, généré automatiquement par défaut.

```
ObjectID: 507f1f77bcf86cd799439011
                    └─┬─┘└──┬──┘└─┬─┘└─┬─┘
                        │     │     │    │
         Timestamp  Machine Process Counter
         (4 bytes) (3 bytes)(2 b) (3 bytes)
```

**💡 Astuce :** Les 4 premiers octets représentent un **horodatage (timestamp)** de la création du document !

### 🚀 Fonctionnalités de Performance et d'Analyse

| Fonctionnalité | Emoji | Description | 🎯 Usage |
|---|---|---|---|
| **Vector Search** | 🧠 | Recherche par vecteurs pour l'IA et la recherche sémantique. | Applications intelligentes, IA générative, recherche par similarité. |
| **Stream Processing** | 🌊 | Opérations d'agrégation sur des flux de données continus. | Intégration MongoDB + Kafka, analyse en temps réel. |
| **Sharding** | 🌐 | Distribution des données entre plusieurs serveurs. | Scalabilité horizontale, équilibrage de charge, big data. |

### 🛠️ Méthodes Utiles du Shell

| Méthode | Emoji | Fonction | 💡 Exemple |
|---|---|---|---|
| `.pretty()` | 💅 | Rend la sortie JSON plus lisible. | `db.users.find().pretty()` |
| `.count()` | 🔢 | Compte le nombre de documents. | `db.users.count({ age: { $gte: 18 } })` |
| `.estimatedDocumentCount()` | 📊 | Estimation rapide du nombre de documents. | `db.users.estimatedDocumentCount()` |
| `.distinct()` | 🔍 | Retourne les valeurs uniques pour un champ. | `db.users.distinct("city")` |
| `.limit(n)` | 🔢 | Limite le nombre de résultats. | `db.users.find().limit(10)` |
| `.skip(n)` | ⏭️ | Saute les n premiers documents. | `db.users.find().skip(20)` |
| `.sort()` | 📈 | Trie les résultats. | `db.users.find().sort({ age: -1 })` |

**⛓️ Chaînage :** Ces méthodes peuvent être **chaînées** pour paginer et trier :
```javascript
db.users.find({ age: { $gte: 18 } })
                .sort({ nom: 1 })
                .skip(10)
                .limit(5)
                .pretty()
```

### 👥 Administration via mongosh

- **Utilisateurs et Rôles** : Gestion des permissions et de la sécurité 🔒
- **Réplication** : Haute disponibilité avec des replica sets 🔄
- **Partitionnement (Sharding)** : Distribution des données pour la scalabilité 🌐

---

## 📚 Récapitulatif Visuel

```
┌─────────────────────────────────────────────────────────┐
│                    🎯 MONGODB                           │
├─────────────────────────────────────────────────────────┤
│  📊 Type: NoSQL Document Store                          │
│  📦 Format: BSON (Binary JSON)                          │
│  🏗️  Structure: Database → Collection → Document        │
│  ⚡ Scalabilité: Horizontale (Sharding)                 │
├─────────────────────────────────────────────────────────┤
│  🛠️  CRUD: insertOne, find, updateOne, deleteOne        │
│  📊 Agrégation: $match → $group → $sort → $limit        │
│  🐍 Python: PyMongo (bas niveau) / MongoEngine (ODM)    │
│  🔧 Outils: mongosh (CLI) / Robo 3T (GUI)              │
└─────────────────────────────────────────────────────────┘
```

**🎉 Happy coding !**