'use strict';
//add style for Sidebar
const Sidebar = document.getElementById("sidebar");
Sidebar.addEventListener("click", function(){
    Sidebar.classList.toggle("active");
})


const breedArr = [];
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
const breedSub = document.getElementById("submit-btn");
const tableBodyBreed = document.getElementById("tbody");

//input obj breed 
function inputArrBreed (inputBreed, inputType){
    const breed = {
        num : breedArr.length + 1,
        breedName: inputBreed,
        type: inputType,
    }
    breedArr.push(breed);
}

//check input breed of value, call inputArr and render table. 
function validateBreed (inputBreed, inputType){
    if(inputBreed == ""){
        alert("Please input Breed Name !");
    }else if(inputType == "Select Type"){
        alert("Please select Type Breed !");
    }
    else{
        inputArrBreed(inputBreed,inputType);
        renderTableBreed(breedArr);
        removeFormBreed();

}}
//check breed function
function checkBreed(breedValue, typeValue, breedArr){
    for(let i = 0; i < breedArr.length; i++){
        if(breedArr[i].breedName === breedValue){
            if(breedArr[i].type === typeValue){
            return true;}  
        } 
    }
}

//remove form after submited
function removeFormBreed(){
    inputBreed.value = "";
    inputType.value = "Select Type";
}



//render table function
function renderTableBreed (breedArr){
    tableBodyBreed.innerHTML = "";
    for(let i = 0; i < breedArr.length; i++){
        const rowB = document.createElement("tr");
        rowB.innerHTML = `<th>${breedArr[i].num}</th>
        <td>${breedArr[i].breedName}</td>
        <td>${breedArr[i].type}</td>
        <td><button type="button" class="btn btn-danger">Delete</button></td>`;
        tableBodyBreed.appendChild(rowB);
    }

    //Delete
    const btndelete = document.querySelectorAll(".btn-danger");
    for (let i = 0; i < btndelete.length; i++) {
    btndelete[i].addEventListener("click", function () {
      if (confirm("Are you sure?")) {
        deleteBreed(getBreedIndex(this));
      }
    });
  }
}

//get id of pet and delete pet in pet array funtion
function getBreedIndex(th) {
    let thValue = th.parentNode.parentNode.querySelector("th").innerHTML;
    return thValue;
  }
  function deleteBreed(breedIndex) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breedIndex == breedArr[i].num) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        renderTableBreed(breedArr);
        console.log(breedArr);
      }
    }
  }



//submit button even
breedSub.addEventListener("click", function(){
    if(checkBreed(inputBreed.value, inputType.value, breedArr)){
        alert("Breed Name must unique !")
    }else{
    validateBreed(inputBreed.value, inputType.value);
    saveToStorage("breedArr", breedArr);
    console.log(breedArr);}
})

//get data from localStorage
if (typeof(Storage) !== "undefined") {
    const breedObj = getFromStorage("breedArr");
    if(breedObj !== null){  
      for(let i = 0; i < breedObj.length; i++){
        breedArr.push(breedObj[i]);
      }
    }else console.log("local storage none breed data, please input breed data!");

      renderTableBreed(breedArr);
    }else console.log("Sorry! No Web Storage support.."); 


// localStorage.clear();
console.log(breedArr);
console.log(localStorage);
