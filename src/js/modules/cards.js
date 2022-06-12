import showCards from "./showcards";
import fillPos from './fillpos';
import {getResources} from '../services/services';
import {postData} from '../services/services';

function cards() {  

    const postName = document.querySelector('.form-card__name');
    const postEmail = document.querySelector('.form-card__email');
    const postPhone = document.querySelector('.form-card__phone');
    const postPhoto = document.querySelector('input[type="file"]');
    const postPos = document.querySelectorAll('input[type="radio"]');

    const success = document.querySelector('#success');

    const form = document.querySelector('form');
    
    const showMoreBtn = document.querySelector('.showmore-btn');

    let token;
    let page =  1;
    
    const newPost = {
        name: '',
        email: '',
        phone: '',
        position: '',
        photo: ''
    };

    getResources('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
        .then(data => {
            fillPos(postPos, data.positions);
        });

    getResources('https://frontend-test-assignment-api.abz.agency/api/v1/token')
        .then(data => {
            token = data.token;
        });

    postName.addEventListener('change', (e) => {
        newPost.name = e.target.value;
    });
    postEmail.addEventListener('change', (e) => {
        newPost.email = e.target.value;
    });
    postPhone.addEventListener('change', (e) => {
        newPost.phone = e.target.value;
    });
    postPhoto.addEventListener('change', (e) => {
        newPost.photo = e.target.value;
    });
    postPhoto.addEventListener('change', (e) => {
        newPost.photo = e.target.value;
    });
    postPos.forEach(item => {
        item.addEventListener('change', (e) => {
            newPost.position = e.target.id;
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const cardsBody = document.querySelector('.cards__body');

        formData.append('position_id', newPost.position); 
        formData.append('name', newPost.name); 
        formData.append('email', newPost.email); 
        formData.append('phone', newPost.phone); 
        formData.append('photo', newPost.photo);
    
        postData('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, token)
            .then(data => {
                console.log(data);
                if (data.fails) { 
                    for (let key in data.fails) {
                        let elem = document.querySelector(`.form-card__${key}`);
                        const span = document.createElement('span');
                        span.classList.add('error');
                        span.append(data.fails[key].join());

                        elem.after(span);
                    }
                } else {
                    form.classList.add('hide');
                    success.style.display = 'block';
                    cardsBody.innerHTML = '';
                    getUsersData();
                    console.log(data); 
                }
            })
            .catch(err => err.message)
            .finally(() => {
                if (form.classList.contains('hide')) {
                    setTimeout(() => {
                        form.classList.remove('hide');
                        success.style.display = 'none';
                    }, 2000);
                }

                form.reset();
            });
    });
       
    showMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();

        page++;
        console.log(page);
        getUsersData();
    });

    function getUsersData() {
        getResources(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`)
        .then(data => {
            showCards(data.users);
            console.log(data); 
            page = 1;
            if (page === data.total_pages) {
                hideBtn();
            } else {
                showBtn();
            }
        });
    }

    getUsersData();

    function showBtn() {
        showMoreBtn.style.display = 'inline-block';
    }

    function hideBtn() {
        showMoreBtn.style.display = 'none';
    }

}

export default cards;

