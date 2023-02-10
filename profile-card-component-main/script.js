const element = document.querySelector('.content__about')

fetch('https://randomuser.me/api/')
.then( request => request.json())
.then( result => {
    const user = result.results[0]
    console.log(user);
    element.innerHTML = 
    `
    <figure >
        <img src="${user.picture.large}" alt="${user.name.title} ${user.name.last}">
    </figure>
    <h1><Strong>${user.name.first} ${user.name.last}</Strong> <span>${user.dob.age}</span> </h1>
    <p>${user.location.city}</p>   

    `
})