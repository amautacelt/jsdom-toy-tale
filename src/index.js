let addToy = false;

const toyCollection = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")

fetch('http://localhost:3000/toys')
  .then(r => r.json())
  .then(toysArray => toysArray.forEach(toyObj => {
    renderToyCard(toyObj)
  }))

function renderToyCard(toyObj){
  const toyDivCard = document.createElement('div')
  toyDivCard.classList.add("card")
  toyDivCard.dataset = toyObj.id

  const toyNameH2 = document.createElement('h2')
  toyNameH2.innerText = toyObj.name

  const toyImg = document.createElement('img')
  toyImg.src = toyObj.image
  toyImg.alt = toyObj.name

  const toyLikesP = document.createElement('p')
  toyLikesP.textContent = `${toyObj.likes} Likes`

  const likesButton = document.createElement('button')
  likesButton.classList.add("like-btn")
  likesButton.innerText = "Like ❤️"

  toyDivCard.append(toyNameH2, toyImg, toyLikesP, likesButton)
  toyCollection.append(toyDivCard)


  likesButton.addEventListener('click', function(event){

    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: toyObj.likes + 1
      })
    })
    .then(resp => resp.json())
    .then(function(updatedToyLikes){
      toyObj.likes = updatedToyLikes.likes

      toyLikesP.textContent = `${updatedToyLikes.likes} Likes`
    })

  })

}


toyForm.addEventListener('submit', e => {
  e.preventDefault()
  
  const newToyObj = {
    name: e.target.name.value,
    image: toyForm.image.value,
    likes: 0
  }  

  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToyObj)
  })
  .then(r => r.json())
  .then(toyObj => {
    renderToyCard(toyObj)
  })

})




document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
