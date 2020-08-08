const form = document.querySelector('form');
const load = document.querySelector('.loading');
const show = document.querySelector('.show');
const API_URL = process.env.Port/some || 'http://localhost:5000/some'

//load.style.display = 'none';
load.style.display = '';

listAllData();

form.addEventListener('submit', (event) => {
  event.preventDefault(); // IDEA: prevent from data being send, while submitted
  const formData = new FormData(form);
  const name = formData.get('name'); // IDEA: (form.name.value);
  const content = formData.get('content');

  const object = {
    name,
    content
  };
  // console.log(object);
  //form.style.display = 'none';
  load.style.display = '';

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(object), // IDEA: convert js array, object into JSON in order to read in ....
    headers: {
      'content-type': 'application/json' // IDEA: Here the content type is application/json as the object/content send here is JSON ;)
    } // IDEA: Here the client sends some Data To server (index.js) (POST request)
  }).then(response => response.json()).then(createdData => {
    console.log(createdData);
    form.reset();
    setTimeout(() => {
      form.style.display = '';
    }, 10000);
    listAllData();
    //load.style.display = 'none';
  });
});

function listAllData() {
  show.innerHTML = ''; // just reformat && add elements back
  load.style.display = 'none';
  fetch(API_URL)
    .then(response => response.json())
.then(data => {
      data.reverse();
      //console.log(data);
      data.forEach(dash => {
        const div = document.createElement('div');

        const index = document.createElement('h2');
        index.textContent = dash.name;

        const content = document.createElement('p');
        content.textContent = dash.content;

        const date = document.createElement('h6');
        date.textContent = new Date(dash.created);

        div.appendChild(index);
        div.appendChild(content);
        div.appendChild(date);

        show.appendChild(div);
      });
      load.style.display = 'none';
    });
}
