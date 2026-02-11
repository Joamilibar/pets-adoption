export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async getByEmail(email) {
        return await this.dao.getByEmail(email);
    }

    async create(userData) {
        return await this.dao.create(userData);
    }

    async update(id, updateData) {
        return await this.dao.update(id, updateData);
    }

    async delete(id) {
        return await this.dao.delete(id);
    }
}
