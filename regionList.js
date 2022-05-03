class RegionList extends HTMLElement 
{
  constructor(){
    super()

    /**
     * Creazione shadowDOM
     * Lo shadow DOM permette di avere separazione tra l'html 
     * del componente ed il resto del documento
     */
    this.attachShadow({ mode: 'open'})
  }

  get template() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        ul {
          border: 0px solid black;
          margin: 0px;
          padding: 0px;
        }

        li {
          list-style-type: none;
          border: 1px solid black;
          padding: 4px;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-radius: 7px;
          margin-bottom: 2px;
          flex-direction: column;
        }
        
        li:hover {
          transition: 0.5s;
          border: 1px rgba(148, 148, 148, 0.63) solid;
          cursor: pointer;
          background-color:rgba(226, 226, 226, 0.192);
        }

        span {
          flex-grow: 1;
        }
      </style>
      
      <ul></ul>`

    return template
  }

  async addRegionToDom(regionName, regionProvinces) {
    let ul = this.shadowRoot.querySelector('ul')
    const regionRow = document.createElement('li')
    regionRow.setAttribute('class', 'flex')

    regionRow.onclick = (e) => {
      e.preventDefault()
    }

    const rowContent = document.createElement('span')
    rowContent.innerText = regionName

    regionRow.appendChild(rowContent)
    ul.appendChild(regionRow)

    let provinceDomElement = await this.initAndAddProvinceElement(regionRow)
    provinceDomElement.render(regionProvinces)
  }

  initAndAddProvinceElement(regionRow) {
    const provinceUl = document.createElement('province-list')
    regionRow.appendChild(provinceUl)
    return provinceUl.isConnectedPromise()
  }

  /**
   * Callbacks 
   */
  connectedCallback() {
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
  }
  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}

  render(regions) {
    for(let regionName in regions) {
      this.addRegionToDom(regionName, regions[regionName])
    }
  }
}