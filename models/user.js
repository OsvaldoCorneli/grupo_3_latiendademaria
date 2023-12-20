
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
        fs.writeFileSync(usersFilePath, JSON.stringify(newUser,0,4), 'utf-8')
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
        let { id } = data
        console.log(data)
        let UpdatedUsers = Users.filter(x => x.id !== id)
        const updateUser = Users.find(u => u.id == id)
        if (updateUser) {
            UpdatedUsers = [
                ...UpdatedUsers,
                {
                    ...updateUser,
                    ...data
                }
            ]
        }
        fs.writeFileSync(usersFilePath, JSON.stringify(UpdatedUsers,0,4), 'utf-8')
        return Users.find(u => u.id == id)
    },
    detail: function (id) {
        const detailUser = Users.find((x) => x.id == id)
        return detailUser
    }
}

module.exports = usersServices