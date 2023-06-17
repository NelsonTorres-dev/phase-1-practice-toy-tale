// const API = "http://localhost:3000/toys"


let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form")

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    // debugger
    data.likes = 0

    debugger

   fetch(API, {
    method: "POST",
    headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},
body: JSON.stringify(data)
   })
   .then((resp) => resp.json())
   .then((data) => console.log(data))
  })

  fetch(API)
  .then((response) => response.json())
  .then(renderToys)

function renderToys(toyList){
 
  toyList.forEach((toy) => {
    const card = document.createElement("div")
    card.classList.add("card")

    const h2 = document.createElement("h2")
     h2.textContent = toy.name
     console.log(h2)

   const img = document.createElement("img")
   img.classList.add("toy-avatar")
   img.src = toy.image

   const p = document.createElement("p")
   p.textContent  = `${toy.likes} Likes`

   const button = document.createElement("button")
   button.classList.add("like-btn")
   button.setAttribute("id",toy.id)
   button.textContent = "Like ❤️"

   card.append(h2, img, p, button)
   
   document.querySelector("#toy-collection").appendChild(card)


  })
}

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy; //toggling addToy from false to true each time 
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


