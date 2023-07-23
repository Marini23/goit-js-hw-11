import axios from "axios";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(`.search-form`);
const input = document.querySelector(`input`);
const button = document.querySelector(`button`);
const div = document.querySelector(`.gallery`);



async function getImages() {
    console.log(`func`);
    input.addEventListener(`change`, inputValue);
    function inputValue(e) {
    e.preventDefault();
    const inputSeach = e.target.value;
    console.log(inputSeach);
}
    const response = await axios.get(`https://pixabay.com/api/`,
        {
            params: {
                key: `38416277-2f3b74029dfd524974848f805`,
                q: `cat`,
                image_type: `photo`,
                orientation: `horizontal`,
                safesearch: `true`,
            }
        });
    console.log(response);
};

getImages();

// input.addEventListener(`change`, inputValue);

button.addEventListener(`click`, btnSubmit);

function btnSubmit(e) {
    e.preventDefault();
    console.log(`submit`);
};

// const inputName = function inputValue(e) {
//     e.preventDefault();
//     const inputSeach = e.target.value;
//     console.log(inputSeach);
// }