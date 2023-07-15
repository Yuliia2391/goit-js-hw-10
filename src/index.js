import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select'

new SlimSelect({
    select: '#single'
})

const refs = {
    selectForm: document.querySelector('select.breed-select'),
    catInfo: document.querySelector('.cat-info'),
}

refs.selectForm.addEventListener('click', onClickSelectForm);
refs.catInfo.addEventListener('click', onClickCatInfo);

function onClickSelectForm() {
    fetchBreeds()
        .then(data => {
            console.log(data)
            refs.selectForm.insertAdjacentHTML('beforeend', createMarkupName(data));
        })
        .catch(err => console.log(err));
}

let catsNameArr = [];

function createMarkupName(catsNameArr) {
    return catsNameArr.map(({ id, name }) => `
    <option value="${id}">
    ${name}
    </option>
    `)
        .join('');
};

function onClickCatInfo() {
    fetchCatByBreed()
    .then(data => {
        console.log(data)
        refs.catInfo.insertAdjacentHTML('beforeend', createMarkupDescr(data));
        })
        .catch(err => console.log(err));
}

let catsInfoArr = [];

function createMarkupDescr(catsInfoArr) {
    return catsInfoArr.map(({name, description, temperament}) => `
    <h1>${name}</h1>
    <p>${description}</p>
    <p>${temperament}</p>
    `)
        .join('');
};