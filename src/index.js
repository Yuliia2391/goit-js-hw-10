import { fetchCatByBreed, fetchBreeds } from "./cat-api";
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'
import Notiflix from 'notiflix';
Notiflix.Notify.init({
    position: 'center-center',
    width: '300px',
});

const refs = {
    select: document.querySelector('select.breed-select'),
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
            refs.select.style.display = 'none';
            refs.error.style.display = 'flex';
            Notiflix.Notify.failure('Error');
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
            refs.catInfo.style.display = 'none';
            refs.error.style.display = 'flex';
            Notiflix.Notify.failure('Error');
        })

        .finally(() => {
            refs.loader.hidden = true;
        })
}

// function createMarkupCat(catsArr) {
//     console.log(catsArr);
//     return catsArr.map(({ url, breeds: { name, description, temperament }}) => `
//     <image src='${url}' alt='${name}' width=400/>
//     <h2>${name}</h2>
//     <p>${description}</p>
//     <p>${temperament}</p>
//     `)
//         .join('');
// };