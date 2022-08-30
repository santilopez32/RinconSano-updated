if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}

function ready() { 
    if(JSON.parse(localStorage.getItem("productosEnCarrito")) == null || JSON.parse(localStorage.getItem("productosEnCarrito")).length == 0) {
        updateTotal()
        displayCartEmpty()
    }
    else {
        updateTotal()
        displayCart()
    }
    let btnVaciar = document.getElementById("vaciar") 
    btnVaciar.addEventListener("click", vaciarCarrito) 
}

function displayCartEmpty() { 
    let container = document.getElementById("containerCart")
    container.innerHTML = `
    <div class="col-12">
        <h2 class="products-title">El carrito está vacio</h2>
    </div>
    `
}

function displayCart() {
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let container = document.getElementById("containerCart")
    container.innerHTML = ``
    for (let i=0; i<prodsCart.length; i++) { 
        container.innerHTML += `            
        <div class="col-12 col-sm-6 col-lg-3">	
            <section class="product-box">
                <a href="/product/products/${prodsCart[i].id}">
                    <figure class="product-box_image">
                        <img src="/images/${prodsCart[i].image}" alt="${prodsCart[i].name}">
                    </figure>
                </a>
                <article class="product-box_data">
                    <h2>Precio final: $ ${prodsCart[i].subTotal}</h2>
                    <p>${prodsCart[i].name}</p>
                    <p>${prodsCart[i].price}</p>
                    <p>${prodsCart[i].cantidad}</p>
                    <button onClick="sumar(${prodsCart[i].id})" >Sumar</button> 
                    <button onClick="restar(${prodsCart[i].id})" >Restar</button> 
                    <i onClick="borrar(${prodsCart[i].id})" class="fa fa-trash"></i> 
                </article>
            </section>
        </div>
        `
    }
}

function updateTotal() {
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let cantTotal = document.getElementById("cantTotal")
    let precioTotal = document.getElementById("precioTotal")
    let total = 0
    for (let i=0; i<prodsCart.length; i++) { 
        total += prodsCart[i].subTotal
    }
    cantTotal.value = prodsCart.length
    precioTotal.value = total

}

function vaciarCarrito() {
    localStorage.removeItem("productosEnCarrito")
    location.reload()
}

function borrar(id) {
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let filtrado = prodsCart.filter(row => row.id != id)
    localStorage.setItem("productosEnCarrito", JSON.stringify(filtrado))
    if (filtrado.length <= 0) { 
        updateTotal()
        displayCartEmpty()
        return
    }
    displayCart()
    updateTotal()
}



function sumar(id) {
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let prod = prodsCart.find(row => row.id == id)
    prod.cantidad +=1
    prod.subTotal = prod.cantidad * prod.price
    localStorage.setItem("productosEnCarrito", JSON.stringify(prodsCart))
    displayCart()
    updateTotal()
}

function restar(id){
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let prod = prodsCart.find(row => row.id == id)
    prod.cantidad -=1
    prod.subTotal = prod.cantidad * prod.price
    if(prod.cantidad <= 0) {
        borrar(id)
        return
    }
    localStorage.setItem("productosEnCarrito", JSON.stringify(prodsCart))
    displayCart()
    updateTotal()
}