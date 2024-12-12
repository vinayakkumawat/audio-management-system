import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { addUser, getUser } from '../data/store.js';
import { BCRYPT_ROUNDS } from '../config/constants.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('testUserController');

export const loginTestUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await getUser(username);
    if (!user) {
      logger.warn(`Login attempt failed: User not found - ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      logger.warn(`Login attempt failed: Invalid password - ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPassword } = user;
    logger.info(`User logged in successfully: ${username}`);
    res.json({ user: userWithoutPassword });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const registerTestUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = await getUser(username);
    if (existingUser) {
      logger.warn(`Registration failed: Username already exists - ${username}`);
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const user = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    await addUser(user);
    logger.info(`New user registered: ${username}`);

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};