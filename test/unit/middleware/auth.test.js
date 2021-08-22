const { User } = require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');
// const jest = require('jest');


describe('auth middleware', () => {
    it('should populate req.user with a payload of valid JWT', () => {
        const user = { 
            _id: mongoose.Types.ObjectId().toHexString(), 
            isAdmin: true 
        };
        const token = new User(user).generateAuthentication();

        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next = jest.fn();

        auth(req, res, next);

        expect(req.user).toMatchObject(user);

    })
});