let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let resultCountriesEl = document.getElementById("resultCountries");

let searchInputVal = '';
let countriesList = [];

function createAndAppendCountry(country) {
    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryEl);

    let countryFlagEl = document.createElement("img");
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add("...", "country-flag", "mt-auto", "mb-auto");
    countryEl.appendChild(countryFlagEl);

    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("ml-4", "d-flex", "flex-column");
    countryEl.appendChild(countryInfoEl);

    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryInfoEl.appendChild(countryNameEl);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.textContent = country.population;
    countryPopulationEl.classList.add("country-population");
    countryInfoEl.appendChild(countryPopulationEl);
}

function displaySearchResults() {
    resultCountriesEl.textContent = '';
    for (let each of countriesList) {
        if (each.name.toLowerCase().includes(searchInputVal.toLowerCase())) {
            createAndAppendCountry(each);
        }
    }
}

function getCountries() {
    spinnerEl.classList.remove("d-none");
    fetch("https://apis.ccbp.in/countries-data")
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            countriesList = jsonData;
            displaySearchResults();
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
            spinnerEl.classList.add("d-none");
        });
}

getCountries();

searchInputEl.addEventListener('keyup', function(event) {
    searchInputVal = event.target.value;
    displaySearchResults();
});