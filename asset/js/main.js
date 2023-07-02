const form = document.getElementById('form');
const pjInput = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-cont');
const lblMensaje = document.getElementById('mensaje')
const caja = document.getElementById('caja');
const ts ="1";
const pubkickey = 'b537142c181841a05c3ffff04baf475c';
const hashval="a4023ba1a3737872df6b390786e671de";
const prevButton = document.getElementById("prevbtn");
const nextButton = document.getElementById("nextbtn");
const pageIndicator = document.getElementById("page-indicator");
// https://gateway.marvel.com:443/v1/public/characters?limit=100&offset= VER LIMITE Y OFFSET SON LAS PAGINAS

const perPage = 20;
let currentPage = 0;

// Funcion para renderizar 
const renderPj = results => {
    const {id, name, description, thumbnail, comics} = results;
    const comicNames = comics.items.map(item => item.name).join(', ');
    return `
    <div class="card-cont">
    <h4>${id}</h4>
    <img src="${thumbnail.path}.jpg" alt="${name}" />
    <h2>${name.toUpperCase()}</h2>
    <p>INFO: ${description}}</p>
    <h6> COMICS: ${comicNames}</h6>
    
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

requestpj(0); // Inicializar la solicitud con offset = 0