// ---------- API ----------
// Creation

    // Installation dépendances


    // BDD
      // Création
        // docker
          docker run --name smartcity -e POSTGRES_USER=smartcity -e POSTGRES_PASSWORD=db1 -e POSTGRES_DB=smartcity -p 5432:5432 -d postgres

      // Création + remplissage
        npm run initDB

// ---------- MOBILE ----------
// Creation
npx create-expo-app mobile

// Installation dépendances
npm install redux
// => reducers
// => actions
// => selectors
// => Store.js
npm install react-redux

      // Afficher les cartes, marqueurs, etc
      npm install react-native-maps

      // Slider pour les reviews
      npm install @react-native-community/slider

      // Check box
      npx expo install expo-checkbox

      // Navigation
      npm install @react-navigation/native @react-navigation/native-stack
      npm install @react-navigation/drawer

      // Pour afficher infos lors d'un click sur une toilette
        // -> {Card}
      npm install react-native-paper

      // Pour requêtes vers l'API
      npm install axios

      // Pour la localisation
      npm install expo-location@~14.3.0

      // Fetch commands
      npm install axios

      npx expo install react-native-reanimated@~2.9.1

// ---------- WEB ----------
// Creation

// Installation dépendances
      // initialiser package.json
      npm init

      // express
      npm install -s express
      

      // map
      npm i react-leaflet
