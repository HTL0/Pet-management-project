'use strict';
//add style for Sidebar
const Sidebar = document.getElementById("sidebar");
Sidebar.addEventListener("click", function(){
    Sidebar.classList.toggle("active");
})

const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const petArr = [];
const breedArr = [];

//get data from localStorage
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

//Save file function
function saveStaticDataToFile() {
    const fileSave = new Blob([JSON.stringify(petArr, null, ' ')],
        { type: "text/plain;charset=utf-8" });
    saveAs(fileSave, "Pets.json");
}

//export button even
exportBtn.addEventListener("click", function(){
    saveStaticDataToFile();
})


//import button event
importBtn.addEventListener("click", function(){
    
    const file = document.getElementById("input-file").files[0];
//     if(file){
//         const reader = new FileReader();
//         reader.readAsText(file);
//         reader.onload = function(result){
//             petArr.splice(0, petArr.length);
//             const objs = JSON.parse(result.target.result);
//             for(let i = 0; i < objs.length; i++){
//                 petArr.push(objs[i]);
//             }
            
//             saveToStorage("petArr", petArr);
//             alert("impost completed.")
//             console.log(petArr);
//         }
//         reader.onerror = function (result) {
//             alert("error reading file"); 
//         }
//     }


//Use promise for fileReader
    console.log(processFile(file));
    processFile(file).then(data => {
      petArr.splice(0, petArr.length);
      for(let i = 0; i < data.length; i++){
        petArr.push(data[i]);
      }
      saveToStorage("petArr", petArr);
      alert("impost completed.");
      console.log(petArr);
    }, reason =>{
      console.log("error reading file");
    })
    
})

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
  
      reader.onload = () => {
        resolve(JSON.parse(reader.result));
      };
  
      reader.onerror = reject;
  
      reader.readAsText(file);
    })
}
  
async function processFile(file) {
    try {
      const data = await readFileAsync(file);
      return data;
    } catch(err) {
      console.log(err);
    }
}

console.log(petArr);
console.log(breedArr);


