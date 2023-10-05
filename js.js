class Gallery {
    constructor() {
        this.API_KEY = '4tbcGtqsvfbPkIWNiFn5E69uoyU8AsBApNgWKJ0pf1oNrxaBafgtwTfc';
        this.galleryDIV = document.querySelector('.gallery');
        this.searchForm = document.querySelector('.form form');
        // this.searchIcon = document.querySelector('.icon');
        this.eventHandle();
    }

    eventHandle() {
        document.addEventListener('DOMContentLoaded', () => {
            this.getImg();
            const input = this.searchForm.querySelector('input');
            input.focus();

            const searchIcon = document.querySelector('.search-icon');
            const clearIcon = document.querySelector('.clear-icon');

            searchIcon.addEventListener('click', () => {
                this.getSearchedImages();
            });

            clearIcon.addEventListener('click', () => {
                searchIcon.style.display = 'block';
                clearIcon.style.display = 'none';

                input.value = '';
                input.placeholder = 'Search...';
            });

            input.addEventListener('click', () => {
                if (input.value.trim() !== '') {
                    clearIcon.style.display = 'block';
                }
            });
        });

        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.getSearchedImages(e);
        });
    }



    async getImg() {
        const randomNumber = Math.floor(Math.random() * 250);
        const baseURL = `https://api.pexels.com/v1/curated?per_page=16&page=${randomNumber}`;
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
    }

    async fetchImages(baseURL) {
        const response = await fetch(baseURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: this.API_KEY
            }
        });
        const data = await response.json();
        console.log(data)
        return data;
    }

    GenerateHTML(photos) {
        photos.forEach(photo => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `<a href='#'>
                <img src="${photo.src.medium}" alt=""></a>`;
            this.galleryDIV.appendChild(item)
        })
    }

    async getSearchedImages(e) {
        if (e) {
            e.preventDefault();
        }

        this.galleryDIV.innerHTML = '';
        const searchValue = this.searchForm.querySelector('input').value;
        const language = /[а-яА-ЯЁё]/.test(searchValue) ? 'ru-RU' : 'en-US';
        const baseUrl = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=16&locale=${language}`;
        const data = await this.fetchImages(baseUrl);
        this.GenerateHTML(data.photos);

        const clearIcon = document.querySelector('.clear-icon');
        clearIcon.style.display = 'block';
    }
}
    const gallery = new Gallery;