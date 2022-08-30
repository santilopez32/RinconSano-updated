if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}

function ready() {
    
    if(JSON.parse(localStorage.getItem("productosEnCarrito")) == null) {
        let cart = []
        localStorage.setItem("productosEnCarrito", JSON.stringify(cart))
    }
    cartNumber() 
    let button = document.querySelector(".cart-botton") 
    button.addEventListener("click", (e) => { 
                          
        agregarItem()
        Swal.fire(
            'Exito!',
            'Producto agregado al carrito!',
            'success'
        )
    })
}

function cartNumber() {

    let numberItems = document.querySelector(".cartNmb")
    numberItems.innerText = `${JSON.parse(localStorage.getItem("productosEnCarrito")).length}`
}

function agregarItem() {

    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let product = {
        id: document.getElementById("idProd").innerText,
        name: document.getElementById("nameProd").innerText,
        description: document.getElementById("descProd").innerText,
        price: document.querySelector(".product-price").innerText.replace("$",""),
        image: document.getElementById("imgProd").alt
    }

    if (prodsCart.length > 0) { 
        let productInCart = prodsCart.find(prod => prod.id == product.id) 
        if(!productInCart) {

            product.cantidad = 1;
            product.subTotal = product.cantidad * product.price
            prodsCart = [...prodsCart, product]
        }
        else {

            productInCart.cantidad += 1;
            productInCart.subTotal = productInCart.cantidad * product.price
        }
    }
    else { 

        product.cantidad = 1;
        product.subTotal = product.cantidad * product.price
        prodsCart.push(product)
    }

    localStorage.setItem("productosEnCarrito", JSON.stringify(prodsCart)) 
    cartNumber() 
}