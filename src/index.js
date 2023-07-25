import axios from "axios";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from  "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PixabayService from "./pixabay-api";

const form = document.querySelector(`.search-form`);
const input = document.querySelector(`input`);
const button = document.querySelector(`button`);
const div = document.querySelector(`.gallery`);
const btnLoadMore = document.querySelector(`.load-more`);

const pixabayApi = new PixabayService();

let lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
});

form.addEventListener(`submit`, onSearch);
btnLoadMore.addEventListener(`click`, onLoadMore);


async function onSearch(e) {
    e.preventDefault();
    // console.log(`submit`);
    // const searchQuery = e.currentTarget.elements.searchQuery.value;
    // console.log(searchQuery);
    pixabayApi.searchQuery = e.currentTarget.elements.searchQuery.value;
    const img = await pixabayApi.fetchArticles();
    // const img = await getImages(searchQuery);
    console.log(img);
    const images = img.hits;
    console.log(images);
try {
    if (images.length === 0) {
        Notify.info('Sorry, there are no images matching your search query. Please try again.');
    }
    console.log(images);
    div.innerHTML = createMarkup(images);
    lightbox.refresh();
}
    catch { Report.failure('Sorry!Something went wrong', '', 'Okay',); }
    finally { form.reset(); }


    
};

// async function getImages(searchQuery,page) {
//     // console.log(`func`);
//     const url = `https://pixabay.com/api/`
//     const options = {
//         params: {
//             key: `38416277-2f3b74029dfd524974848f805`,
//             q: searchQuery,
//             image_type: `photo`,
//             orientation: `horizontal`,
//             safesearch: `true`,
//             per_page: 40,
//         }
//     };
//     const {data} = await axios.get(url,options);
//         return data;  
//     };

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

async function onLoadMore() {
pixabayApi.incrementPage();
    const img = await pixabayApi.fetchArticles();
    const images = img.hits;
    console.log(images);
    div.innerHTML += createMarkup(images);
    lightbox.refresh();
}






