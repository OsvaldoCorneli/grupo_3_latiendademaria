const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const {Op, Sequelize} = require('sequelize');

const pagosPath = path.join(__dirname+'/../data/payments.json')
const pagosJson = JSON.parse(fs.readFileSync(pagosPath, 'utf-8'))

module.exports = {
    all: async function(query) {
        try {
            let {user,desde,hasta,estado} = query
            let condition = {}
            if (user) condition.user_id = user;
            if (desde && hasta) condition.created_at = {[Op.between]: [new Date(desde), new Date(hasta)]};
            if (estado) condition.status = estado;

            const response = await db.Payments.findAll({
                where: condition,
                attributes: {exclude: ['user_id']},
                logging: false,
                raw: true  
            })
            let grafico = await this.graficoVentas(desde,hasta,estado);
            let topUser = await this.topUser(desde,hasta,estado);
            if (response.length > 0) {
                return {grafico, data: response, topUser}
            }
            else {
                throw Error
            }
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
                    if (i == dates.length-1) return sales
                    else continue
                }
                sales.push(results[0])
                if (i == dates.length-1) return sales
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
    }
}