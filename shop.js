let __Store;
class Store{
    constructor(options){
        __Store = this;
        this.products = []

        this.cart = []

    }
    addProduct(product){
        this.products.push(product)
    }
    showProducts(){
        this.products.forEach(product=>{
            document.querySelector('#store-cont').append(product.renderCard())
        })
    }

    addToCart(product){
        alert('Se añadio')
        this.cart.push(product)
        this.showCart()
    }
    showCart(){
        document.querySelector('#cart-cont').innerHTML = `<h1>Carrito</h1>`
        this.cart.forEach(product=>{
            document.querySelector('#cart-cont').append(product.renderCartRow())
        })
    }

}


class Product{
    constructor(options){
        this._options = options;
    }
    renderCard(){
        let card = document.createElement('div');
        card.className = 'product_card';
        
        let title = document.createElement('h1');
        title.setAttribute('name', 'name')
        title.innerText = this._options.name;

        let price = document.createElement('span');
        price.setAttribute('name', 'price')
        price.innerText = this._options.price;

        card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 80%, rgba(0, 0, 0, 0.8) 100%), url(${this._options.image})`
        card.append(title, price)
        card.addEventListener('click', ()=>{
            this.renderPage()
        })

        return card

    }

    renderPage(){
        let page = document.createElement('div');
        page.className = 'product_page'

        let image = document.createElement('div')
        image.className = 'product_page_image'
        image.style.backgroundImage = `url(${this._options.image})`

        let details = document.createElement('div');
        details.className = 'product_page_details'


        let close_btn = document.createElement('div');
        close_btn.setAttribute('name', 'btn-close')
        close_btn.addEventListener('click', ()=>{ page.remove() })

        let name = document.createElement('h1');
        name.setAttribute('name', 'name');
        name.innerText = this._options.name

        let description = document.createElement('div');
        description.setAttribute('name', 'description');
        description.innerText = "Lorem Ipsum dolor sit atem esto es un proccto bla bla"

        let additional = document.createElement('div');
        additional.setAttribute('name', 'additional-details');
        for (const key in this._options.details) {
            let detail = document.createElement('div')
            detail.classList = 'detail'
            detail.innerHTML = ` <span name="detail_value">${this._options.details[key]}</span> <span name="detail_key">${key}</span> `
            additional.append(detail)
        }

        let price = document.createElement('h2');
        price.setAttribute('name', 'price');
        price.innerText = this._options.price

        let addToCart = document.createElement('button')
        addToCart.setAttribute('name', 'add-to-cart');
        addToCart.innerHTML = 'AÑADIR AL CARRITO'

        addToCart.addEventListener('click', ()=>{
            __Store.addToCart(this)
            __Store.showCart() 
            page.remove()
        })

        details.append(close_btn, name, description, additional, price, addToCart)

        page.append(image, details)


        //page.append(close_btn, name);
        document.body.append(page)
    }

    renderCartRow(){
        let row = document.createElement('div');
        row.className = 'product_row';

        //row.innerHTML = JSON.stringify(this._options)
        
        let picture = document.createElement('img')
        picture.src = this._options.image;
        picture.setAttribute('name', 'picture')
        
        let details = document.createElement('div');
        details.setAttribute('name', 'details')
        //details.innerHTML = 'Lorem'

        let details_name = document.createElement('h1');
        details_name.setAttribute('name', 'name')
        details_name.textContent = this._options.name

        details.append(details_name)

        let price = document.createElement('div');
        price.setAttribute('name', 'price');
        price.textContent = this._options.price

        row.append(picture, details, price)
        return row
    }

}