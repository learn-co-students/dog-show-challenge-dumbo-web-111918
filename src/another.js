document.addEventListener('DOMContentLoaded', () =>{
  const tableBody = document.querySelector("#table-body")
    fetch("http://localhost:3000/dogs")
      .then(res => res.json())
      .then(data => data.forEach(function(dog){addDogtoTable(dog)}))

    tableBody.addEventListener('click', function(event){
        // debugger
        if (event.target.className.includes("butn")){
          findDog(event.target.getAttribute("data-id"))
          }
    })

    document.querySelector("#dog-form").addEventListener("submit", updateDog)

})


  function showDog(dog){
    return `<tr>
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><button data-id= ${dog.id} class ="butn">Edit</button>
      </td></tr>`
    }

    function addDogtoTable(dog){

      let tableBody = document.querySelector("#table-body")
      tableBody.innerHTML += showDog(dog)
    }

    function findDog(id){
      fetch(`http://localhost:3000/dogs/${id}`)
        .then(res => res.json())
        .then(data => editDogForm(data))
     // debugger
    }

    function editDogForm(dog){
      // debugger
      document.querySelector(".name").value = dog.name
      document.querySelector(".breed").value = dog.breed
      document.querySelector(".sex").value = dog.sex
      document.getElementById('dog-id').value = dog.id

    }

      function updateDog(event){
        event.preventDefault()
        const nameSF = document.querySelector(".name").value
        const breedSF = document.querySelector(".breed").value
        const sexSF = document.querySelector(".sex").value
        const dogID =   document.getElementById('dog-id').value
        // debugger
        const puppie = {
          nameSF, breedSF, sexSF
          }

        fetch(`http://localhost:3000/dogs/${document.getElementById('dog-id').value}`, {
           method: "PATCH",
           headers: {
               "Content-Type": "application/json",
               "Cookie": "HI MOM"
             },
             body: JSON.stringify({name: nameSF, breed: breedSF, sex: sexSF})
        }).then(res => res.json())
        .then( data =>updatePage(data))
        // debugger

      }

      function updatePage(data){
        // debugger
        const tableBody = document.querySelector("#table-body")
        // tableBody.innerHTMl = " "
        // debugger
        fetch(`http://localhost:3000/dogs`)
          .then(res => res.json())
          .then(data => data.forEach(function(dog){updateDogtoTable(dog)}))
          tableBody.innerHTML = " "
      }

      function updateDogtoTable(dogs){
// debugger
          let tableBody = document.querySelector("#table-body")

          // debugger
          tableBody.innerHTML += showDog(dogs)

      }
