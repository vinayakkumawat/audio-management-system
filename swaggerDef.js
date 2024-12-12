export default {
  openapi: '3.0.0',
  info: {
    title: 'Audio Management System API',
    version: '1.0.0',
    description: 'API documentation for the Audio Management System'
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};