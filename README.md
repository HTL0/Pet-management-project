# Pet-magerment-project

### 👋 Hi, I’m LONG

- This is Pet-management-Website 2, is a more complete version of Pet-management-Website 1.
- This project using HTML,CSS,JAVASCRIPT
- This project has the following features:
### You can use Pets.json file, import file in data page and test.

## Implementation details
### 1.validate information pet
- No fields were entered with missing data.
- The ID value cannot match the rest of the pets
- The Age field can only enter a value between 1 and 15
- The Weight field can only enter a value between 1 and 15
- The Length field can only enter a value between 1 and 100
- Required to select a value for the Type field
- Required to select a value for the Breed field
### 2.Add pet
- Create a global variable named petArr
- When passing the validation step, if there is no error, the pet will be added to the petArr
- if there is an error then you will show it to the user
### 3.Show Healthy Pet
- Need to create a variable used to check if currently showing all pets or just healthy pets.
- Catch event click on Show All Pet/Show Healthy Pet
- Handle event to change button and healthyCheck variable.
- Reassign the healthyPetArr array using the JS filter function if healthyCheck = true.
- Call renderTableData takes as a parameter healthyPetArr, this function will then delete the entire contents of the table, and proceed to create new rows corresponding to each pet.
### 4.Calculate BMI of Pet
- The formula for calculating BMI for dogs is: BMI = (weight * 703) / length ** 2. for cats is: BMI = (weight * 886) / length ** 2
- After clicking the "Calculate BMI" button, this BMI is calculated and displayed to the user. BMI values will be rounded to 2 decimal places.
### 5.Delete pet
- Before deleting, need to confirm with the user whether they really want to delete
- The deletePet function will receive the ID of the pet you want to delete. Then you just need to remove the data with the corresponding ID out of the petArr array
- Then reload the table by calling renderTableData
### 6.Breed magerment
- The list of Breeds is stored in LocalStorage. Each Breed will have: Breed name, Breed belongs to which species (Dog or Cat). Breeds can be added/removed. Similar to pet
- Validate 2 fields(name, type) that cannot be left blank, add object to breedArr.
### 7.Edit pet information
- When clicking Edit a pet, will display an additional Form to edit, the input values will be the current value of that pet:
- Create a function startEditPet with the input parameter petId to edit. This function will be called when the user clicks the "Edit" button. This function will perform pet information search based on the input petId and display the form
- In the Edit form, it is necessary to display Breed corresponding to the Type of the pet being edited. If the user changes the Type, the corresponding Breed will be displayed again. The ID field cannot be edited, as it is a field to distinguish pets.
### 8.Searching
- using AND operator
- Need to display the full value of the Breed field, regardless of Dog or Cat.
- If the ID field is entered, show the pets whose ID contains the entered ID. Same goes for the Name field
- If the Name field is entered, the pets whose names contain the entered characters will be displayed
- If the Type field is set to the value (Cat or Dog), the pets with the corresponding Type are displayed. Same with Breed School.
- If the Vaccinated field is checked, show vaccinated pets. Same with Dewormed and Sterilized.
- Find a pet that meets all of the above criteria, but not one of them.
### 9.Import and Export Json file.
- Clicking the "Export Data" button will create a JSON file containing the data of all existing pets
- Use the JSON.stringify function to convert data in the form of a Javascript Object to JSON. Then save it to the user's computer
- Users can also select a file and import its data into the system. The uploaded file must have the same structure as the JSON file when we export.
- Use JSON.parse() to convert JSON data to a Javascript Object and save it to LocalStorage.

