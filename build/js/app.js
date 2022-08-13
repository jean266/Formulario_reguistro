document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

function iniciarApp() {
    validacionFormulario();
    focusCampo();
}

function validacionFormulario() {
    const btnSubmit = document.querySelector('#submit');

    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        validacion();
        validacionEmail();
    });
}


function validacion() {
    const inputs = document.querySelectorAll('.campo');

    const alertasPrevias = document.querySelectorAll('.alerta');

    if (alertasPrevias) {
        alertasPrevias.forEach(alertaPrevia => {
            alertaPrevia.remove();
        });
    }

    inputs.forEach(input => {

        if (!input.firstElementChild.value) {
            if (!input.firstElementChild.hasAttribute('data-input')) {
                const alerta = document.createElement('DIV');
                const placeholder = input.firstElementChild.placeholder;

                limpiarAlertas(input, alerta);

                alerta.classList.add('alerta');
                alerta.textContent = `${placeholder} cannot be empty`;
                input.parentElement.appendChild(alerta);
                input.classList.add('error');
            }
        }
    });
}

// valida que el email sea valido
function validacionEmail() {
    const inputEmail = document.querySelector('[data-input="email"]');
    const input = inputEmail.parentElement;
    const emialExpresion = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


    if (!emialExpresion.test(inputEmail.value)) {
        const alerta = document.createElement('DIV');

        limpiarAlertas(input, alerta);

        alerta.classList.add('alerta');
        alerta.innerHTML = 'Look likes this is not an email';
        input.parentElement.append(alerta);
        input.classList.add('error');
    }

}

function focusCampo() {
    const inputs = document.querySelectorAll('.campo');

    inputs.forEach(input => {
        input.firstElementChild.addEventListener('click', () => {

            const focusPrevio = document.querySelector('.focus');
            if (focusPrevio) {
                focusPrevio.classList.remove('focus');
            }
            if (!input.classList.contains('error')) {
                input.classList.add('focus');
            }
        });
    });
}

function limpiarAlertas(input, alerta) {
    if (input.classList.contains('focus')) {
        input.classList.remove('focus');
    }

    input.firstElementChild.addEventListener('input', () => {
        input.classList.remove('error');
        input.classList.add('focus');
        alerta.remove();
    });
}