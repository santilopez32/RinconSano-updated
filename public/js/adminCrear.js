window.onload = function(){  

    let form = document.querySelector('#formcrear');
   

    form.addEventListener('submit', async (e) => {
        
        

        let errors = []

        let producto = document.querySelector('#product-crear')
        let descripcion = document.querySelector('#desc-crear')
        let imagen = document.querySelector('#img-crear')
        let categoria = document.querySelector('#cat-crear')
        let precio = document.querySelector('#precio-crear')
        let descuento = document.querySelector('#descuento-crear')
        
        /// VALIDACION NOMBRE producto
        if (producto.value == '') {
            errors.push('Debes ingresar un nombre de producto.')
            producto.classList.add('is-invalid')
        }
        else{
            producto.classList.add('is-valid')
            producto.classList.remove('is-invalid')
        }
        /// VALIDACION descripcion
        if (descripcion.value == '') {
            errors.push('No olvides dar una breve descripción de tu producto.')
            descripcion.classList.add('is-invalid')
        }
        else{
            descripcion.classList.add('is-valid')
            descripcion.classList.remove('is-invalid')
        }
        /// VALIDACION imagen
        if (imagen.value == '') {
            errors.push('No olvides ingresar una imagen!')
            imagen.classList.add('is-invalid')
        }
        else{
            imagen.classList.add('is-valid')
            imagen.classList.remove('is-invalid')
        }
        /// VALIDACION categoria
        if (categoria.value == '' ) {
            errors.push('Recuerda seleccionar una categoría.')
            categoria.classList.add('is-invalid')
        }
        else{
            categoria.classList.add('is-valid')
            categoria.classList.remove('is-invalid')
        }
        /// VALIDACION precio
        if (precio.value == '') {
            errors.push('Ingresa un precio para tu producto.')
            precio.classList.add('is-invalid')
        }
        else{
            precio.classList.add('is-valid')
            precio.classList.remove('is-invalid')
        }
        /// VALIDACION descuento
        if (descuento.value == '') {
            errors.push('No olvides ingresar que descuento tiene el producto.')
            descuento.classList.add('is-invalid')
        }
        else{
            descuento.classList.add('is-valid')
            descuento.classList.remove('is-invalid')
        }
        
        let ulErrors = document.querySelector('.errores-admin');
        ulErrors.classList.add('alert-warning')
        ulErrors.innerHTML = '';
        if (errors.length > 0) {
            e.preventDefault()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Revise los errores!',
            })
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li > ${errors[i]} </li>`
            }
        }
        else {
            
            const body = {
                producto: e.target.producto.value,
                descripcion: e.target.descripcion.value,
                imagen: e.target.imagen.value,
                categoria: e.target.categoria.value,
                precio: e.target.precio.value,
                descuento: e.target.descuento.value,
            }

        }
    })
}