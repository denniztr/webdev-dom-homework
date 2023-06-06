import { renderLogin } from "./renderLogin.js";
import { getTime } from "./utils.js";
import { postFetch } from "./api.js";

export const renderComments = (app, isInitialLoading, comments, callback, user) => {

    const commentsHtml = comments
        .map((comment, index) => {
            return `
        <li data-index='${index}' class="comment">
        <div class="comment-header">
          <div>${comment.author.name}</div>
          <div>${getTime(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index='${index}' class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>`;
        })
        .join('');

    const appHtml = `<div class="container">
      <ul id='comments' class="comments">
      ${isInitialLoading ? '<div>Комментарии загружаются</div>' : commentsHtml}
      </ul>
      ${user ? 
        `<div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          value='${user.name}'
          disabled
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
          value=''
          id="text-input"
        ></textarea>
        <div class="add-form-row">
          <button id="add-form-button" class="add-form-button">Написать</button>
        </div>
     </div>` 
     : 
      `<div class="form-loading" style="margin-top: 20px">
      Чтобы добавить комментарий, <a href='#' id="go-to-login" href="">авторизуйтесь</a>
      </div>`
    }
      </div>`;

      
    app.innerHTML = appHtml;

    const likeButtons = document.querySelectorAll('.like-button');
    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            let index = likeButton.dataset.index;
            let counter = comments[index].likes;
            comments[index].isLiked
                ? counter -= 1
                : counter += 1;
            comments[index].isLiked = !comments[index].isLiked;
            comments[index].likes = counter;
            renderComments(app, isInitialLoading, comments, callback, user)
        });
    }

    const commentElements = document.querySelectorAll('.comment');
    const textInput = document.querySelector('.add-form-text');

    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index;

            textInput.value = `QUOTE_BEGIN ${comments[index].author.name}: ${comments[index].text} QUOTE_END`;
        })
    }

  if(!user) {
    const goToLogin = document.getElementById('go-to-login');
    goToLogin.addEventListener('click', () => {
      renderLogin(app, isInitialLoading, comments, callback, user)
    });
  }

  if (user) {
    if (callback) callback(user)
  }
};


