import Adoption from './models/Adoption.js';

export default class AdoptionsDAO {
    async getAll() {
        return await Adoption.find()
            .populate('owner', 'first_name last_name email')
            .populate('pet', 'name specie breed birthDate image adopted location')
            .lean();
    }

    async getById(id) {
        return await Adoption.findById(id)
            .populate('owner', 'first_name last_name email')
            .populate('pet', 'name specie breed birthDate image adopted location')
            .lean();
    }

    async getByUserId(userId) {
        return await Adoption.find({ owner: userId })
            .populate('pet', 'name specie breed birthDate image adopted location')
            .lean();
    }

    async create(adoptionData) {
        const adoption = new Adoption(adoptionData);
        return await adoption.save();
    }

    async delete(id) {
        return await Adoption.findByIdAndDelete(id);
    }
}
