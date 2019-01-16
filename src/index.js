document.addEventListener('DOMContentLoaded', () => {
  fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(data => data.forEach(function(dog){showDog(dog)}))


    table = document.querySelector("#doggy")
    let nameVal = document.querySelector("#dog-form")["name"]
    let breedVal = document.querySelector("#dog-form")["breed"]
    let sexVal = document.querySelector("#dog-form")["sex"]
    table.addEventListener('click', function(event){
      // console.log(event.target)
      // debugger
      if(event.target.classList.contains("edit-btn")){
        nameVal.value = event.target.parentElement.parentElement.firstElementChild.innerText
        breedVal.value = event.target.parentElement.parentElement.firstElementChild.nextElementSibling.innerText
        sexVal.value = event.target.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerText

      }
      editDog()
    })
})

  function showDog(dog){
    // debugger
    document.querySelector("#table-body").innerHTML +=
    `<tr><td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button data-id ="${dog.id}" class= "edit-btn">Edit</button></td></tr>`

    // debugger
  }

  function editDog(){
    debugger
    let doggieId = event.target.getAttribute("data-id")

fetch(`http://localhost:3000/dogs/${doggieId}`{
  method: "PATCH",
  header:   {
  Content-Type: "application/json",
}
})
    console.log(doggieId)

  }

  function search(dog){
    dogs.filter
  }
