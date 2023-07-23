import axios from "axios";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(`.search-form`);
const input = document.querySelector(`input`);
const button = document.querySelector(`button`);
const div = document.querySelector(`.gallery`);


form.addEventListener(`submit`, onSearch);

function onSearch(e) {
    e.preventDefault();
    console.log(`submit`);
    const form = e.currentTarget;
    const searchQuery = form.elements.searchQuery.value;
    console.log(searchQuery);
    getImages(searchQuery);
};

async function getImages(searchQuery) {
    console.log(`func`);
    const response = await axios.get(`https://pixabay.com/api/`,
        {
            params: {
                key: `38416277-2f3b74029dfd524974848f805`,
                q: searchQuery,
                image_type: `photo`,
                orientation: `horizontal`,
                safesearch: `true`,
            }
        });
    return response.data;
    console.log(data);
};




