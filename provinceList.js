class ProvinceList extends HTMLElement 
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
          flex-grow: 1;
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
        }
        
        li:hover {
          transition: 0.5s;
          border: 1px rgba(148, 148, 148, 0.63) solid;
          cursor: pointer;
          background-color:rgba(226, 226, 226, 0.192);
        }
      </style>
      
      <ul></ul>`

    return template
  }

  addProvinceToDom(provinceName) {
    let ul = this.shadowRoot.querySelector('ul')

    const provinceRow = document.createElement('li')
    provinceRow.onclick = (e) => {
      e.preventDefault()
    }

    const rowContent = document.createElement('span')
    rowContent.innerText = provinceName

    provinceRow.appendChild(rowContent)
    ul.appendChild(provinceRow)
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

  isConnectedPromise() {
    return new Promise((resolve, reject) => {
      let timer = setInterval(() => {
        if(this.isConnected) {
          clearTimeout(timer)
          resolve(this)
        }
      }, 200)
    })
  }

  render(provinces) {
    for(let index in provinces) {
      this.addProvinceToDom(provinces[index].prov_nome)
    }
  }
}