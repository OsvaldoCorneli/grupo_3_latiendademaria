
const fs = require('fs')
const path = require('path')

const usersFilePath = path.join(__dirname, '../utils/users.json');
const Users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersServices = {
    index: function () {
        return Users
    },
    create: function (data) {

    },
    login: function (data) {
        let user = Users.find((user) => user.email == data.email)
    },
    update: function (data) {

    },
    detail: function (id) {
        const detailUser = Users.find((x) => x.id == id)
        return detailUser
    }
}

module.exports = usersServices