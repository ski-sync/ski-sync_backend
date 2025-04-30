const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const port = 3000;
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Middleware pour l'authentification
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Vérifier si l'utilisateur existe toujours
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });
      
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Préfixe pour toutes les routes
app.use('/api', (req, res, next) => {
  next();
});

// Routes d'authentification
app.post('/api/users/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Générer le token JWT
    const token = jwt.sign({ 
      userId: user.id,
      email: user.email 
    }, JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Générer le token JWT
    const token = jwt.sign({ 
      userId: user.id,
      email: user.email 
    }, JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Routes des utilisateurs
app.get('/api/users', authenticate, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return res.status(200).json(users);
  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/users/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.patch('/api/users/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    
    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Préparer les données à mettre à jour
    const updateData = {};
    
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    
    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/users/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Supprimer l'utilisateur
    await prisma.user.delete({
      where: { id },
    });
    
    return res.status(204).end();
  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Routes des statistiques
app.post('/api/statistics/log-activity', authenticate, async (req, res) => {
  try {
    const { userId, activity, details } = req.body;
    const timestamp = req.body.timestamp || new Date();
    
    // Créer l'activité
    const activityRecord = await prisma.activity.create({
      data: {
        userId,
        activity,
        details,
        timestamp,
      },
    });
    
    return res.status(201).json(activityRecord);
  } catch (error) {
    console.error('Log activity error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/statistics/user/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;
    
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();
    
    // Récupérer les activités
    const activities = await prisma.activity.findMany({
      where: {
        userId,
        timestamp: {
          gte: start,
          lte: end,
        },
      },
    });
    
    // Agréger les activités par type
    const activityCounts = {};
    activities.forEach(activity => {
      if (!activityCounts[activity.activity]) {
        activityCounts[activity.activity] = 0;
      }
      activityCounts[activity.activity]++;
    });
    
    return res.status(200).json({
      userId,
      startDate: start,
      endDate: end,
      activityCounts,
      totalActivities: activities.length,
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/statistics/system', authenticate, async (req, res) => {
  try {
    // Date il y a 30 jours
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    // Obtenir les activités
    const activities = await prisma.activity.findMany({
      where: {
        timestamp: {
          gte: thirtyDaysAgo,
        },
      },
    });
    
    // Agréger les activités par type
    const activityCounts = {};
    activities.forEach(activity => {
      if (!activityCounts[activity.activity]) {
        activityCounts[activity.activity] = 0;
      }
      activityCounts[activity.activity]++;
    });
    
    // Compter les utilisateurs uniques
    const userIds = new Set(activities.map(a => a.userId));
    
    return res.status(200).json({
      period: '30 days',
      uniqueUsers: userIds.size,
      totalActivities: activities.length,
      activityBreakdown: activityCounts,
    });
  } catch (error) {
    console.error('Get system stats error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur monolithique démarré sur http://localhost:${port}/api`);
  console.log('Routes disponibles:');
  console.log('POST /api/users/register - Créer un utilisateur');
  console.log('POST /api/users/login - Se connecter');
  console.log('GET /api/users - Récupérer tous les utilisateurs (protégé)');
  console.log('GET /api/users/:id - Récupérer un utilisateur (protégé)');
  console.log('PATCH /api/users/:id - Mettre à jour un utilisateur (protégé)');
  console.log('DELETE /api/users/:id - Supprimer un utilisateur (protégé)');
  console.log('POST /api/statistics/log-activity - Enregistrer une activité (protégé)');
  console.log('GET /api/statistics/user/:userId - Obtenir les statistiques d\'un utilisateur (protégé)');
  console.log('GET /api/statistics/system - Obtenir les statistiques du système (protégé)');
}); 