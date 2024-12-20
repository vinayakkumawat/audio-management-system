import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { corsConfig } from './config/cors.js';
import { setupWebSocketHandlers } from './websocket/handlers.js';
import { errorHandler } from './middleware/errorHandler.js';
import { createLogger } from './utils/logger.js';
import { backupManager } from './utils/csvBackup.js';
import { 
  rateLimiter, 
  loginRateLimiter, 
  sessionMiddleware, 
  securityHeaders 
} from './middleware/security.js';
import { sanitizeInput } from './middleware/sanitizer.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import testUserRoutes from './routes/testUserRoutes.js';
import { initializeAdmin } from './controllers/authController.js';
import { initializeStore } from './data/store.js';

const logger = createLogger('server');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsConfig
});

// Security middleware
app.use(securityHeaders);
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);
app.use(sanitizeInput);

// Rate limiting
app.use(rateLimiter);
app.use('/api/auth/login', loginRateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', testUserRoutes);

// Error handling
app.use(errorHandler);

// WebSocket setup with session support
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

setupWebSocketHandlers(io);

// Initialize data and start server
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await initializeStore();
    await initializeAdmin();

    setInterval(() => {
      backupManager.createBackup()
        .catch(error => logger.error('Scheduled backup failed:', error));
    }, 24 * 60 * 60 * 1000);

    await backupManager.createBackup();

    httpServer.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();