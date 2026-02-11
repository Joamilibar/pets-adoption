import Pet from './models/Pet.js';

export default class PetsDAO {
    async getAll() {
        return await Pet.find().populate('owner', 'first_name last_name email').lean();
    }

    async getById(id) {
        return await Pet.findById(id).populate('owner', 'first_name last_name email').lean();
    }

    async create(petData) {
        const pet = new Pet(petData);
        return await pet.save();
    }

    async update(id, updateData) {
        return await Pet.findByIdAndUpdate(id, updateData, { new: true }).populate('owner', 'first_name last_name email').lean();
    }

    async delete(id) {
        return await Pet.findByIdAndDelete(id);
    }
}
