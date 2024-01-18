let mainDynamicContentWrapper = document.querySelector('#main__dynamic-content');
let converter = new showdown.Converter();

let getTextFileContent = function(file) {
  return fetch(file)
    .then(response => response.text())
    .catch(error => {
      // Handle any error that occurred during the fetch
      console.error('Error:', error);
    });
}

let changeContent = function(dir, file) {
  let text = getTextFileContent([dir, file].join('')).then(
    (text) => {
      let html = converter.makeHtml(text);
      mainDynamicContentWrapper.innerHTML = html;
    }
  );
}

document.querySelectorAll('button[data-person]').forEach((personButton) => {
  personButton.addEventListener('click', (ev) => {
    let personFile = ev.target.dataset.person;
    changeContent('./person/', personFile);
  });
});

document.querySelectorAll('button[data-poem]').forEach((poemButton) => {
  poemButton.addEventListener('click', (ev) => {
    let poemFile = ev.target.dataset.poem;
    changeContent('./poem/', poemFile);
  });
});