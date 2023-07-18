import axios from "axios";

export function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
        .then(resp => {
            return resp.data;
        });
}

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_lLX8MZWB2hXBbfdkn6vd3qn2drURJsjOTmpOEsIEuSiAUUBNzbpY9pnQkpcFXtC7`)
        .then(resp => {
            return resp.data;
        });
}