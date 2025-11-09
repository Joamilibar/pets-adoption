import GenericRepository from './GenericRepository.js';

/**
 * Pet Repository with additional pet-specific methods
 */
class PetRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }
}

export default PetRepository;
