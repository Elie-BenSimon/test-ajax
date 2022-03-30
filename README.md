  ### Startup 

| Champ | Type | Spécificité | Description |
|--|--|--|--|
|id |  INTEGER  | PRIMARY KEY, NOT NULL, AUTO INCREMENT | id de la startup
|name |  VARCHAR(255) | NOT NULL | nom de la startup
|slogan |  VARCHAR(255) |NOT NULL| slogan de la startup
|logo |  VARCHAR(255)  |NOT NULL| url du logo de la startup
|reputation | FLOAT | NULLABLE | réputation de la startup
|money |  FLOAT | NULLABLE | argent de la startup
|places | INTEGER | NULLABLE | nombre de place disponible (pour les devs) de la startup
|rent | FLOAT | NULLABLE | dépense de la startup
|time | TIME| NULLABLE | temps écoulé de la startup
|created_at| TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | la date de création de la startup
|updated_at| TIMESTAMP| NULLABLE, DEFAULT CURRENT_TIMESTAMP | la date de dernière modification de la startup



### User 
  
| Champ | Type | Spécificité | Description |
|--|--|--|--|
|id |  INTEGER | PRIMARY KEY, NOT NULL, AUTO INCREMENT | id de l'utilisateur 
|startup_id |  ENTITY  | NOT NULL |  la startup/l'id de la startup de l'utilisateur
|email |  VARCHAR(255) | NOT NULL, EMAIL| email de l'utilisateur
|password |  VARCHAR(255) | NOT NULL, HASH | password de l'utilisateur
|role |  VARCHAR(255) |NOT NULL| role de l'utilisateur
|created_at| TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | la date de création de l'utilisateur
|updated_at| TIMESTAMP| NULLABLE, DEFAULT CURRENT_TIMESTAMP | la date de dernière modification de l'utilisateur



### Dev

| Champ | Type | Spécificité | Description |
|--|--|--|--|
|id |  INTEGER | PRIMARY KEY, NOT NULL, AUTO INCREMENT | id du developpeur 
|project_id | ENTITY  | NULLABLE | le projet/l'id du projet du developpeur
|startup_id | ENTITY  | NULLABLE | la startup/l'id de la startup du developpeur
|name |  VARCHAR(255) | NOT NUL | nom du developpeur
|avatar |  VARCHAR(255) | NOT NUL| avatar du developpeur
|skill |  FLOAT | NOT NUL | compétence du developpeur
|salary |  FLOAT  | NOT NUL | salaire du developpeur
|lassitude |  FLOAT | NULLABLE | lassitude du developpeur
|created_at| TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | la date de création du developpeur
|updated_at| TIMESTAMP| NULLABLE, DEFAULT CURRENT_TIMESTAMP | la date de dernière modification du developpeur


### Project

| Champ | Type | Spécificité | Description |
|--|--|--|--|
|id |  INTEGER | PRIMARY KEY, NOT NULL, AUTO INCREMENT | id du projet
|startup_id|  ENTITY  | NOT NULL | l'id de la startup du projet
|name |  VARCHAR(255) |NOT NULL| nom du projet
|description |  VARCHAR(255) |NOT NULL | description du projet
|difficulty |  FLOAT |  NOT NULL  | difficulté du projet
|completion |  FLOAT | NULLABLE  | complétion du projet
|created_at| TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | la date de création du projet
|updated_at| TIMESTAMP| NULLABLE, DEFAULT CURRENT_TIMESTAMP | la date de dernière modification du projet
