import { fetchLogin } from "./api.js";
import { renderComments } from "./renderComments.js";

export const renderLogin = (app, isInitialLoading, comments, callback) => {
    app.innerHTML = `
    <div class="container">
    <div class="add-form">
      <h3 class="title">Форма входа</h3>
      <input
        type="text"
        class="add-form-name add-form-login"
        placeholder="Введите логин"
        id="login"
      />
      <input
        type="password"
        class="add-form-name"
        placeholder="Введите пароль"
        id="password"
      />

      <button id="auth-button" class="auth-button add-form-button">
          Войти
      </button>

      <button id="auth-toggle-button" class="auth-button add-form-button auth-toggle">
        Зарегистрироваться
      </button>
    </div>
  </div>`;


  const authButton = document.getElementById('auth-button');
  authButton.addEventListener('click', () => {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    fetchLogin(login, password).then((response) => {
        renderComments(app, isInitialLoading, comments, response.user, callback);
    });
  });
};

