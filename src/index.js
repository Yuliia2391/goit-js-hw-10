import { fetchCatByBreed, fetchBreeds } from "./cat-api";
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'
import Notiflix from 'notiflix';
Notiflix.Notify.init({
    position: 'center-center',
    width: '300px',
});

const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
}

refs.select.addEventListener('change', onSelectChange);

function pageLoading() {
    refs.loader.hidden = false;
    
    fetchBreeds()
        
        .then(data => {
            console.log(data);
            refs.select.style.display = 'flex';
            refs.select.insertAdjacentHTML('beforeend', createMarkupSelect(data));
            new SlimSelect({
                select: refs.select,
            });
        })

        .catch(err => {
            console.log(err);
        })

        .finally(() => {
            refs.loader.hidden = true;
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

function onSelectChange(evt) {
    refs.loader.hidden = false;
    refs.error.style.display = 'none';
    refs.catInfo.hidden = false;

    fetchCatByBreed(evt.target.value)
        
        .then(data => {
            console.log(data)
            // refs.catInfo.insertAdjacentHTML('beforeend', createMarkupCat(data));
            const { url } = data[0];
            const { name, description, temperament } = data[0].breeds[0];
            refs.catInfo.innerHTML = `
            <div class="container">
                <img src='${url}' alt='${name}' width=600 height=400/>
                <div class="info-container">
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <p>${temperament}</p>
                </div>
            </div>`
        })

        .catch(err => {
            console.log(err);
            refs.error.style.display = 'flex';
            refs.catInfo.hidden = true;
            Notiflix.Notify.failure('Error');
        })

        .finally(() => {
            refs.loader.hidden = true;
        })
}