const axios = require('axios');

const API_URL = 'http://localhost:3333';
let token = null;
let userId = null;

// Fonction pour l'affichage des résultats
const log = (title, data) => {
  console.log('\n====================');
  console.log(`${title}:`);
  console.log('====================');
  console.log(JSON.stringify(data, null, 2));
};

// Test d'inscription
const testRegister = async () => {
  try {
    console.log('\nTest d\'inscription...');
    const response = await axios.post(`${API_URL}/register`, {
      username: `user_${Date.now()}`,
      email: `user_${Date.now()}@example.com`,
      password: 'password123',
    });

    log('Inscription réussie', response.data);
    token = response.data.token;
    userId = response.data.id;
    return response.data;
  } catch (error) {
    console.error('Erreur d\'inscription:', error.message);
    if (error.response) {
      console.error('Détails:', error.response.data);
    }
    return null;
  }
};

// Test de connexion
const testLogin = async (email, password) => {
  try {
    console.log('\nTest de connexion...');
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    log('Connexion réussie', response.data);
    token = response.data.token;
    userId = response.data.id;
    return response.data;
  } catch (error) {
    console.error('Erreur de connexion:', error.message);
    if (error.response) {
      console.error('Détails:', error.response.data);
    }
    return null;
  }
};

// Test de récupération de tous les utilisateurs
const testGetAllUsers = async () => {
  try {
    console.log('\nTest de récupération de tous les utilisateurs...');
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    log('Utilisateurs récupérés', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur de récupération des utilisateurs:', error.message);
    if (error.response) {
      console.error('Détails:', error.response.data);
    }
    return null;
  }
};

// Test de récupération d'un utilisateur par ID
const testGetUser = async (id) => {
  try {
    console.log(`\nTest de récupération de l'utilisateur ${id}...`);
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    log('Utilisateur récupéré', response.data);
    return response.data;
  } catch (error) {
    console.error(`Erreur de récupération de l'utilisateur ${id}:`, error.message);
    if (error.response) {
      console.error('Détails:', error.response.data);
    }
    return null;
  }
};

// Exécution des tests
const runTests = async () => {
  console.log('===== DÉMARRAGE DES TESTS =====');

  // Inscription
  const registerData = await testRegister();
  
  if (!registerData) {
    console.error('\nL\'inscription a échoué, impossible de continuer les tests');
    return;
  }

  // Connexion
  const loginData = await testLogin(registerData.email, 'password123');
  
  if (!loginData) {
    console.error('\nLa connexion a échoué, impossible de continuer les tests');
    return;
  }

  // Récupérer tous les utilisateurs
  await testGetAllUsers();

  // Récupérer un utilisateur
  await testGetUser(userId);

  console.log('\n===== TESTS TERMINÉS =====');
};

// Exécution des tests
runTests(); 