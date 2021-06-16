import { gebid } from './utils.js';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = '105eb79aa1e6df60a2b95878ad2289aa';
const IDIOMA = 'es-ES';
const BASE_URL_IMAGEN = 'https://image.tmdb.org/t/p/w500';


const formulario = gebid('formBusqueda');
const inputBusqueda = gebid('inputBusqueda');


const getPeliculas = async(pelicula) => {
    const endpoint = `${BASE_URL}?&api_key=${API_KEY}&language=${IDIOMA}&query=${pelicula}&include_adult=false`
    const response = await fetch(endpoint);
    const rpta = await response.json();
    return rpta;
};

formulario.onsubmit = (e) => {
    e.preventDefault();
    const inputPelicula = inputBusqueda.value;
    getPeliculas(inputPelicula).then((rpta) => {
        dibujarPeliculas(rpta.results)
    });
    //console.log(e.data);
};

const dibujarPeliculas = (peliculas) => {
    peliculas.forEach((pelicula) => {
        let col = document.createElement('div');
        col.classList.add('col-md-3', 'mb-3', 'mt-3');

        let card = document.createElement('div');
        card.classList.add('card', 'shadow', 'h-100');

        card.innerHTML = `<img
                      src="${BASE_URL_IMAGEN}${pelicula.poster_path}"
                      alt=""
                      class="card-img-top"
                    />
                    <div class="card-body">
                      <h4 class="card-title">${pelicula.original_title}</h4>
                      <p class="card-text">
                        ${pelicula.overview.substr(0, 90)}...
                        <p class="card-text">
                        <small class="text-light">Fecha de Estreno: ${pelicula.release_date}</small>
                      </p>
                    </div>`;

        col.append(card);
        contenedor.append(col);
    });
};