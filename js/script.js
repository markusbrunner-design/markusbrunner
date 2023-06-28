const personDir = './person/';
//const personDir = '//markusbrunner.de/person/';
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

document.querySelectorAll('button[data-person]').forEach((personButton) => {
  personButton.addEventListener('click', (ev) => {
    let personFile = ev.target.dataset.person;
    let text = getTextFileContent([personDir, personFile].join('')).then(
      (text) => {


        let html = converter.makeHtml(text);

        console.log('html', html);

        mainDynamicContentWrapper.setHTML(html);
      }
    );

  });
});