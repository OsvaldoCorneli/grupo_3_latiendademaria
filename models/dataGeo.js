const path = require('path')
const fs = require('fs')

const dataGeoFilePath = path.join(__dirname, '../utils/dataGeo.json');
const dataGeo = JSON.parse(fs.readFileSync(dataGeoFilePath, 'utf-8'));

const provincias = {
    all: function() {
        const provincias = dataGeo.map((el) => {return el.provincia})
        return provincias
    },
    localidades: function(provincia) {
        const localidadesProv = dataGeo.find((e) => e.provincia == provincia)
        const localidades = localidadesProv.localidades.map((loc) => {return loc.nombre})
        return localidades
    }
}

module.exports = provincias
