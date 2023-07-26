import axios from "axios";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from  "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PixabayService from "./pixabay-api";
import createMarkup from "./markup";

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

btnLoadMore.style.visibility = `hidden`;

async function onSearch(e) {
    e.preventDefault();
    // console.log(`submit`);
    // const searchQuery = e.currentTarget.elements.searchQuery.value;
    // console.log(searchQuery);
    pixabayApi.searchQuery = e.currentTarget.elements.searchQuery.value;
    pixabayApi.resetPage();
    const img = await pixabayApi.fetchArticles();
    const images = img.hits;
    // console.log(images);
try {
    if (images.length === 0) {
        form.reset();
        div.innerHTML = '';
        btnLoadMore.style.visibility = `hidden`;
        Notify.info('Sorry, there are no images matching your search query. Please try again.'
        );
        return;
    }
    // console.log(images);
    div.innerHTML = createMarkup(images);
    lightbox.refresh();
    btnLoadMore.style.visibility = `visible`;
}
    catch { Report.failure('Sorry!Something went wrong', '', 'Okay',); }
finally {
    form.reset(); 
}   
};

async function onLoadMore() {
btnLoadMore.style.visibility = `hidden`;
pixabayApi.incrementPage();
const img = await pixabayApi.fetchArticles();
const images = img.hits;
const totalHits = img.totalHits;
        console.log(totalHits);
        const totalImages = pixabayApi.hasMorePhotos();
        console.log(totalImages);
    if (totalHits / totalImages < 1) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    btnLoadMore.style.visibility = `hidden`;
    return;
    }

    try {
    div.innerHTML += createMarkup(images);
        lightbox.refresh();
        btnLoadMore.style.visibility = `visible`;
    }
    catch {
        Report.failure('Sorry!Something went wrong', '', 'Okay',);
    }
    
}






