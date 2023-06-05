
export const replaceValue = (value) => {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll('QUOTE_BEGIN', '<div class="quote">')
      .replaceAll('QUOTE_END', '</div>');
  };

export const getTime = (commentData) => {
    let date = new Date(commentData);
    let time = date.toTimeString().slice(0, 5);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let year = Number(String(date.getFullYear()).substring(2));
    return day + '.' + month + '.' + year + ' ' + time;
  };
  