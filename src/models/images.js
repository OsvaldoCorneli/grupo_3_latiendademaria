const db = require('../database/models');
const {Op, Sequelize} = require('sequelize');
const fs = require('fs');
const path = require('path');
const publicPath = path.join(__dirname+'/../public')

module.exports = {
    all: async function(){
        try {
            const response = await db.Images.findAll({include: ['products'], logging: false})
            return response
        } catch (error) {
            return error
        }
    },
    newProductImage: async function (upload, prodId) {
        try {
            if (upload.length > 0) {
                let newImages = upload.map((img) => {return img.path.split('public')[1]})
                for (let i in newImages) {
                    const createImage = await db.Images.create({pathName: newImages[i]})
                    await db.prod_images.create({
                        product_id: +prodId,
                        image_id: createImage.id})
                }
            }
        } catch (error) {
            return error
        }
    },
    editProductImages: async function (local, upload, prodId) {
        try {
            const productImages = await db.Images.findAll({
                include: {
                    model: db.Products,
                    as: 'products',
                    where: {id: prodId},
                },
                logging: false
            })
            let holdImage = Array.isArray(local)? local : [local];
            for (let i in productImages) {
                const { id, pathName, products } = productImages[i]
                if (!holdImage.includes(pathName)) {
                    await db.Prod_images.destroy({where: {id: products[0].prod_images.id}})
                    await db.Images.destroy({where: {id: id}})
                    //this.deleteFile(pathName)
                }
            }
            if (upload) {
                await this.newProductImage(upload, prodId)
            }
        } catch (error) {
            return error
        }
    },
    destroyProduct: async function (prodId) {
        try {
            const productImages = await db.Images.findAll({
                include: {
                    model: db.Products,
                    as: 'products',
                    where: {id: prodId},
                },
                logging: false
            })
            for (let i in productImages) {
                const { id , pathName, products } = productImages[i]
                await db.prod_images.destroy({where: {id: products[0].prod_images.id}})
                await db.Images.destroy({where: {id: id}})
                //this.deleteFile(pathName)
            }
        } catch (error) {
            return error
        }
    },
    deleteFile: function (path) {
        if (fs.readdirSync(publicPath+'/images/uploads').includes(path.split('uploads/')[1])) {
            fs.rmSync(publicPath+path)
        }
    }
}