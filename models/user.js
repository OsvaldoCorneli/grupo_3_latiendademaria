
const fs = require('fs')
const path = require('path')

const usersFilePath = path.join(__dirname, '../utils/users.json');
const Users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersServices = {
    index: function () {
        return Users
    },
    create: function (data) {
        let id = 0
        for (let i in Users) {
            if (id < Users[i].id) id = Users[i].id
        }
        const newUser = [
            ...Users,
            {
                id: id+1,
                ...data
            }
        ]

    },
    login: function (data) {
        let { email, password } = data
        let user = Users.find((user) => user.email == email)
        if (user?.password == password) {
            return {...user, access: true}
        } else {
            return {access: false}
        }
    },
    update: function (data) {

    },
    detail: function (id) {
        const detailUser = Users.find((x) => x.id == id)
        return detailUser
    }
}

module.exports = usersServices