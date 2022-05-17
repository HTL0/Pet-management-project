'use strict';
//add style for Sidebar
const Sidebar = document.getElementById("sidebar");
Sidebar.addEventListener("click", function(){
    Sidebar.classList.toggle("active");
})


const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const petArr = [];
const breedArr = [];

////get data from localStorage
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
    
    }else console.log("Sorry! No Web Storage support..");

//input breed into the form
for(let i = 0; i < breedArr.length; i++){
    const option = document.createElement("option");
    option.innerHTML = `<option>${breedArr[i].breedName}</option>`;
    breedInput.appendChild(option);
}

// check status  vaccinated, dewormed, sterilized of pet function
function checkTF(e) {
    let checkT = `<i class="bi bi-check-circle-fill"></i>`;
    let checkF = `<i class="bi bi-x-circle-fill"></i>`;
    if (e) return checkT;
    else return checkF;
  }

//render table from search data
function renderTableData(petArr) {
    //reset table
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
      <td>${petArr[i].date}</td>`
      tableBodyEl.appendChild(row);
}}

//render table and create finded result arry
renderTableData(petArr);
const findArr = [];

function findfunc(idInput, nameInput, typeInput, breedInput, vaccinatedInput, dewormedInput, sterilizedInput){
    //clear findArr
    findArr.splice(0, findArr.length);


    for(let i = 0; i < petArr.length; i++){
        if(((idInput.value !== "") && (petArr[i].id.includes(idInput.value))
        || ((nameInput.value !== "") && (petArr[i].name.includes(nameInput.value))))){
            if(!(findArr.includes(petArr[i]))) findArr.push(petArr[i]); 
        }
        if((typeInput.value !== "Select Type" && breedInput.value !== "Select Breed")){
            if(((typeInput.value === petArr[i].type) && (breedInput.value === petArr[i].breed))){
                if(!(findArr.includes(petArr[i]))) findArr.push(petArr[i]);
            }
        }
        if(typeInput.value !== "Select Type" && breedInput.value == "Select Breed"){
            if(typeInput.value === petArr[i].type){
                if(!(findArr.includes(petArr[i]))) findArr.push(petArr[i]);
            }
        }
        if(typeInput.value == "Select Type" && breedInput.value !== "Select Breed"){
            if(breedInput.value === petArr[i].breed) {
                if(!(findArr.includes(petArr[i]))) findArr.push(petArr[i]);
            }
        } 
        if ((typeInput.value == "Select Type" && breedInput.value == "Select Breed") || (vaccinatedInput.checked == true || dewormedInput.checked == true || sterilizedInput.checked == true)){
            if(((vaccinatedInput.checked == petArr[i].vaccinated)
                && (dewormedInput.checked == petArr[i].dewormed)
                && (sterilizedInput.checked == petArr[i].sterilized))){
                    if(!(findArr.includes(petArr[i]))) findArr.push(petArr[i]);
                }
            }
        
    }
    if(findArr.length === 0) alert("No matching find results");
}

//find button event
findBtn.addEventListener("click", function(){
    findfunc(idInput, nameInput, typeInput, breedInput, vaccinatedInput, dewormedInput, sterilizedInput);
    renderTableData(findArr);
})

console.log(breedArr);
console.log(petArr);
