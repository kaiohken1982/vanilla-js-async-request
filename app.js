class App 
{
    #regionList

    constructor() {
        this.registerCustomElements()
    }

    registerCustomElements() {
        window.customElements.define('region-list', RegionList)
        window.customElements.define('province-list', ProvinceList)
    }

    readRegioni() {
        return fetch('http://localhost:8000/regioni.php', {
            method: 'POST'
        }).then(res => {
            return res.json()
        })
    }

    readProvince() {
        return fetch('http://localhost:8000/province.php', {
            method: 'POST'
        }).then(res => {
            return res.json()
        })
    }

    bindData(regioni, province) {
        return regioni.reduce((reducer, regione) => {
            
            reducer[regione.prov_regione] = province.reduce((reducerProvince, provincia, index) => {
                if(provincia.prov_reg == regione.prov_regione) {
                    // Ottimizzazione: rimuoviamo l'elemento dalle province
                    province.splice(index, 1)
                    reducerProvince.push(provincia)
                }
                
                return reducerProvince
            }, [])

            return reducer
        }, [])
    }

    async bootstrap() {
        console.log('Bootstrapped!')
        
        try {
            const regioni = await this.readRegioni()
            // console.log(regioni)
            const province = await this.readProvince()
            // console.log(province)
            const data = this.bindData(regioni, province)
            // console.log(data)
            const regionList = document.getElementsByTagName('region-list')[0]
            regionList.render(data)
        } catch (err) {
            console.log('Error: ' + err.message);
        }
    }
}


let app = new App();
app.bootstrap();