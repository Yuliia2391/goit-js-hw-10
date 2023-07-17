import { fetchCatByBreed, fetchBreeds } from "./cat-api";
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'
import Notiflix from 'notiflix';

const refs = {
    select: document.querySelector('select.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
}

refs.error.style.display = 'none';
refs.catInfo.style.display = 'none';
refs.select.addEventListener('change', onSelectChange);

function pageLoading() {
    fetchBreeds()
        .then(data => {
            console.log(data);
            refs.select.insertAdjacentHTML('beforeend', createMarkupSelect(data));
            new SlimSelect({
                select: refs.select,
                settings: {
                    allowDeselect: true,
                },
            });
        })
        .catch(err => {
            console.log(err);
            Notiflix.Notify.failure();
        });
}

pageLoading();

function createMarkupSelect(namesArr) {
    return namesArr.map(({ id, name }) => `
    <option value="${id}">
    ${name}
    </option>
    `)
        .join('');
};

function onSelectChange() {
    // refs.loader.start();
    fetchCatByBreed()
        .then(data => {
            console.log(data)
            refs.catInfo.insertAdjacentHTML('beforeend', createMarkupCat(data));
        })
        .catch(err => {
            console.log(err);
            Notiflix.Notify.failure();
        })
        // .finally(() => refs.loader.stop());
}

onSelectChange();

function createMarkupCat(catsArr) {
    return catsArr.map(({ image: {url, width, height}, name, description, temperament }) => `
    <image src='${url}' alt='${name}' ${width} ${height}/>
    <h2>${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>
    `)
        .join('');
};