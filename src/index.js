document.addEventListener('DOMContentLoaded', initialize)

function initialize(){
  getAllDogs().then(addDogsToTable);
}

// adds all dogs to table
// adds data id to row
// adds edit button click
function addDogsToTable(dogArray){
  const dogTable = document.querySelector("tbody")
  dogTable.innerHTML = ""
  dogArray.forEach(dog => {
  const row = document.createElement('tr')
  row.innerHTML = `<td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button data-id=${dog.id}>Edit Dog</button></td>`

  const btn = row.querySelector('button')
   // row.dataset.id = dog.id
   dogTable.append(row)
   btn.addEventListener('click', onDogRowClick)
 })
}

// prepopulates edit form
function populateDogForm(dog){
  const dogForm = document.querySelector("#dog-form")
  dogForm.name.value = dog.name
  dogForm.breed.value = dog.breed
  dogForm.sex.value = dog.sex
  dogForm.addEventListener("submit", submitDogChanges)

  //adding hidden ID field
  var input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", "someID");
  input.setAttribute("value", dog.id);
  dogForm.append(input);
}


//get new values --> send to get PATCH'd
function submitDogChanges(event){
  event.preventDefault()

  const newName = event.target[0].value
  const newBreed = event.target[1].value
  const newSex = event.target[2].value
  const submitBTN = event.target[3].value
  const someID = event.target.someID.value
  const newValues = [newName, newBreed, newSex]
  console.log(someID)
  const dogForm = document.querySelector("#dog-form")

  editDog(newValues, someID)
    .then(data => refreshDogs().then(addDogsToTable)
  )
}


// event handler for edit click --> does single fetch
function onDogRowClick(event){
  getOneDog(event.target.dataset.id)
    .then(data => populateDogForm(data))
}


// some fetches here
const dogURL = `http://localhost:3000/dogs`

function getAllDogs(){
  return fetch(dogURL)
    .then(response => response.json())
}

function getOneDog(id){
  return fetch(dogURL + `/${id}`)
    .then(response => response.json())
}

function editDog(newValues, someID){
  const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: newValues[0],
        breed: newValues[1],
        sex: newValues[2]
      })
    }
    return fetch(dogURL + `/${someID}`, options)
      .then(response => response.json())

}

function refreshDogs(data){
  return fetch(dogURL)
    .then(response => response.json())
}
