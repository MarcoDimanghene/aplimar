const form = document.getElementById('form');
const searchInput = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-cont');
const lblMensaje = document.getElementById('mensaje')
const caja = document.getElementById('caja');
const ts ="1";
const pubkickey = 'b537142c181841a05c3ffff04baf475c';
const hashval="a4023ba1a3737872df6b390786e671de";
const prevButton = document.getElementById("prevbtn");
const nextButton = document.getElementById("nextbtn");
const pageIndicator = document.getElementById("page-indicator");
const btnReset = document.getElementById("btnReset")


const perPage = 20;
let currentPage = 0;
const ocultar =()=>{
    pageIndicator.classList.add('hidden')
    prevButton.classList.add('hidden')
    nextButton.classList.add('hidden')
    btnReset.classList.remove("hidden")
    return "hidden"
};
const ver =()=>{
    pageIndicator.classList.remove('hidden')
    prevButton.classList.remove('hidden')
    nextButton.classList.remove('hidden')
    btnReset.classList.add("hidden")
    return "show"
};

// Funcion para renderizar 
const renderPj = results => {
    const { name, description, thumbnail, comics} = results;
    const comicNames = comics.items.map(item => item.name).join(' -|- ');
    return `
    
    <div class="card-cont">
    <div>
        <h2>${name.toUpperCase()}</h2>
    </div>
    <div>
        <img src="${thumbnail.path}.${thumbnail.extension}" alt="${name}" />
    </div class="info">
        <p> COMICS: ${comicNames}</p>
        <p>INFO: ${description}</p>
    </div>
`;
};

// Funcion para renderizar las cards
const renderPjList = heroeList => {
    caja.innerHTML =heroeList.map(renderPj).join("");

    const totalPages = Math.ceil(data.total / perPage);

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;

    pageIndicator.textContent = `Página ${currentPage + 1} de ${totalPages}`;

};

const requestpj = async (offset) => {
    const baseURL = `https://gateway.marvel.com:443/v1/public/characters?`;

    const query = `offset=${offset}&ts=${ts}&apikey=${pubkickey}&hash=${hashval}`;

    const response = await fetch(baseURL + query);
    const json = await response.json();

    const results = json.data.results;
    //const data = json.data;
    data = json.data;
    


    console.log(results);

    renderPjList(results, data);

    console.log(data);
    
};

//busqueda
form.addEventListener('submit', event => {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario

    const searchValue = searchInput.value.trim();
    if (searchValue !== '') {
        // Realizar solicitud de búsqueda
        searchCharacters(searchValue);
        lblMensaje.textContent=""
    }
    else{
        lblMensaje.textContent= "Ingrese un personaje a buscar"
    }
    form.reset()
    
});

const searchCharacters = async searchTerm => {
    const baseURL = `https://gateway.marvel.com:443/v1/public/characters?`;

    const query = `nameStartsWith=${encodeURIComponent(searchTerm)}&ts=${ts}&apikey=${pubkickey}&hash=${hashval}`;

    const response = await fetch(baseURL + query);
    const json = await response.json();

    const results = json.data.results;

    renderPjList(results);
    if (results.length === 0) {
        lblMensaje.textContent = "No se encontró el personaje.";

    } else {
        lblMensaje.textContent = "";
    }
    
    ocultar();
    
};
// Paginas
const gotoPrevius = () => {
    if (currentPage > 0) {
        currentPage--;
        const offset = currentPage * perPage;
    requestpj(offset);
    }
};

const gotoNext = () => {
    currentPage++;
    const offset = currentPage * perPage;
    requestpj(offset);
};

prevButton.addEventListener('click', gotoPrevius);
nextButton.addEventListener('click', gotoNext);

const volver=()=>{
    requestpj(0)
    ver();
    
    lblMensaje.textContent = "";
};
btnReset.addEventListener("click",volver)
const init = () =>{
    if (searchInput.value == "") {requestpj(0);}
    else (requestpj(results))
    
};

init();