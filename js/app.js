let postWrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form')
let title = document.querySelector('#title')
let body = document.querySelector('#body')

let postBox = [];

function getPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => (response.json()))
  .then((data) => {
    // console.log(postBox)
    // console.log(data)
    postBox = data
    let postHolder = ''
    postBox.forEach(post => {
      // console.log(post)
      postHolder += `
            <div class="col-lg-12 mb-3">
              <div class="card">
                <div class="card-body">
                  <p>${post.id}</p>
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${post.body}</p>
                  <div class="d-flex gap-2">
                    <button class="btn btn-secondary" id="view" onclick="viewPost(${post.id})"><i class="bi bi-eye"></i> Read More</button>
                    <button class="btn btn-primary"  id="update" onclick="updatePost(${post.id})"><i class="bi bi-pencil-square"></i> Update</button>
                    <button class="btn btn-danger" id="delete" onclick="deletePost(${post.id})"><i class="bi bi-trash3"></i> Delete</button>
                    </div>
                </div>
              </div>
            </div>
      
      `
    });
    postWrapper.innerHTML = postHolder; 
  })

}

getPosts();

postForm.addEventListener('submit', createPost)

function createPost(e) {
  e.preventDefault();
  // console.log(title.value, body.value)
  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
          title: title.value,
          body: body.value,
          userId: 2
      }),
      headers: {
          'Content-type': 'application/json'
      }
  })
      .then((response) => response.json())
      .then((data) => {
          console.log(data)
          postBox.unshift(data);
          // console.log(postBox)
          let postHolder = '';
          postBox.forEach(post => {
              postHolder += `
              <div class="col-lg-12 mb-3">
                <div class="card">
                  <div class="card-body">
                    <p id="card-id">${post.id}</p>
                    <h5 id="card-title" class="card-title">${post.title}</h5>
                    <p id="card-text" class="card-text">${post.body}</p>
                    <div class="d-flex gap-2">
                      <button class="btn btn-secondary" id="view" onclick="viewPost(${post.id})"><i class="bi bi-eye"></i> Read More</button>
                      <button class="btn btn-primary"  id="update" onclick="updatePost(${post.id})"><i class="bi bi-pencil-square"></i> Update</button>
                      <button class="btn btn-danger" id="delete" onclick="deletePost(${post.id})"><i class="bi bi-trash3"></i> Delete</button>
                    </div>
                  </div>
                </div>
              </div>
          `
          });
          postWrapper.innerHTML = postHolder;
      })
}


function updatePost(id) {
  console.log(id)

  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    id: id,
    title: title.value,
    body: body.value,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => {

    console.log(data)
    let cardTitles = document.querySelectorAll('.card-title')
    let cardBodies = document.querySelectorAll('.card-text')
    // console.log(cardTitles)
    cardTitles.forEach((cardTitle, index) => {
      if (index + 1 === id) {
        cardTitle.innerHTML = data.title
      }
    })
    cardBodies.forEach((cardBody, index) => {
      if (index + 1 === id) {
        cardBody.innerHTML = data.body
      }
    })
  });
}

function viewPost(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      localStorage.setItem('viewPost', JSON.stringify(data))
      window.location.href = 'view.html'
      console.log(data)
    });
}

function deletePost(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
  })
      .then((response) => response.json())
      .then((data) => {
          console.log(data)
          postBox = postBox.filter(post => post.id !== id)
          console.log(postBox)
          // use a function to display the UI
          deleteUI(postBox)  
      })

}

function deleteUI(arr) {
  let postHolder = ''
    arr.forEach(post => {
      // console.log(post)
      postHolder += `
            <div class="col-lg-12 mb-3">
              <div class="card">
                <div class="card-body">
                  <p>${post.id}</p>
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${post.body}</p>
                  <div class="d-flex gap-2">
                    <button class="btn btn-secondary" id="view" onclick="viewPost(${post.id})"><i class="bi bi-eye"></i> Read More</button>
                    <button class="btn btn-primary"  id="update" onclick="updatePost(${post.id})"><i class="bi bi-pencil-square"></i> Update</button>
                    <button class="btn btn-danger" id="delete" onclick="deletePost(${post.id})"><i class="bi bi-trash3"></i> Delete</button>
                    </div>
                </div>
              </div>
            </div>
      
      `
  });
  postWrapper.innerHTML = postHolder;  
}