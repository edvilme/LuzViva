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
        this.cart.push(product)
        this.showCart()
    }
    showCart(){
        document.querySelector('#cart-cont').innerHTML = `<h1>Carrito</h1>`
        this.cart.forEach(product=>{
            document.querySelector('#cart-cont').append(product.renderCartRow())
        })

        let total = this.cart.map(l=>parseFloat(l._options.price.replace('$', ''))).reduce((a,b)=>a+b, 0)
        let additionalCharges = {
            'Envío': 10,
            'IVA': 10
        }

        let extraCharges = document.createElement('div');
        extraCharges.className = 'product_row';

        let extraCharges_details = document.createElement('div');
        extraCharges_details.setAttribute('name', 'details')
        extraCharges_details.innerHTML = Object.keys(additionalCharges).join(' + ');

        let extraCharges_price = document.createElement('div');
        extraCharges_price.setAttribute('name', 'price');
        extraCharges_price.innerHTML = "$"+Object.values(additionalCharges).reduce((a, b)=>a+b, 0)

        extraCharges.append(extraCharges_details, extraCharges_price)
        document.querySelector('#cart-cont').append(extraCharges)


        let total_cont = document.createElement('div');
        total_cont.className = 'total';
        
        let total_title = document.createElement('h2');
        total_title.innerHTML = 'Total a pagar'
        total_title.setAttribute('name', 'title')

        let total_value = document.createElement('span');
        total_value.setAttribute('name', 'total')
        total_value.innerHTML = `$${total + Object.values(additionalCharges).reduce((a, b)=>a+b, 0)}`
        total_cont.append(total_title, total_value);

        document.querySelector('#cart-cont').append(total_cont)
        
        let hr = document.createElement('hr')
        document.querySelector('#cart-cont').append(hr)

        let form = document.createElement('form')
        form.id = 'checkout'
        form.innerHTML = `
            <h2>Datos de envío</h2>
            <div>
                <legend>Nombre</legend>
                <input name="checkout_name">
            </div>

            <div>
                <legend>Apellido(s)</legend>
                <input name="checkout_lastname">
            </div>

            <div>
                <legend>Teléfono</legend>
                <input name="checkout_phone" type="phone">
            </div>

            
            <div>
                <legend>Correo electrónico</legend>
                <input name="checkout_email" type="email">
            </div>
        `
        document.querySelector('#cart-cont').append(form)


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

    renderPage(inCart=false){
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

        details.append(close_btn, name, description, additional, price)


        if(!inCart){            
            let addToCart = document.createElement('button')
            addToCart.setAttribute('name', 'cart-status');
            addToCart.className = 'add'

            addToCart.innerHTML = 'AÑADIR AL CARRITO'

            addToCart.addEventListener('click', ()=>{
                __Store.addToCart(this)
                __Store.showCart() 
                page.remove()
            })
            details.append(addToCart)
        } else if(!!inCart){
            let removeFromCart = document.createElement('button')
            removeFromCart.setAttribute('name', 'cart-status');
            removeFromCart.className = 'remove'
            removeFromCart.innerHTML = 'ELIMINAR DEL CARRITO'
            details.append(removeFromCart)
        }

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


        let details_details = document.createElement('details');
        details_details.setAttribute('name', 'additional-details');

        let details_details_summary = document.createElement('summary');
        details_details_summary.innerHTML = "Detalles"

        details_details.append(details_details_summary)
        for (const key in this._options.details) {
            let detail = document.createElement('p');
            detail.innerHTML = `<strong>${key} :</strong> ${this._options.details[key]}`
            details_details.append(detail)
        }


        details.append(details_name, details_details)

        let price = document.createElement('div');
        price.setAttribute('name', 'price');
        price.textContent = this._options.price

        row.append(picture, details, price)

        row.addEventListener('click', ()=>{
            //this.renderPage(true)
        })

        return row
    }

}