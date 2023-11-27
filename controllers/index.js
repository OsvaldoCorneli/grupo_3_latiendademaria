

const Controllers = {
    getHome: async function (req, res) {
        try {
            res.render('home')
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = Controllers