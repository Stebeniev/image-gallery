class ImageGallery {
    constructor() {
        this.API_KEY = 'rK39TCKjGjqR_MKUjOb82Im2jE1s7hNVaDwegNMhQbI';
        this.galleryDIV = document.querySelector('.gallery');
        this.searchForm = document.querySelector('.form form');
        this.input = this.searchForm.querySelector('input.search');
        this.eventHandle();
    }

    eventHandle() {
        document.addEventListener('DOMContentLoaded', () => {
            this.getImg();
            this.input.focus();
            this.setupEventListeners();
        });

        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.getSearchedImages();
        });
    }

    setupEventListeners() {
        const searchIcon = this.searchForm.querySelector('.bi-search');
        const clearIcon = this.searchForm.querySelector('.clear');

        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            this.getSearchedImages();
        });

        clearIcon.addEventListener('click', () => {
            this.clearInput();
        });

        this.input.addEventListener('input', () => {
            this.updateSearchInput();
        });
    }

    async getImg() {
        this.showLoading();
        const baseURL = `https://api.unsplash.com/photos?client_id=${this.API_KEY}&per_page=28`;
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data);
        this.hideLoading();
    }

    async fetchImages(baseURL) {
        try {
            const response = await fetch(baseURL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Client-ID ${this.API_KEY}`
                }
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    GenerateHTML(photos) {
        this.galleryDIV.innerHTML = '';
        photos.forEach(photo => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `<a href='#'><img src="${photo.urls.regular}" alt="${photo.alt_description}"></a>`;
            this.galleryDIV.appendChild(item);
        });
    }

    async getSearchedImages() {
        // this.galleryDIV.innerHTML = '';
        const searchValue = this.input.value.trim();
        if (!searchValue) return;

        const baseUrl = `https://api.unsplash.com/search/photos?query=${searchValue}&per_page=28&client_id=${this.API_KEY}`;

        this.showLoading();
        const data = await this.fetchImages(baseUrl);
        this.GenerateHTML(data.results);
        this.hideLoading();
    }

    updateSearchInput() {
        const clearIcon = this.searchForm.querySelector('.clear');
        if (this.input.value.trim() !== '') {
            clearIcon.style.display = 'block';
        } else {
            clearIcon.style.display = 'none';
        }
    }

    clearInput() {
        this.input.value = '';
        this.input.placeholder = 'Search...';
        this.updateSearchInput();
    }

    showLoading() {
        const loading = document.createElement('div');
        loading.classList.add('loading');
        loading.innerText = 'Loading...';
        this.galleryDIV.appendChild(loading);
    }

    hideLoading() {
        const loading = this.galleryDIV.querySelector('.loading');
        if (loading) {
            loading.remove();
        }
    }
}
const gallery = new ImageGallery();
