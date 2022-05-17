'use strict';

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
const petArr = [];

// input arr function, if success return true
function inputArr(
  idInput,
  nameInput,
  ageInput,
  typeInput,
  weightInput,
  lengthInput,
  colorInput,
  breedInput,
  vaccinatedInput,
  dewormedInput,
  sterilizedInput
) {
  let d = new Date();
  const data = {
    id: idInput,
    name: nameInput,
    age: Number(ageInput),
    type: typeInput,
    weight: Number(weightInput),
    length: Number(lengthInput),
    color: colorInput,
    breed: breedInput,
    vaccinated: vaccinatedInput,
    dewormed: dewormedInput,
    sterilized: sterilizedInput,
    BMI: "?",
    date: `${("0" + d.getDate()).slice(-2)}/${("0" + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`,
  };
  petArr.push(data);
  console.log(petArr);
  return true;
}

// check id of pet function
function checkID(idValue, petArr) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === idValue) {
      return true;
    }
  }
}

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
    <td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td>
    <td>${petArr[i].breed}</td>
    <td>${checkTF(petArr[i].vaccinated)}</td>
    <td>${checkTF(petArr[i].dewormed)}</td>
    <td>${checkTF(petArr[i].sterilized)}</td>
    <td>${petArr[i].BMI}</td>
    <td>${petArr[i].date}</td>
    <td><button type="button" class="btn btn-danger">Delete</button></td>`;
    tableBodyEl.appendChild(row);
  }
  
  //Delete buttons event
  //Call getPetid function and deletePet function
  const btndelete = document.querySelectorAll(".btn-danger");
  for (let i = 0; i < btndelete.length; i++) {
    btndelete[i].addEventListener("click", function () {
      if (confirm("Are you sure?")) {
        deletePet(getPetId(this));
      }
    });
  }
}

//get id of pet and delete pet in pet array funtion
function getPetId(th) {
  let thValue = th.parentNode.parentNode.querySelector("th").innerHTML;
  return thValue;
}
function deletePet(petId) {
  for (let i = 0; i < petArr.length; i++) {
    if (petId === petArr[i].id) {
      petArr.splice(i, 1);
      saveToStorage("petArr",petArr);
      renderTableData(petArr);
    }
  }
}

//remove form function
function removeForm() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
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
  colorInput,
  breedInput,
  vaccinatedInput,
  dewormedInput,
  sterilizedInput
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
                if (
                  inputArr(
                    idInput.value,
                    nameInput.value,
                    ageInput.value,
                    typeInput.value,
                    weightInput.value,
                    lengthInput.value,
                    colorInput.value,
                    breedInput.value,
                    vaccinatedInput.checked,
                    dewormedInput.checked,
                    sterilizedInput.checked
                  )
                ) {
                  saveToStorage("petArr",petArr);
                  renderTableData(petArr);
                  removeForm();
                }
              } else alert(`Please select Breed! or You need input breed for the pet type in "breed page" before inputing the pet information.`);
            } else alert("Lenghth must be between 1 and 100!");
          } else alert("Weight must be between 1 and 15!");
        } else alert("Please select Type!");
      } else alert("Age must be between 1 and 15!");
    } else alert("Please input for Pet Name");
  } else alert("Please input for Pet Id");
}

//click event of submit button
submitBtn.addEventListener("click", function () {
  if (petArr.length == 0) {
    Validate(
      idInput,
      nameInput,
      ageInput,
      typeInput,
      weightInput,
      lengthInput,
      colorInput,
      breedInput,
      vaccinatedInput,
      dewormedInput,
      sterilizedInput
    );
  } else if (checkID(idInput.value, petArr)) {
    alert("ID must unique!");
  } else
    Validate(
      idInput,
      nameInput,
      ageInput,
      typeInput,
      weightInput,
      lengthInput,
      colorInput,
      breedInput,
      vaccinatedInput,
      dewormedInput,
      sterilizedInput
    );
});

//select Show healthy pet button and set status of button
const btnHealthy = document.getElementById("healthy-btn");
const petHealthyArr = [];
let healthyCheck = false;

//Show healthy pet button event
btnHealthy.addEventListener("click", function () {
  if (!healthyCheck) {
    for (let i = 0; i < petArr.length; i++)
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        if (checkID(petArr[i].id, petHealthyArr)) {
        } else {
          petHealthyArr.push(petArr[i]);
        }
      }
    btnHealthy.textContent = "Show All Pet";
    healthyCheck = true;
    renderTableData(petHealthyArr);
  } else {
    btnHealthy.textContent = "Show Healthy Pet";
    healthyCheck = false;
    renderTableData(petArr);
  }
});

//Add BMI column
const tableElement = document.querySelector(".table-striped");
const tr = tableElement.children[0].children[0];
tr.insertCell(11).outerHTML = "<th>BMI</th>";
// tableBodyEl.children[0].insertCell(11).outerHTML = "<td>?</td>";
// tableBodyEl.children[1].insertCell(11).outerHTML = "<td>?</td>";
//Add Calculate BMI button
let CalcBMIBtn = document.createElement("button");
CalcBMIBtn.type = "button";
CalcBMIBtn.className = "btn btn-warning";
CalcBMIBtn.id = "calcBMI-btn";
CalcBMIBtn.innerHTML = "Calculate BMI";
submitBtn.parentNode.appendChild(CalcBMIBtn);

// select calculate BMI button
const calcBMI = document.getElementById("calcBMI-btn");
// calculate BMI of pet function
function calculateBMI(pet) {
  let BMI;
  if (pet.type === "Dog") {
    BMI = (pet.weight * 703) / (pet.length * pet.length);
  } else {
    BMI = (pet.weight * 886) / (pet.length * pet.length);
  }
  pet.BMI = BMI.toFixed(2);
}

//calculate button event
calcBMI.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    calculateBMI(petArr[i]);
  }
  renderTableData(petArr);
});

//add style for Sidebar
const Sidebar = document.getElementById("sidebar");
Sidebar.addEventListener("click", function(){
    Sidebar.classList.toggle("active");
})

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

console.log(localStorage);