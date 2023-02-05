/**
 * @author Angelica Kusik
 * @version 1.2.0
 * @since January 12, 2023
 * @description WEBD6201 in class demonstrations
 * 
 */

(function () {

    function DisplayButton() {

        let randomButton = document.getElementById("RandonButton")
        randomButton.addEventListener("click", function() {
            //console.log("button was clicked")
            //Location.href = '../webd6201-in-class-demo/projects.html' => this doesn't work!
            window.location.href = "projects.html";
        })

        let mainContent = document.getElementsByTagName("main")[0] //get methods return an array
        mainContent.setAttribute("class", "container")


        let mainParagraph = document.createElement("p")
        mainParagraph.setAttribute("id", "MainParagraph")
        mainParagraph.setAttribute("class", "mt-3 container")

        //Concatenation vs Interpolation examples:
        // concatenation - '1' + '2' + '3'
        // interpolation - `${var_1}`
        //The first join the strings, the second interprets a string with variables
        let firstString = "This is a "
        let secondString = `${ firstString } main paragraph that we added through javascript`
        mainParagraph.textContent = secondString

        //must use this in order for the element we created to appear on the page
        mainContent.before(mainParagraph)

        mainContent.appendChild(mainParagraph) 
        //mainContent.before(mainParagraph) 

        //delete element
        //document.getElementById("RandomButton").remove()

        //document.getElementById("RandomButton").remove()
        
        //textContent - changes text node
        //innerHTML - overwrites anything in the innerHTML of that element
        //Note: Must use a back-ticks (`)
        // document.innerHTML = `
        //     <div class="container">
        //         <h1 class="display-1">Hello WEBD 6201</h1>
        //         <p class="mt-5 lead">and .. what do you this</p>
        //     </div>
        // `
        //if we use document.textContent it will work but not the way we want, it will just 
        //show an empty page with the code below shown as a string.

        let sohaib = new Contact("Sohaib Mohiuddin", "12345678", "sohaib@sohaib")

        console.log(sohaib.toString())


    }

    function Start() {
        console.log("App Started!")

        var x = 'Webd6201';

        switch(document.title) {
            case "Home - WEBD 6201 Demo":
              DisplayButton()
              break;
            case "Projects - WEBD 6201 Demo":
                DisplayButton()
              break;
            default:
              // code block
          } 
    }
    
    window.addEventListener("load", Start)
})()


