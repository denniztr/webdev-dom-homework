'use strict';
import { getFetch, postFetch } from "./api.js";
import { renderComments } from "./renderComments.js";

const app = document.getElementById('app');

let comments = [];
let isInitialLoading = true;

export function handlePostClick() {
    
    const addButton = document.getElementById('add-form-button'); 
    const nameInput = document.querySelector('.add-form-name');
    const textInput = document.querySelector('.add-form-text');

    if (!textInput.value || !nameInput.value) {
        alert('Заполните форму');
        return
    }

    addButton.disabled = true;
    addButton.textContent = 'Отправление...';

    nameInput.classList.remove('error');
    textInput.classList.remove('error');


    postFetch(nameInput, textInput)
        .then(() => {
            return startFetch();
        })
        .then(() => {
            addButton.disabled = false;
            addButton.textContent = 'Написать';

            textInput.value = '';
            nameInput.value = '';
        })
        .catch((error) => {
            addButton.disabled = false;
            addButton.textContent = 'Написать';

            if (error.message === 'error500') {
                alert('Сервер сломался, попробуйте позже');
            }

            if (error.message === 'error400') {
                alert('Имя и комментарий должны быть не короче трёх символов');
            }

        });

    renderComments(app, isInitialLoading, comments, initAddButton);
}

function initAddButton() {
    let addButton = document.getElementById('add-form-button'); 
    addButton.addEventListener('click', handlePostClick);
}

function startFetch() {
    getFetch().then((data) => {
        comments = data.comments;
        isInitialLoading = false;
        renderComments(app, isInitialLoading, comments, initAddButton);
    });
}

startFetch();


