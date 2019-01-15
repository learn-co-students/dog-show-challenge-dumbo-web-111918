document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector("tbody");

    
    table.addEventListener("click", function(event) {
        let name = document.getElementById("name-input");
        let breed = document.getElementById("breed-input");
        let sex = document.getElementById("sex-input");
        let dogName = event.target.parentNode.parentNode.querySelector(".table-name").innerText;
        let dogBreed = event.target.parentNode.parentNode.querySelector(".table-breed").innerText;
        let dogSex = event.target.parentNode.parentNode.querySelector(".table-sex").innerText;
        id = event.target.parentNode.parentNode.dataset.id;
        if (event.target.classList.contains("btn")) {
            name.value = dogName;
            breed.value = dogBreed;
            sex.value = dogSex;
        }
    })

    const dogForm = document.getElementById("dog-form");
    dogForm.addEventListener("submit", function(event) {
        let newName = document.getElementById("name-input");
        let newBreed = document.getElementById("breed-input");
        let newSex = document.getElementById("sex-input");
        let updatedValue = document.querySelector('[data-id = "' + id + '"]').querySelector(".table-name").innerText = newName.value;
        let updatedBreed = document.querySelector('[data-id = "' + id + '"]').querySelector(".table-breed").innerText = newBreed.value;
        let updatedSex = document.querySelector('[data-id = "' + id + '"]').querySelector(".table-sex").innerText = newSex.value;
    
        console.log(updatedValue, updatedBreed, updatedSex);
        event.preventDefault();
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                name: newName.value,
                breed: newBreed.value,
                sex: newSex.value
            })
        })
    })
})


fetch("http://localhost:3000/dogs") 
.then(function(object) {
    return object.json();
}).then(function(parsedObject) {
   return createDog(parsedObject);
})

let createDog = function(obj) {
    table = document.querySelector("tbody")
    obj.forEach(function(dog) {
        let row = document.createElement("tr")
        row.setAttribute("data-id", `${dog.id}`)
        row.innerHTML = `<td data-id="${dog.id}" class="table-name"> ${dog.name} </td>
            <td data-id="${dog.id}" class="table-breed">${dog.breed}</td>
            <td data-id="${dog.id}" class="table-sex">${dog.sex}</td>
            <td> <button class="btn"> Edit me </button> </td>`
        table.append(row);
    })
}



    
    