const form = document.getElementById('form');
const pjInput = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-cont');
const lblMensaje = document.getElementById('mensaje')
const caja = document.getElementById('caja');
const ts ="1";
const pubkickey = 'b537142c181841a05c3ffff04baf475c';
const hashval="a4023ba1a3737872df6b390786e671de";

// Funcion para renderizar 
const renderPj = results => {
    const {id, name, description, thumbnail} = results;
    return `
    <div class="card-cont">
    <h3>${id}</h3>
    <img src="${thumbnail.path}.jpg" alt="${name}" />
    <h2>${name.toUpperCase()}</h2>
    <span class="exp">EXP: ${description}}</span>
    </div>
`;
};
// Funcion para renderizar las cards
const renderPjList = heroeList => {
    caja.innerHTML =heroeList.map(renderPj);
};

const requestpj = async () => {
    const baseURL = `https://gateway.marvel.com:443/v1/public/characters?`;

    const query = `&ts=${ts}&apikey=${pubkickey}&hash=${hashval}`;

    const response = await fetch(baseURL + query);
    const json = await response.json();

    const results = json.data.results;
    console.log(results);
    //return results;
    renderPjList(results);
};
requestpj()