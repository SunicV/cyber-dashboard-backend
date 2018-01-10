/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
const users = [{
    id: 1,
    name: 'tom',
    email: 'example@cc.com',
    password: '123456'
}];

*/
const userSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    password: String
});

userSchema.index({ id: 1 });

userSchema.statics.getUserByEmail = function name(params) {
    try {
        //    const data = await this.findOne({ email: params.email });
        const data = this.find({ email: params.email });
        if (!data) {
            return null;
        } else {
            return data;
        }

    } catch (error) {
        throw new Error(error);
    }
}

const usersModel = mongoose.model('users', userSchema);

module.exports = usersModel;