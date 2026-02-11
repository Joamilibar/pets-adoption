export default class PetRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async create(petData) {
        return await this.dao.create(petData);
    }

    async update(id, updateData) {
        return await this.dao.update(id, updateData);
    }

    async delete(id) {
        return await this.dao.delete(id);
    }
}
