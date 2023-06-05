import { replaceValue } from "./utils.js";

const host = 'https://wedev-api.sky.pro/api/v1/denniztr/comments';

export function getFetch() {
    return fetch(host, {
        method: 'GET',
      }).then((res) => res.json());
};

export function postFetch(nameInput, textInput) {
    return fetch(host, {
        method: 'POST',
        body: JSON.stringify({
          name: replaceValue(nameInput.value),
          text: replaceValue(textInput.value),
          forceError: true,
        }),
      })
      .then((response) => {
        console.log(response);
  
        if (response.status === 201) {
          response.json();
        } else if (response.status === 500) {
          throw new Error('error500');
        } else if (response.status === 400) {
          throw new Error('error400');
        }
    })
}
