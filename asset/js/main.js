const form = document.getElementById('form');
const pjInput = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-container');
const lblMensaje = document.getElementById('mensaje')

// Array de personajes
let personajes = JSON.parse(localStorage.getItem('personajes')) || [];

// local storage
const saveLocalStorage = heroeList => {
    localStorage.setItem('personajes',JSON.stringify(heroeList));
}
// Funcion para renderizar HTML
// Funcion para la logica de renderiza

// Funcion para buscar pj
const searchPj = async e =>{
    e.preventDefault();
    const searchPj = pjInput.value.trim();
    //console.log(searchPj)
    if (searchPj === ''){
        lblMensaje.textContent = 'Se debe ingresar un personaje';
        return;
    };

// Vamos a pasarle el valor del input a la funcion requesthero
    const fetchedPj = await requestpj(searchPj);
    
//   Alerta por si no existe ninguna ciudad con ese id
    
};
// Funcion para eliminar una pj

// Funcion General para llamar todo
const init = () =>{
    
    lblMensaje.textContent =""
    form.addEventListener('submit', searchPj);
};

init();