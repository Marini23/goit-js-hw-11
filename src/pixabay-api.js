import axios from "axios";
export default class PixabayService {
    constructor() {
        this.searchQuery = ``;
        this.page = 1;
    }
async fetchArticles(searchQuery) {
const url = `https://pixabay.com/api/`
    const options = {
        params: {
            key: `38416277-2f3b74029dfd524974848f805`,
            q: this.searchQuery,
            image_type: `photo`,
            orientation: `horizontal`,
            safesearch: `true`,
            per_page: 4,
            page: this.page,
        }
    };
    const { data } = await axios.get(url, options);
    // this.page += 1;
    return data;
    // return (data => { this.page += 1; });

    }
    get query() {
        return this.searchQuery;
    };

    set query(newQuery) { 
        return this.searchQuery = newQuery;
    };
incrementPage() {
        this.page += 1;
    }

};

