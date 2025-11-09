import UsersDAO from '../dao/Users.dao.js';
import PetsDAO from '../dao/Pets.dao.js';
import AdoptionsDAO from '../dao/Adoption.dao.js';
import UserRepository from '../repository/UserRepository.js';
import PetRepository from '../repository/PetRepository.js';
import AdoptionRepository from '../repository/AdoptionRepository.js';

/**
 * Service layer - instantiate repositories with their DAOs
 */
export const usersService = new UserRepository(new UsersDAO());
export const petsService = new PetRepository(new PetsDAO());
export const adoptionsService = new AdoptionRepository(new AdoptionsDAO());
