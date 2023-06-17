let addToy = false;

//update likes
function updateLikes(id, newNumberOfLikes){
  fetch(`http://localhost:3000/toys/id${id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
  })
  .then(response => response.json())
  .then()
}

function createCardElement(toy){
  //make a <div class="card">
  //create a div
  let card = document.createElement("div")
  //add card class
  card.classList.add("card")
  /*
Each card should have the following child elements:

h2 tag with the toy's name
img tag with the src of the toy's image attribute and the class name "toy-avatar"
p tag with how many likes that toy has
button tag with a class "like-btn" and an id attribute set to the toy's id number
After all of that, the toy card should look something like this:

<div class="card">
  <h2>Woody</h2>
  <img src="[toy_image_url]" class="toy-avatar" />
  <p>4 Likes</p>
  <button class="like-btn" id="[toy_id]">Like ❤️</button>
</div>
  */
let h2 = document.createElement("h2")
h2.textContent = toy.name

let img = document.createElement("img")
img.src = toy.image
img.classList.add("toy-avatar")
//creates a paragraph
let p = document.createElement("p")
p.textContent = `${toy.likes} likes`
//creates button
let button = document.createElement('button')
//create an eventListener
button.addEventListener("click", () => {
  //update likes element
  p.textContent = `${toy.likes += 1} Likes`
  //patch
  updateLikes(toy.id, toy.likes)
})
//adds class
button.classList.add("like-btn")
//adds id
button.id = toy.id
button.textContent = "Like ❤️"

card.append(h2, img, p, button)
//add id toyCollection and append above card child
document.getElementById("toy-Collection").appendChild(card)
}


function sendItout(newToy){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},

body: JSON.stringify({
  ...newToy,
  //the above line will add the following behind the scenes
  // name: newToy.name,
  // image: newToy.image,
  "likes": 0
})
  }).then(
    (response) => response.json()
  )
  .then(responseToy => createCardElement(responseToy))
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => toys.forEach(toy => createCardElement(toy)))

  //return the first element that matches query
    const form = document.querySelector("form.add-toy-form")
    form.addEventListener("submit", (event) => {
      event.preventDefault()
      const formData = Object.fromEntries(new FormData(event.target))
      console.log(formData)
    })

  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  addBtn.addEventListener("click", () => {
    //hide & seek with the form
    addToy = !addToy
    if(addToy){
      toyFormContainer.computedStyleMap.display = "block"
    } else{
      toyFormContainer.computedStyleMap.display = "nome"
    }
  })
})
