import User from './models/User.js';

export default class UsersDAO {
    async getAll() {
        return await User.find().select('-password').lean();
    }

    async getById(id) {
        return await User.findById(id).select('-password').populate('pets').lean();
    }

    async getByEmail(email) {
        return await User.findOne({ email });
    }

    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async update(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password').lean();
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
}
