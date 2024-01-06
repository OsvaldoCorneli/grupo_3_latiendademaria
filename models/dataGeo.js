const path = require('path')
const fs = require('fs')

const dataGeoFilePath = path.join(__dirname, '../utils/dataGeo.json');
const dataGeo = JSON.parse(fs.readFileSync(dataGeoFilePath, 'utf-8'));

const dataGeografica = {
    provincias: function() {
        const provincias = dataGeo.map((el) => {return el.provincia})
        return provincias
    },
    localidades: function(provincia) {
        if (!provincia) {
            const response = dataGeo.map((x) => {return {
                provincia: x.provincia,
                localidades: x.localidades.map((l) =>{return l.nombre}).sort((a,b) => a.localeCompare(b))
            }})
            return response.sort((a,b)=> a.provincia.localeCompare(b.provincia))
        } else {
            const localidadesProv = dataGeo.find((e) => e.provincia == provincia)
            const localidades = localidadesProv.localidades.map((loc) => {return loc.nombre})
            return localidades
        }
    }
}

module.exports = dataGeografica
