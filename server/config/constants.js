export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  NEW_AUDIO: 'new_audio',
  AUDIO_REMOVED: 'audio_removed',
  ERROR: 'error',
};

export const CSV_FILES = {
  USERS: 'data/users.csv',
  AUDIO: 'data/audio.csv',
  ADMIN: 'data/admin.csv',
};

// Use environment variables for sensitive data
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
export const BCRYPT_ROUNDS = 10;

// Production configuration
export const PRODUCTION_CONFIG = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'production',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'https://yourdomain.com',
  WS_URL: process.env.WS_URL || 'wss://yourdomain.com',
};