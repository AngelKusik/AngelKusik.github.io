

(function () {


//Validates the information entered on the Contact Me form 
function ContactMeFormValidate(){

    //For the name: First letter must be capitalized, minimum 2 characters, must enter at least first name,
    //middle name and last name are optional, names must be separated by a space. No numbers allowed.
    let namePattern =  /^([A-Z][a-z]{1,24}( [A-Z][a-z]{1,24}){0,2})$/g
    //Email pattern: Must enter at least two characters before @. Must have an @ and 1-24 letters, digits, hyphen or dots
    //after @. Must have a dot before the domain and domain must be at least 2 letters long.
    let emailPattern = /^([\w.-]{2,})+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g 
    // Subject Pattern: Accepts letters, whitespace and digits. Cannot be longer than 100 characters.
    let subjectPatter = /^[a-zA-Z0-9\s]{1,100}$/g
    // Message pattern: Message cannot be longer than 300 characters.
    let messagePattern = /^.{0,300}$/
  
    ValidateInput("userName", fullNamePattern, "Please enter a valid username. Username must have first letter capitalized.")
    ValidateInput("password", loginPasswordPattern, "Please enter a valid Password with at least 6 characters.")
  }


// FOOTER
//Dinamically getting the value of "year" for the footer
$('#year').text(new Date().getFullYear());

})()