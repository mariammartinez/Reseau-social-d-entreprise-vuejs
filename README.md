
# Créer un réseau social d'entreprise.

Le Projet consiste à développer le MVP d'un réseau social d'entreprise inspiré de 9gag.
Les employés partagent et commentent les posts avec leurs collègues.

Les contraintes techniques sont d'utiliser une base de données MySQL, un front Vue.js et un back API REST en Express.js.

## Instalation

### Back

Executer schema.sql qui se trouve dans database

Creer config.json dans models avec les clés suivantes:
````
{
  "user": "user",
  "password": "password"
}
````

````
npm i
nodemon serve
````

### Front
````
npm run serve
````

### Administrateur

Pour tester la session admin, lancer la commande dans la base de données
````
UPDATE user SET isAdmin = 1 WHERE id = ?;
```` 

Pensez à se déconnecter et reconnecter pour réinitialiser la session 

