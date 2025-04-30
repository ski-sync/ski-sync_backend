const axios = require('axios');

const API_URL = 'http://localhost:3000/api';
let token = null;
let userId = null;

// Fonction pour l'affichage des résultats
const log = (title, data) => {
  console.log('\n====================');
  console.log(`${title}:`);
  console.log('====================');
  console.log(JSON.stringify(data, null, 2));
};

// Fonction pour gérer les erreurs
const handleError = (error) => {
  console.log('\n====================');
  console.log(`ERROR:${error.code || ''}`);
  console.log('====================');
  
  if (error.response) {
    console.log(`Status: ${error.response.status}`);
    console.log(`Data: ${JSON.stringify(error.response.data, null, 2)}`);
    console.log(`Headers: ${JSON.stringify(error.response.headers, null, 2)}`);
  } else if (error.request) {
    console.log('No response received from the server');
    console.log(error.request);
  } else {
    console.log(`Error message: ${error.message}`);
  }
  
  if (error.config) {
    console.log('\nRequest config:');
    console.log(`Method: ${error.config.method}`);
    console.log(`URL: ${error.config.url}`);
    if (error.config.data) {
      console.log(`Data: ${error.config.data}`);
    }
    if (error.config.headers) {
      console.log(`Headers: ${JSON.stringify(error.config.headers, null, 2)}`);
    }
  }
};

// Test d'inscription - version plus simple
const testSimpleRegister = async () => {
  console.log(`\nEnvoi d'une requête au ${API_URL}/users/register...`);
  
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/users/register`,
      data: {
        username: `user_${Date.now()}`,
        email: `user_${Date.now()}@example.com`,
        password: 'password123',
      },
      timeout: 10000 // 10 secondes
    });
    
    console.log(`\nRéponse reçue avec le statut: ${response.status}`);
    console.log(JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.log(`\nErreur lors de l'inscription: ${error.message}`);
    handleError(error);
    return null;
  }
};

// Exécution du test simple
const runSimpleTest = async () => {
  console.log('Démarrage du test simple...');
  await testSimpleRegister();
};

// Exécution du test simple
runSimpleTest();

// Test de connexion
const testLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });

    log('Login', response.data);
    token = response.data.token;
    userId = response.data.id;
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Test de récupération de tous les utilisateurs
const testGetAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    log('Get All Users', response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Test de récupération d'un utilisateur par ID
const testGetUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    log('Get User', response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Test de mise à jour d'un utilisateur
const testUpdateUser = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    log('Update User', response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Test de suppression d'un utilisateur
const testDeleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    log('Delete User', response.data || 'Success (No content)');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Exécution des tests
const runTests = async () => {
  console.log('Starting tests...');

  // Inscription
  const registerData = await testSimpleRegister();
  
  if (!registerData) {
    console.error('Registration failed, cannot continue tests');
    return;
  }

  // Connexion
  await testLogin(registerData.email, 'password123');

  // Récupérer tous les utilisateurs
  await testGetAllUsers();

  // Récupérer un utilisateur
  await testGetUser(userId);

  // Mettre à jour un utilisateur
  await testUpdateUser(userId, { username: 'updated_username' });

  // Récupérer l'utilisateur mis à jour
  await testGetUser(userId);

  // Supprimer l'utilisateur
  // Attention: décommentez la ligne suivante seulement si vous voulez vraiment supprimer l'utilisateur
  // await testDeleteUser(userId);

  console.log('\nAll tests completed!');
};

// Exécution des tests
runTests(); 