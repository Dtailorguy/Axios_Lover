// GET REQUEST
function getTodos() {
//    axios({
//      method: 'get',
//      url: 'https://jsonplaceholder.typicode.com/todos',
//      params: {
//         _limit: 5
//      }
//     }) 
//      .then(res => showOutput(res))
//      .catch(err => console.error(err));
    axios
        // .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .get('https://jsonplaceholder.typicode.com/users/5')
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}

// POST REQUEST
function addTodo() {
       axios
         .post('https://jsonplaceholder.typicode.com/todos', {
            title: 'New Todo',
            completed: false
         })
         .then(res => showOutput(res))
         .catch(err => console.error(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
        axios
        .patch('https://jsonplaceholder.typicode.com/todos/1', {
        title: 'Updated Todo',
        completed: true
        })
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}

// DELETE REQUEST
function removeTodo() {
    axios
    .delete('https://jsonplaceholder.typicode.com/todos/1',)
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// SIMULTANEOUS DATA
function getData() {
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    ])
    .then(axios.spread((todos, post) => showOutput(posts)))
    .catch(err => console.error(err));
}

//CUSTOM HEADERS
function customHeraders() {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'sometoken'
        }
    }
    axios
    .post('https://jsonplaceholder.typicode.com/todos', {
       title: 'New Todo',
       completed: false
    },
     config
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// TRANSFORMING REQUEST & RESPONSES
function transformResponse() {
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
            title: 'Hello World'
        },
        transformResponse: axios.defaults.transformResponse.concat(data =>{
           data.title = data.title.toUpperCase();
           return data;
        })
    }

    axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandLing() {
    axios
        .get('https://jsonplaceholder.typicode.com/todoss')
        .then(res => showOutput(res))
        .catch(err => {
            if(err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

                if (err.response.status === 404) {
                    alert('Error: Page Not Found');
                }
            }
        });
}

// CANCEl TOKEN
function cancelToken() {
    const source = axios.cancelToken.source();

    axios
        .get('https://jsonplaceholder.typicode.com/todoss', {
            cancelToken: source.token
        })
        .then(res => showOutput(res))
        .catch(thrown => {
            if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
         }
        });

    if (true) {
        source.cancel('Request canceled!');
    }
}

//INTERCEPTION REQUEST & RESPONSES
axios.interceptors.request.use(
    config => {
        console.log(
        `${config.method.toUpperCase()} request sent to ${
          config.url
        } at ${new Date().getTime()}`
     );

     return config;
  },
    error => {
        return Promise.reject(error);
  }
        
);

// AXIOS INSTANCE
const axiosInstance = axios.create({
    baesURL: 'https://jsonplaceholder.typicode.com'
});

axiosInstance.get('/comment').then(res => showOutput(res));


// Show output in browser
function showOutput(res) {
    let user = res.data;
    document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
      <div class ="card-header">
        Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
     <div class ="card-header">
      ${user.name}
  </div>
    <div class="card-body">
        <ul>
            <li>Username : <span class="text-primary">${user.username}</span></li>
            <li>Address : <span class="text-danger">${user.address.street}</span></li>
            <li>Email : <span class="text-secondary">${user.email}</span></li>
            <li>Phone : <span class="text-orange">${user.phone}</span></l1>
            <li>website : <span class="text-violet">${user.website}</span></l1>
            <li>Company : <span class="text-danger">${user.company.name}</span></l1>
        </ul>
        <pre>${JSON.stringify(user, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
     <div class ="card-header">
      Config
  </div>
    <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`
};

// Event Listiners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeraders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandLing);
document.getElementById('cancel').addEventListener('click', cancelToken);