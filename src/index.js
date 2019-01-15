window.onload = function() {
    let editForm = document.getElementById('dog-form')
    editForm[0].value = ''
    editForm[1].value = ''
    editForm[2].value = ''
    }

function replaceDogDisplay(dog){
    let dogRowToChange = document.querySelector(`tr[data-id="${dog.id}"]`)
    console.log(dogRowToChange)
    dogRowToChange.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td>
    <td>${dog.sex}</td> <td><button class="dog-edit-buttons" data-id="${dog.id}">Edit</button></td>`
}


function createDogDisplays(dogs){
    let table = document.getElementById("table-body")
    dogs.forEach(dog => {
        createDogDisplay(dog, table)
    })
}

function createDogDisplay(dog, table){
    let dogTableRow = document.createElement("tr")
    dogTableRow.dataset.id = dog.id
    dogTableRow.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td>
    <td>${dog.sex}</td> <td><button class="dog-edit-buttons" data-id="${dog.id}">Edit</button></td>`
    table.appendChild(dogTableRow)
}

function populateEditForm(dogs, dogId){
    let thisDog
    dogs.forEach(dog => {
        if (dog.id == dogId){
            thisDog = dog
        }
    })
    let editForm = document.getElementById('dog-form')
    editForm[0].value = thisDog.name
    editForm[1].value = thisDog.breed
    editForm[2].value = thisDog.sex
    editForm.dataset.dogId = thisDog.id
}


document.addEventListener('DOMContentLoaded', () => {
    let table = document.getElementById("table-body")
    table.addEventListener("click", function(e){
        if (e.target.className === "dog-edit-buttons"){
            dogId = e.target.dataset.id
            fetch(" http://localhost:3000/dogs")
            .then(res => res.json())
            .then(dogs => populateEditForm(dogs, dogId))
        }
    })

    let editForm = document.getElementById('dog-form')
    editForm.addEventListener('submit', function(e){
        e.preventDefault()
        dogId = e.target.dataset.dogId
        let theDog = {
        name : e.target[0].value,
        breed : e.target[1].value,
        sex : e.target[2].value,
        }
        fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(theDog)
        }).then(res => res.json())
        .then(dog => replaceDogDisplay(dog))
    })



    fetch(" http://localhost:3000/dogs")
    .then(res => res.json())
    .then(dogs => createDogDisplays(dogs))
})
