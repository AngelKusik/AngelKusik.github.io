/**
 * @author Angelica Kusik
 * @version 1.2.0
 * @since January 12, 2023
 * @description WEBD6201 in class demonstrations
 * 
 */

var welcomeLabel = document.getElementById("welcome")
var displayEvent = document.getElementById("displayEvent")

var userDisplay = document.getElementById("userDisplay");
var passDisplay = document.getElementById("passDisplay");


// welcomeLabel.addEventListener("dblclick", function () {
//     console.log("Event: double click");
//     displayEvent.textContent = "Event: double click";
// });

// welcomeLabel.addEventListener("mouseover", function () {
//     console.log("Event: click");
//     displayEvent.textContent = "Event: mouseover";
// });

// welcomeLabel.addEventListener("mouseout", function () {
//     console.log("Event: click");
//     displayEvent.textContent = "Event: mouseout";
// });

// function validateForm() {
//     let x = document.forms["myForm"]["username"].value;
//     let y = document.forms["myForm"]["password"].value;
//     if (x == "") {
//         alert("Name must be filled out");
//         return false;
//     } else {
//         console.log(`Username: ${ x } \n Password: ${ y }`)
//         userDisplay.textContent = x;
//         passDisplay.textContent = y;
//         return false;
//     }
// }

function validateForm() {
    let x = document.forms["contactForm"]["userName"].value;
    let y = document.forms["myForm"]["password"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    } else {
        console.log(`Username: ${ x } \n Password: ${ y }`)
        userDisplay.textContent = x; userDisplay.textContext = x; //-> the second one here was my original line and it didn't work until I replaced it ??????
        passDisplay.textContent = y;
        return false;
    }
}

