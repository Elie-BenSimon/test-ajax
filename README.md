# Sheepcheat
Pas d’accent sur les champ pour faciliter la Database
Les relations ne sont pas encore faites entre les différentes Entités/Tables

  ### Startup 

| Champ | type | Modifiable |
|--|--|--|
|id |  int (Auto-Increment) | - |
|dev_id | int | - |
|local_id | int | - |
|projet_id | int | - |
|nom |  varchar (255) |OUI |
|slogan |  varchar(255) |OUI|
|logo |  varchar(255)  |-|
|reputation | float | OUI |
|argent de la startup |  float | OUI |
|charge | float | OUI |
|created_at| datetime | - |
|updated_at| datetime (NULLABLE)| - |

 ### Local 

| Champ | type | Modifiable |
|--|--|--|
|id |  int (Auto-Increment) | - |
|startup_id | int | - |
|nombre de place | int | - |
|cout | int | - |
|loyer |  int | - |
|created_at| datetime | - |
|updated_at| datetime (NULLABLE)| - |

### User 
  
| Champ | Type | Modifiable |
|--|--|--|
|id |  int (Auto-Increment) | - |
|nom |  varchar(255) | OUI|
|password |  hash |OUI |
|role |  varchar(255) |-|
|created_at| datetime | - |
|updated_at| datetime (NULLABLE)| - |


### Dev

| Champ | Type | Modifiable |
|--|--|--|
|id |  int (Auto-Increment) | - |
|projet_id |  int (NULLABLE) | OUI |
|startup_id | int | - |
|nom |  varchar(255) | OUI |
|avatar |  varchar(255) | - |
| competence |  float | OUI |
|salaire |  float  | OUI |
|lassitude |  float | OUI |
|created_at| datetime | - |
|updated_at| datetime (NULLABLE)| - |


### Projet

| Champ | Type | Modifiable |
|--|--|--|
|id |  int (Auto-Increment) | - |
|dev_id|  int |  OUI |
|nom |  varchar(255) |OUI|
|descriptif |  longtext |OUI |
|reputation(v2)|  float | OUI |
|argent (v2)|  float  |  NON/ OUI : si deadline depassé |
|difficulte |  float |  NON  |
|created_at| datetime | - |
|updated_at| datetime (NULLABLE)| - |


