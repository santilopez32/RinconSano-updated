window.onload = function(){  

    let form = document.querySelector('#formeditar');
   

    form.addEventListener('submit', async (e) => {
        
        

        let errors = []

        let producto = document.querySelector('#product-editar')
        let descripcion = document.querySelector('#desc-editar')
        let categoria = document.querySelector('#cat-editar')
        let precio = document.querySelector('#precio-editar')
        let descuento = document.querySelector('#descuento-editar')
        let imagen = document.querySelector('#img-editar')
        
        /// VALIDACION NOMBRE producto
        if (producto.value == '' || producto.value.length < 5) {
            errors.push('Debes ingresar un nombre de producto de al menos 5 caracteres.')
            producto.classList.add('is-invalid')
        }
        else{
            producto.classList.add('is-valid')
            producto.classList.remove('is-invalid')
        }
        /// VALIDACION descripcion
        if (descripcion.value == '' || descripcion.value.length < 20) {
            errors.push('No olvides dar una breve descripción de tu producto, por lo menos 20 caracteres.')
            descripcion.classList.add('is-invalid')
        }
        else{
            descripcion.classList.add('is-valid')
            descripcion.classList.remove('is-invalid')
        }
        /// VALIDACION imagen
        if (imagen.value == '' || !allowedExtensions.exec(imagen.value)) {
            errors.push('No olvides ingresar una imagen! (formatos aceptados jpg, jpeg, png y gif')
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