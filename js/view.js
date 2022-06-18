function singlePost() {
    let newObject = localStorage.getItem('viewPost')
    console.log(newObject);
    let post = JSON.parse(newObject)
    console.log(post)
    // console.log(post.title)
    document.getElementById('card-id').innerHTML = post.id
    document.getElementById('card-title').innerHTML = post.title
    document.getElementById('card-text').innerHTML = post.body
}

renderSingle();