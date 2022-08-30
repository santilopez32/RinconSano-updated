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
        <div class="contenedorProductos">
                    <div class="productoX">
                        <div class="productoImagen">
                            
                            <figure ><img src="/images/${prodsCart[i].image}" alt="${prodsCart[i].name}" class="productImg"></figure>
                        </div>
                        <div class="productoInformación">
                            <i onClick="borrar(${prodsCart[i].id})" class="fa fa-trash"></i> 
                            <p class="price">${prodsCart[i].price}</p>
                            <p class="price">${prodsCart[i].cantidad}</p>
                            <h4 class="nombreProducto">${prodsCart[i].name}</h4>
                            <h2>Precio final: $ ${prodsCart[i].subTotal}</h2>
                            <button onClick="sumar(${prodsCart[i].id})" >Sumar</button> 
                            <button onClick="restar(${prodsCart[i].id})" >Restar</button> 
                        </div>
                    </div>
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