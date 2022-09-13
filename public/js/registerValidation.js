window.onload = function(){
    /*let titulo = document.querySelector('.moviesAddTitulo')
    let formulario = document.querySelector('#formulario');
    let article = document.querySelector('article');
    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');*/

//------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
//-------------------DE REGISTRO DE PELÍCULAS------------------//    

    let form = document.querySelector('#formulario');
   

    form.addEventListener('submit', async (e) => {
        
        

        let errors = []

        const expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

        let nya = document.querySelector('#nya')
        let nombre = document.querySelector('#nombre')
        let email = document.querySelector('#email')
        let tel = document.querySelector('#tel')
        let birth_date = document.querySelector('#birth_date')
        let domicilio = document.querySelector('#domicilio')
        let pass = document.querySelector('#pass')
        let pass_confirm = document.querySelector('#pass_confirm')
        let avatar = document.querySelector('#avatar')
        let provincias = document.querySelector('#provincias')
        
        /// VALIDACION NOMBRE y apellido
        if (nya.value == '' || nya.value.length < 2) {
            errors.push('El campo nombre debe tener más de 2 caracteres!')
            nya.classList.add('is-invalid')
        }
        else{
            nya.classList.add('is-valid')
            nya.classList.remove('is-invalid')
        }
        /// VALIDACION NOMBRE
        if (nombre.value == '' || nombre.value.length < 2) {
            errors.push('El campo nombre debe tener más de 2 caracteres!')
            nombre.classList.add('is-invalid')
        }
        else{
            nombre.classList.add('is-valid')
            nombre.classList.remove('is-invalid')
        }
        /// VALIDACION EMAIL
        if (email.value == '' || expReg.test(email.value) == false ) {
            errors.push('Debes ingresar un e-mail válido!')
            email.classList.add('is-invalid')
        }
        else{
            email.classList.add('is-valid')
            email.classList.remove('is-invalid')
        }
        /// VALIDACION TELEFONO
        if (tel.value == '' ) {
            errors.push('Debes ingresar tu teléfono!')
            tel.classList.add('is-invalid')
        }
        else{
            tel.classList.add('is-valid')
            tel.classList.remove('is-invalid')
        }
        /// VALIDACION birth_date
        if (birth_date.value == '') {
            errors.push('Debes ingresar tu cumpleaños!')
            birth_date.classList.add('is-invalid')
        }
        else{
            birth_date.classList.add('is-valid')
            birth_date.classList.remove('is-invalid')
        }
        /// VALIDACION domicilio
        if (domicilio.value == '') {
            errors.push('Debes ingresar tu domicilio!')
            domicilio.classList.add('is-invalid')
        }
        else{
            domicilio.classList.add('is-valid')
            domicilio.classList.remove('is-invalid')
        }
        /// VALIDACION pass
        if (pass.value.length <= 8) {
            errors.push('Debes ingresar una contraseña de al menos 9 caracteres!')
            pass.classList.add('is-invalid')
        }
        else{
            pass.classList.add('is-valid')
            pass.classList.remove('is-invalid')
        }
        if (pass_confirm.value.length <= 8) {
            errors.push('Debes ingresar una contraseña de al menos 9 caracteres!')
            pass_confirm.classList.add('is-invalid')
        }
        else{
            pass_confirm.classList.add('is-valid')
            pass_confirm.classList.remove('is-invalid')
        }
        if (avatar.value == "" || !allowedExtensions.exec(avatar.value) ) {
            errors.push('Debes ingresar una imagen en formatos jpg, jpeg, png o gif')
            avatar.classList.add('is-invalid')
        }
        else{
            avatar.classList.add('is-valid')
            avatar.classList.remove('is-invalid')
        }
        if (provincias.value == "") {
            errors.push('Debes elegir tu provincia')
            provincias.classList.add('is-invalid')
        }
        else{
            provincias.classList.add('is-valid')
            provincias.classList.remove('is-invalid')
        }
        let ulErrors = document.querySelector('.errores');
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
                nya: e.target.nya.value,
                nombre: e.target.nombre.value,
                email: e.target.email.value,
                tel: e.target.tel.value,
                birth_date: e.target.birth_date.value,
                domicilio: e.target.domicilio.value,
                pass: e.target.pass.value,
                pass_confirm: e.target.pass_confirm.value,
                avatar: e.target.avatar.value,
                provincias: e.target.provincias.value
            }
            /*/// EJEMPLO DE POST/PUT/PATCH/DELETE
            const fetchResponse = await fetch("/api/movies/create", {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            let res = await fetchResponse.json()
            /* EJEMPLO DE GET
            const fetchGet = await fetch("ENDPOINT", {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            let resGet = await fetchGet.json()
          
            
            if (res.meta.status == 200) {
                ulErrors.innerHTML = '';
                Swal.fire(
                    'Muy bien!',
                    'Cargaste la pelicula!',
                    'success'
                )
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al crear la peli!',
                })
            }  */

        }
    })
}