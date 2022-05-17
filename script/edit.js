'use strict';

//add style for Sidebar
const Sidebar = document.getElementById("sidebar");
Sidebar.addEventListener("click", function(){
    Sidebar.classList.toggle("active");
})

//Set input variable and table element
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const fromEdit = document.getElementById("container-form");
const petArr = [];

//get data from localStorage
const breedArr = [];
if (typeof(Storage) !== "undefined") {
  const petObj = getFromStorage ("petArr");
  const breedObj = getFromStorage("breedArr");
  if(petObj !== null){
    for(let i = 0; i < petObj.length; i++){
      petArr.push(petObj[i]);
    }
  }else console.log("local storage none pet data, please input pet data!");
  if(breedObj !== null){  
    for(let i = 0; i < breedObj.length; i++){
      breedArr.push(breedObj[i]);
    }
  }else console.log("local storage none breed data, please input breed data from breed page!");
  
  renderTableData(petArr);
  }else console.log("Sorry! No Web Storage support.."); 

//render breed
function renderBreed(breedArr, typeValue){
    breedInput.innerHTML = "<option>Select Breed</option>";
  
    const breedOfType = breedArr.filter(breed => breed.type == typeValue);
    for(let i = 0; i < breedOfType.length; i++){
      const option = document.createElement("option");
      option.innerHTML = `<option>${breedOfType[i].breedName}</option>`;
      breedInput.appendChild(option);
    }
  }
  
  //Call renderBreed function if select value of Type
  typeInput.addEventListener("change", function(){
    renderBreed(breedArr, typeInput.value);
  });

// check status  vaccinated, dewormed, sterilized of pet function
function checkTF(e) {
    let checkT = `<i class="bi bi-check-circle-fill"></i>`;
    let checkF = `<i class="bi bi-x-circle-fill"></i>`;
    if (e) return checkT;
    else return checkF;
  }

//render table from pet array data funtion
function renderTableData(petArr) {
    //remove default table
    tableBodyEl.innerHTML = "";
  
    for (let i = 0; i < petArr.length; i++) {
      const row = document.createElement("tr");
      row.innerHTML = `<th>${petArr[i].id}</th>
      <td>${petArr[i].name}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight} kg</td>
      <td>${petArr[i].length} cm</td>
      <td>${petArr[i].breed}</td>
      <td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td>
      <td>${checkTF(petArr[i].vaccinated)}</td>
      <td>${checkTF(petArr[i].dewormed)}</td>
      <td>${checkTF(petArr[i].sterilized)}</td>
      <td>${petArr[i].date}</td>
      <td><button type="button" class="btn btn-warning">Edit</button></td>`;
      tableBodyEl.appendChild(row);
    }
    
    // Edit buttons event
    // Call getPetid function and EditPet function
    const btnEdit = document.querySelectorAll(".btn-warning");
    for (let i = 0; i < btnEdit.length; i++) {
      btnEdit[i].addEventListener("click", function () {

        //Edit form
        fromEdit.classList.remove("hide");
        renderBreed(breedArr, petArr[i].type);

        //Enter object data into the form 
        for (let i = 0; i < petArr.length; i++) {
          if (getPetId(this) === petArr[i].id) {
            idInput.value = petArr[i].id;
            nameInput.value = petArr[i].name;
            ageInput.value = petArr[i].age;
            typeInput.value = petArr[i].type;
            weightInput.value = petArr[i].weight;
            lengthInput.value = petArr[i].length;
            colorInput.value = petArr[i].color;
            breedInput.value = petArr[i].breed;
            checkState(petArr[i].vaccinated, vaccinatedInput);
            checkState(petArr[i].dewormed, dewormedInput);
            checkState(petArr[i].sterilized, sterilizedInput);
          }}
      })
    }

  }

  //get id of pet and delete pet in pet array funtion
function getPetId(th) {
    let thValue = th.parentNode.parentNode.querySelector("th").innerHTML;
    return thValue;
  }

function editPet(petId) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr[i].name = nameInput.value;
        petArr[i].age = ageInput.value;
        petArr[i].type = typeInput.value;
        petArr[i].weight = weightInput.value;
        petArr[i].length = lengthInput.value;
        petArr[i].color = colorInput.value;
        petArr[i].breed = breedInput.value;
        petArr[i].vaccinated = vaccinatedInput.checked;
        petArr[i].dewormed = dewormedInput.checked;
        petArr[i].sterilized = sterilizedInput.checked;
        saveToStorage("petArr", petArr);
        return true;
      }
    }
  }

//Check object state function
function checkState(stateValue, stateOutPut){
  if(stateValue) stateOutPut.setAttribute("checked","") ;
  else stateOutPut.removeAttribute("checked","");
}

// validate function
// if validate success input data in pet array, rendertable and remove form
function Validate(
  idInput,
  nameInput,
  ageInput,
  typeInput,
  weightInput,
  lengthInput,
  breedInput,
) {
  if (idInput.value !== "") {
    if (nameInput.value !== "") {
      if (Number(ageInput.value) > 0 && Number(ageInput.value) < 16) {
        if (typeInput.value !== "Select Type") {
          if (Number(weightInput.value) > 0 && Number(weightInput.value) < 16) {
            if (
              Number(lengthInput.value) > 0 &&
              Number(lengthInput.value) < 101
            ) {
              if (breedInput.value !== "Select Breed") {
                if (editPet(idInput.value)) {
                  fromEdit.classList.add("hide");
                  renderTableData(petArr);
                  
                }
              } else alert("Please select Breed!");
            } else alert("Lenghth must be between 1 and 100!");
          } else alert("Weight must be between 1 and 15!");
        } else alert("Please select Type!");
      } else alert("Age must be between 1 and 15!");
    } else alert("Please input for Pet Name");
  } else alert("Please input for Pet Id");
}

//Submit event
submitBtn.addEventListener("click", function () {
  Validate(idInput,nameInput,ageInput,typeInput,weightInput,lengthInput,breedInput);
})

console.log(petArr);