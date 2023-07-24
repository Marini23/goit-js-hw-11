import axios from "axios";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(`.search-form`);
const input = document.querySelector(`input`);
const button = document.querySelector(`button`);
const div = document.querySelector(`.gallery`);


form.addEventListener(`submit`, onSearch);

async function onSearch(e) {
    e.preventDefault();
    // console.log(`submit`);
    const form = e.currentTarget;
    const searchQuery = form.elements.searchQuery.value;
    // console.log(searchQuery);
    const img = await getImages(searchQuery);
    console.log(img);
    const images = img.hits;
    console.log(images);
    div.innerHTML = createMarkup(images);
    // createMarkup(searchQuery);
};

async function getImages(searchQuery) {
    // console.log(`func`);
    const {data} = await axios.get(`https://pixabay.com/api/`,
        {
            params: {
                key: `38416277-2f3b74029dfd524974848f805`,
                q: searchQuery,
                image_type: `photo`,
                orientation: `horizontal`,
                safesearch: `true`,
            }
        });
    return data;
};

function createMarkup(images) {
return images
    .map(
    ({
        tags,
        webformatURL,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
    }) => {
        return  `
<a href='${largeImageURL}' class="card-link js-card-link">
<div class="photo-card">
<img src="${webformatURL}" alt="${tags}" loading="lazy" />
<div class="info">
    <p class="info-item">
    <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
    <b>Views</b> ${views}
    </p>
    <p class="info-item">
    <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
    <b>Downloads</b> ${downloads}
    </p>
</div>
</div>
</a>`;
}).join('');
}




// const markup = `
/* <a href='${largeImageURL}' class="card-link js-card-link"></a> */
// <div class="photo-card">
// <img src="${webformatURL}" alt="${tags}" loading="lazy" />
// <div class="info">
//     <p class="info-item">
//     <b>Likes</b> ${likes}
//     </p>
//     <p class="info-item">
//     <b>Views</b> ${views}
//     </p>
//     <p class="info-item">
//     <b>Comments</b> ${comments}
//     </p>
//     <p class="info-item">
//     <b>Downloads</b> ${downloads}
//     </p>
// </div>
// </div>
// `




