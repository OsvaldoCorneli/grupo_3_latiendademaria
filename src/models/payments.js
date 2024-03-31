const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const {Op, Sequelize} = require('sequelize');

const pagosPath = path.join(__dirname+'/../data/payments.json')
const pagosJson = JSON.parse(fs.readFileSync(pagosPath, 'utf-8'))

module.exports = {
    all: async function(query) {
        try {
            let {user,desde,hasta,estado, limit} = query
            let condition = {}
            if (user) condition.user_id = user;
            if (desde && hasta) condition.created_at = {[Op.between]: [new Date(desde), new Date(hasta)]};
            if (estado) condition.status = estado;
            let pagination = {}
            if (limit) pagination.limit = +limit
            const response = await db.Payments.findAll({
                where: condition,
                attributes: {exclude: ['user_id']},
                order: [['created_at', 'DESC']],
                limit: pagination?.limit,
                logging: false,
                raw: true
            })
            let grafico = await this.graficoVentas(desde,hasta,estado);
            let topUser = await this.topUser(desde,hasta,estado);
            return {grafico, data: response, topUser}
        } catch (error) {
            return error
        }
    },
    graficoVentas: async function (desde,hasta, estado) {
        try {
            let condition = `AND p.status = '${estado}'`;
            let dates = []
            desde = Date.parse(desde)
            hasta = Date.parse(hasta)
            const oneDayInMillis = 24 * 60 * 60 * 1000;
            while (desde <= hasta) {
                dates.push(new Date(desde).toISOString().split('T')[0])
                desde += oneDayInMillis 
            }
            let sales = []
            for (let i in dates) {
                const [results, metadata] = await db.sequelize.query(`SELECT SUM(total) as total,DATE_FORMAT(created_at, '%Y-%m-%d') as fecha FROM payments p \n
                WHERE DATE_FORMAT(created_at, '%Y-%m-%d') = '${dates[i]}' ${condition} \n
                GROUP BY DATE_FORMAT(created_at, '%Y-%m-%d');`, {logging: false});
                if (results.length == 0) {
                    sales.push({total: 0, fecha: dates[i]})
                    if (i == dates.length-1) {
                        if (sales.reduce((acum, {total}) => acum + Number(total),0) > 0) {
                            return sales
                        } else return []
                    }
                    else continue
                }
                sales.push(results[0])
                if (i == dates.length-1) {
                    if (sales.reduce((acum, {total}) => acum + Number(total),0) > 0) {
                        return sales
                    } else return []
                }
            }
        } catch (error) {
            return error
        }
    },
    topUser: async function (desde,hasta,estado) {
        try {
            let condition =`AND p.status = '${estado}'`;
            const [results, metadata] = await db.sequelize.query(`SELECT SUM(p.total) totalSales, CONCAT(u.apellido," ",u.nombre) nombre \n
                    FROM payments p RIGHT JOIN users u on p.user_id = u.id \n
                    WHERE (DATE_FORMAT(p.created_at, '%Y-%m-%d') BETWEEN '${desde}' AND '${hasta}') ${condition}\n
                    GROUP BY CONCAT(u.apellido," ",u.nombre) ORDER BY totalSales DESC LIMIT 3;`,{logging: false}
                );
            return results
        } catch (error) {
            return error
        }
    },
    detallePago: async function (id) {
        try {
            const detail = await db.Payments.findByPk(+id,{
                include: [
                    {   association: 'user',
                        attributes: ['id','nombre','apellido']
                    },
                    {
                        association: 'products',
                        include: [
                            {   association: 'product',
                                attributes: ['id','name'],
                                include: {
                                    model: db.Images,
                                    as: 'images',
                                    attributes: ['id','pathName'],
                                    through: { attributes: [] }
                                }
                            },
                            {   association: 'color',
                                attributes: ['id','name','hex']
                            }
                        ],
                        attributes: {exclude: ['id','product_id','payment_id','color_id']}
                    }
                ],
                attributes: {exclude: ['user_id']},
                //raw: true,
                logging: false
            })
            return detail
        } catch (error) {
            return error
        }
    },
    userDetail: async function (id,perPage,page) {
        try {
            const response = await db.Payments.findAll({
                where: {user_id: +id},
                attributes: {exclude: ['user_id']},
                order: [['created_at', 'DESC']],
                offset: ((page-1)*perPage),
                limit: perPage,
                logging: false,
                raw:true
            })
            const maxPage = await db.Payments.findAll({where: {user_id: id}, logging: false})
            return {
                data: response,
                page: page,
                perPage: perPage,
                maxPage: Math.ceil(maxPage.length/perPage)
            }
        } catch (error) {
            return error
        }
    },
    create: async function(body) {
        try {
            const {userId, status, products } = body
            const newPay = await db.Payments.create({
                user_id: +userId,
                total: products.reduce((acum,{precio, cantidad}) => acum+(Number(precio)*Number(cantidad)),0),
                status: status? status : 'enproceso',
            },{logging: false})
            for (let i in products) {
                const {product_id, color_id, cantidad, precio} = products[i]
                await db.payment_products.create({
                    payment_id: newPay.id,
                    product_id: +product_id,
                    color_id: +color_id,
                    cantidad: Number(cantidad),
                    precio: Number(precio)
                },{logging: false})
                if (i == products.length-1) {
                    return this.detallePago(newPay.id)
                }
            }
        } catch (error) {
            return error
        }
    },
    updateStatus: async function (body) {
        try {
            const { status, id } = body
            const response = await db.Payments.update({status: status}, {where: {id: +id}})
            return response
        } catch (error) {
            return error
        }
    },
    metrics: async function () {
        try {
            const totalSales = await this.totalSales()
            const topProduct = await this.topProductSales()
            const lastProductSales = await this.lastProductSales()
            return {totalSales, topProduct, lastProductSales}
        } catch (error) {
            return error
        }
    },
    totalSales: async function(){
        try {
            const [results, metadata] = await db.sequelize.query('select sum(cantidad) as quantity, sum(cantidad*precio) as totalAmount from payment_products;',
                {logging: false});
            return results[0]
        } catch (error) {
            return error
        }
    },
    topProductSales: async function(){
        try {
            const response = await db.payment_products.findAll({
                include: {
                    association: 'product',
                    attributes: {exclude: ['category_id', 'description']},
                    include: [
                        {
                            association: 'categories',
                            attributes: ['id','name'],
                        }
                    ]
                },
                attributes: [
                    'product_id',
                    [Sequelize.fn('sum',Sequelize.col('cantidad')), 'cantidadVendida'],
                ],
                group: ['product_id'],
                order: [['cantidadVendida', 'DESC']],
                limit: 5,
                logging: false,
            })
            return response
        } catch (error) {
            return error
        }
    },
    lastProductSales: async function () {
        try {
            const [results, metadata] = await db.sequelize.query(`select pr.id as product_id, pr.name as name,pr.category_id as category_id, pp.color_id as color_id, pp.precio as price, pp.cantidad as cantidad, pp.payment_id as payment_id,p.created_at as created_at
                from payment_products pp 
                left join payments p on p.id = pp.payment_id 
                inner join products pr on pr.id = pp.product_id 
                where p.status = 'completado' order by p.created_at desc limit 5;`, {logging: false});
            return results
        } catch (error) {
            
        }
    }
}