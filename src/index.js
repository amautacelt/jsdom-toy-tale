let addToy = false;
let toyCollectionDiv = document.querySelector("div#toy-collection")
// console.log(toyCollectionDiv)
let toyForm = document.querySelector(".add-toy-form")

fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(function(toysArray){
    // Object.keys(obj) or Object.values(obj)
    toysArray.forEach(function(toyObj){
      // console.log(toyObj)
      turnToyToCard(toyObj)
    })

    //toysArray.forEach(turnToyToCard)
  })


  // {} -> <HTML EventListeners/>
  function turnToyToCard(toy){
    // toy = whatever argument is being passed in
    let toyCardDiv = document.createElement("div")
      toyCardDiv.className = "card"

    let toyNameH2 = document.createElement("h2")
      toyNameH2.innerText = toy.name
    
    let toyImage = document.createElement("img")
      toyImage.src = toy.image
      toyImage.className = "toy-avatar"
      toyImage.alt = toy.name

    let likesP = document.createElement("p")
      likesP.innerText = `${toy.likes} Likes`

    let likeButton = document.createElement("button")
      likeButton.className = "like-btn"
      likeButton.innerText = "Like <3"

      toyCardDiv.append(toyNameH2, toyImage, likesP, likeButton)
      // console.log(toyCardDiv);
      toyCollectionDiv.append(toyCardDiv)


      //Unstable elements get their event listener in the place they are created
      likeButton.addEventListener("click", function(event){

        // When updating:
        // backend using fetch
        // DOM using DOM manipulation
        // the object in memory using object logic

        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            likes: toy.likes + 1
          })
        })
          .then(response => response.json())
          .then(function(updatedToyObj){
            toy.likes = updatedToyObj.likes
            // toy = updatedToyObj

            likesP.innerText = `${updatedToyObj.likes} Likes`
          })

      })  // LikeButton EvtListener ends here
          // for unstable elements (created in JS), usually after a fetch request, make sure event listeners exist in same scope 
          //(same place where unstable elements were created is same place for event listeners)

  } // turnToyToCard ends here


// Stable Element event listener on global level
// Rare to do this inside of another event listener

toyForm.addEventListener("submit", function(event){
  event.preventDefault()
  let newName = event.target.name.value
  let newImage = event.target.image.value
  // e.target.querySelectorAll("input") [0] or [1]<- NodeList of all inputs
  // e.target.querySelector("[name='name']")


  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newName,
      image: newImage,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(function(newToy){
    turnToyToCard(newToy)
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
