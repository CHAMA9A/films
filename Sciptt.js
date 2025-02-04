const API_KEY = '874fa709'; 
const BASE_URL = 'https://www.omdbapi.com/';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(query);
    } else {
        alert('Veuillez entrer un titre de film.');
    }
});

async function fetchMovies(query) {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            displayMessage('Aucun résultat trouvé.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
        displayMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
}

function displayMovies(movies) {
    resultsContainer.innerHTML = ''; 
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button onclick="fetchMovieDetails('${movie.imdbID}')">Voir détails</button>
        `;
        resultsContainer.appendChild(card);
    });
}

async function fetchMovieDetails(imdbID) {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
        const movie = await response.json();

        if (movie.Response === 'True') {
            displayMovieDetails(movie);
        } else {
            displayMessage('Impossible de charger les détails du film.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du film:', error);
        displayMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
}

function displayMovieDetails(movie) {
    resultsContainer.innerHTML = `
        <div class="movie-details">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
            <p><strong>Année :</strong> ${movie.Year}</p>
            <p><strong>Genre :</strong> ${movie.Genre}</p>
            <p><strong>Réalisateur :</strong> ${movie.Director}</p>
            <p><strong>Acteurs :</strong> ${movie.Actors}</p>
            <p><strong>Résumé :</strong> ${movie.Plot}</p>
            <p><strong>Langue :</strong> ${movie.Language}</p>
            <p><strong>Pays :</strong> ${movie.Country}</p>
            <p><strong>Récompenses :</strong> ${movie.Awards}</p>
            <button onclick="fetchMovies('${searchInput.value}')">Retour aux résultats</button>
        </div>
    `;
}
