import axios from "axios";
axios.defaults.headers.common['x-api-key'] = 'live_lLX8MZWB2hXBbfdkn6vd3qn2drURJsjOTmpOEsIEuSiAUUBNzbpY9pnQkpcFXtC7';

export function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error(resp.status);
            }

            return resp.data;
        });
}

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error(resp.status);
            }

            return resp.data;
        });
}