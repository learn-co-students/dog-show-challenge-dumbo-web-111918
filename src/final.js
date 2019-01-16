//----------------Step 1---------------------------.//
//Added DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
//----------------Step 2---------------------------.//
//Found where I want to Put my data
    let tableBody = document.getElementById('table-body')
//----------------Step 3---------------------------.//
//Fecth the Data I want to put
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
//----------------Step 4---------------------------.//
//Itterate Over Data within Fetch
    .then(data => data.forEach(function(data){
//----------------Step 5---------------------------.//
//Send that itteration to a callback
//function that will put it on the dom
        updateDogTable(data)
    }))
//--------------Step 11 (cont.) ----------------------------//
//Find Stable Parent Element
//tablebody
tableBody.addEventListener('click',
//create a function to check if event target
//is the button we want
//!! this why we added
// a class to the button!!
    function(event){
      if (event.target.className.includes('dog-butn')){
//If it is the button the event listener will run the
//callback function
//If it is not it will do nothing
//I am passing in the data-id
//that i set to the button
//which is equal to the selected dogs id
//I am passing this into a function
//that will find the dog by id
          findDog(event.target.getAttribute("data-id"))

      }
    }
  )

//---------------Step 14 (cont.)---------------//
//Find the form on the Dom
//add event listener to it
//submit event
    document.getElementById('dog-form').addEventListener('submit', submitForm)

})

  //----------------Step 6---------------------------.//
  //Create updateDogTable function
  function updateDogTable(dog){
  //------------Step 7 --------------//
  //Find Table Again

  let tableBody = document.getElementById('table-body')
  //------------step 8-----------------//
  //Set inner HTMl = to each dog element you will Create
  //in callback function. += to add to table!
  //pass in each dog element to show dog page
  tableBody.innerHTML += showDog(dog)
  }
  //----------------Step 9------------//
  //Create showDog function
  //Will Create each dog html element
    function showDog(data){
  //-------------Step 10--------------//
  //Gave the button a data-id of the dogs id//
  // This is so when the dog button is pressed
  //I can keep track of which dog it was
  //Gave the button a class name
  //This is so I can find it by className
  //within the parent element where my
  //event listener will be
  //MAKE SURE YOU RETURN
      return  `<tr>
        <td>${data.name}</td>
        <td>${data.breed}</td>
        <td>${data.sex}</td>
        <td><button data-id=${data.id} class="dog-butn" >Edit</button>
        </td></tr>`
      }
//-------------Step 11-----------------//
//Go back to DOMContentLoaded!
//create event listener for the button in
//Dom content Lodaded!!
//------------GO TO DOMContentLoaded---------------//
//-------------Step 12----------------------//
//Find the dog that the button was for
function findDog(id){
//Have to do a new Fetch for dogs specific show page
//replace :id with the id of the selected dogs
fetch(`http://localhost:3000/dogs/${id}`)
  .then(res => res.json())
// Send specific dog data to another function
//that will populate the edit form
  .then(data => populateEditForm(data))
}
//--------------------Step 13--------------//
//Populate the Edit Form with the
// selected dog data
function populateEditForm(dog){
// find each input box on the dom
//set their values = to the selected dogs
document.querySelector(".name").value = dog.name
document.querySelector(".breed").value = dog.breed
document.querySelector(".sex").value = dog.sex
// set hidden doggie-id input = to dog.id
//this is so we have access to it in submitForm
document.querySelector("#doggie-id").value = dog.id

}
//----------------Step 14--------------------//
//Create addEventListener on submit Form
//!!IN DOMContentLoaded!!!
//-------------------------------------------//

//------------------Step 15------------------//
  function submitForm(e){
    let tableBody = document.getElementById('table-body')
//Submit Reloads the page
    e.preventDefault()
//Need to apply hidden value to the form
//this is so you can pull the id of the selected dog
//Get the edited values in the text box
    dogName = document.querySelector(".name").value
    dogBreed = document.querySelector(".breed").value
    dogSex = document.querySelector(".sex").value
//Make a patch Fetch
// replace :id with
//id from the hidden form value
    fetch(`http://localhost:3000/dogs/${e.target.querySelector("#doggie-id").value}`, {
      method: 'PATCH',
      body: JSON.stringify({name: dogName, breed: dogBreed, sex: dogSex}),
      headers: {'Content-Type': 'application/json'},
    })
        .then(res => res.json())
        .then(data => getUpdatedDogs(data))
//This Updates the database but not the Dom
//We must erase the Dom table and reput it with the new Updates


  }

function getUpdatedDogs(){
  let tableBody = document.getElementById('table-body')

  fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(data => data.forEach(function(data){
      updateDogTable(data)
  }))
  tableBody.innerHTML = " "
}
