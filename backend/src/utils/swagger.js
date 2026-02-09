import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pet Adoption API',
      version: '1.0.0',
      description: 'REST API for managing users, pets, and adoptions',
      contact: {
        name: 'API Support',
        email: 'support@petadoption.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'coderCookie'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['user', 'admin'] },
            pets: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Pet: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            specie: { type: 'string' },
            breed: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
            adopted: { type: 'boolean' },
            owner: { type: 'string' },
            image: { type: 'string' },
            location: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Adoption: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            owner: { type: 'string' },
            pet: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
