window.onload = function(){

    let form = document.querySelector('#login-form');

    form.addEventListener('submit', async (e) => {
        let errors = []
    
        let email = document.querySelector('#email')
        let contraseña = document.querySelector('#contraseña')

        if (email.value == '') {
            errors.push('Debes ingresar un e-mail válido!')
            email.classList.add('is-invalid')
        }
        else{
            email.classList.add('is-valid')
            email.classList.remove('is-invalid')
        }
        if (contraseña.value.length <= 8) {
            errors.push('Debes ingresar una contraseña de al menos 9 caracteres!')
            contraseña.classList.add('is-invalid')
        }
        else{
            contraseña.classList.add('is-valid')
            contraseña.classList.remove('is-invalid')
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
                email: e.target.email.value,
                contraseña: e.target.contraseña.value,
                
            }
        }
    })
}