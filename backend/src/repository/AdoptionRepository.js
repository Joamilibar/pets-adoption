export default class AdoptionRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async getByUserId(userId) {
        return await this.dao.getByUserId(userId);
    }

    async create(adoptionData) {
        return await this.dao.create(adoptionData);
    }

    async delete(id) {
        return await this.dao.delete(id);
    }
}
