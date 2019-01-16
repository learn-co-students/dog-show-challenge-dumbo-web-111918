document.addEventListener('DOMContentLoaded', () =>{
fetch("http://localhost:3000/dogs")
.then(res => res.json())
.then(data => data.forEach(function(dog){showDog(dog)}))
document.querySelector("#table-body").addEventListener('click', function(event){
   // debugger
  if (event.target.className.includes("butn")){
    findDog(event.target.getAttribute("data-id"))
  }
})
})

function showDog(dog){
  document.querySelector("#table-body").innerHTML +=
  `<tr>
  <td>${dog.name}</td>
  <td>${dog.breed}</td>
  <td>${dog.sex}</td>
  <td><button data-id= ${dog.id} class ="butn">Edit</button>
  </td></tr>`

}

function findDog(id){
fetch(`http://localhost:3000/dogs/${id}`)
.then(res => res.json())
.then(data => editDogForm(data))
}

function editDogForm(dog){
  document.querySelector(".name").value = dog.name
  document.querySelector(".breed").value = dog.breed
  document.querySelector(".sex").value = dog.sex

  // document.querySelector("#dog-form").addEventListener('submit', function(event){
  //   if(event.target.className.includes("submit")){
  //     event.preventDefault()
  //     editDog(dog)
  //   }
  // })
//     document.querySelector("#dog-form").addEventListener("submit", function(event){
//       debugger
//       event.preventDefault()
//       // if(event.target.className.includes("submit")){
//         debugger
//       editDog(dog)
// // }
//     })
}

function editDog(dog){
  debugger
  nameF = document.querySelector(".name").value
  breedF = document.querySelector(".breed").value
  sexF = document.querySelector(".sex").value
  fetch(`http://localhost:3000/dogs/${dog.id}`,{
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: nameF, sex: sexF, breed: breedF})
  }).then(res => res.json())
  .then(data => setUpFormSubmit(data))
  debugger
    dog.name =  nameF
}


function setUpFormSubmit(form){
    document.querySelector("#dog-form").addEventListener("submit", function(event){
    event.preventDefault()
    debugger
    const nameSF = document.querySelector(".name").value
    const breedSF = document.querySelector(".breed").value
    const sexSF = document.querySelector(".sex").value

    const puppie = {
      nameSF, breedSF, sexSF
    }

    fetch(`http://localhost:3000/pixels/${ id }`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Cookie": "HI MOM"
      },
      body: JSON.stringify(pixel)
    })
    .then(function(res) {
      return res.json() //a promise
     })
    .then(function(data) {
      const li = document.getElementById("pixel-" + data.id)
      setXYAndColorOfPixelLi(li, data)
      document.querySelector("#new-color-form").style.display = "none"
    })
  })
}
