/**
 * @author Angelica Kusik
 * @version 6.0.0
 * @since January 12, 2023
 * @description WEBD6201 in class demonstrations
 * 
 */

(function () {

  function DisplayHome() {

    //Least amount of memory heap
    //let randonButton = document.getElementById("randonButton")
    // randomButton.addEventListener("click", function() {
    //     //console.log("button was clicked")
    //     //Location.href = '../webd6201-in-class-demo/projects.html' => this doesn't work!
    //     window.location.href = "projects.html";
    // })

    //Most amount of memory heap
    $("#randomButton").on("click", function () {
      window.location.href = "contact.html";
    })


    //Second most amount of memory heap - JS QuerySelectorAll
    // document.querySelectorAll("#randomButton").forEach(element => {
    //   element.addEventListener("click", () => {

    //     location.href = "contact.html";
    //   })
    // })


    // let mainContent = document.getElementsByTagName("main")[0] //get methods return an array
    // mainContent.setAttribute("class", "container")


    // let mainParagraph = document.createElement("p")
    // mainParagraph.setAttribute("id", "MainParagraph")
    // mainParagraph.setAttribute("class", "mt-3 container")

    //Concatenation vs Interpolation examples:
    // concatenation - '1' + '2' + '3'
    // interpolation - `${var_1}`
    //The first join the strings, the second interprets a string with variables
    let firstString = "This is a "
    let secondString = `${firstString} main paragraph that we added to the page using JQuery`
    //mainParagraph.textContent = secondString

    /**
     * textContent - changes text node
     * innerHTML - overwrites anything in the innerHTML of that element
     */

    //mainContent.appendChild(mainParagraph) 

    //Week 5 - Class 2: A better approach than the one used before
    //to create and display a 'p' element in the age using jquery

    $("main").addClass("container").append(`<p id="mainParagraph" class="mt-3 mb-5 container"> ${secondString} </p>`)

  }

  function DisplayProjects() {
    console.log("Projects Page");

  }

  function DisplayAbout() {
    console.log("About Page");
  }

  function DisplayContactList() {
    if (localStorage.length > 0) {

      let contactList = document.getElementById("contactList") //Here we are returning the id we have on the table on the Contact List page
      let data = "" // Add data to this variable. Append deserialized data from local storage to data
      let keys = Object.keys(localStorage) // Return a String array of keys
      let index = 1 // Count number of keys

      //for every key in the keys collection
      //for of = for every key in keys do something
      for (const key of keys) {
        console.log(`The index: ${index} - The key: ${key}`)

        let contactData = localStorage.getItem(key) // Get localStorage data value related to the key
        let contact = new core.Contact()

        contact.deserialize(contactData)

        // Inject repeatable row into the contactList
        data +=
          `<tr>
            <th scope="row" class="text-center">${index}</th>
            <td class="text-center">${contact.Name}</td>
            <td class="text-center">${contact.ContactNumber}</td>
            <td class="text-center">${contact.EmailAddress}</td>
            <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
            <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
          <tr/>

          `
        index++
      }  

      contactList.innerHTML = data

      $("button.delete").click(function () {
        if(confirm("Are you sure you want to delete this?")) //confirm method reserved for prompts / confirmations
          //console.log("delete button was clicked")
          localStorage.removeItem($(this).val())
        
        //location.reload()
        location.href = 'contact-list.com'
      })

      $("button.edit").on("click",function () {
        //console.log("Edit button was clicked")
        //pass in the edit page url and the key value that we are getting from the button
        window.location.href = 'edit.html#' + $(this).val()
      })

    }

    //function for add button
    $("#addButton").on("click", () => {
      location.href = 'edit.html#Add'
    })

  }

  function AddContact(fullName, contactNumber, emailAddress ){

    let contact = new core.Contact(fullName, contactNumber, emailAddress)

    if (contact.serialize()) {
      //if the contact is not blank and can be serialized make a key that will be the first letter of the 
      //contact name and add the data (in this case the number of seconds passed since 70's)
      //Note: if we hit the submit button multiple times or even hold it for a bit it will save 
      //multiple contacts on the database because Date() updates every second (or milisecond), so the key will
      //be different creating multiple contacts with different keys but same information otherwise
      let key = contact.Name.substring(0, 1) + Date.now()
      localStorage.setItem(key, contact.serialize())
    }
  }

  function DisplayContacts() {

    let submitButton = document.getElementById("submitButton")
    let subscribeCheckbox = document.getElementById("subscribeCheckbox")

    //Session Storage: Temporary storage on the browser
    //localStorage: Key working pairs
    //Both located under the Application tab of the developer tools 
    //remember when retrieving data from the local storage that variable names are case sensitive

    //localStorage Example
    // localStorage.setItem("Random Variable", "random variable for testing")
    // console.log(localStorage.getItem("Random Variable"))
    // localStorage.removeItem("Random Variable")

    submitButton.addEventListener("click", function () {
      //event.preventDefault()
      if (subscribeCheckbox.checked) {
        //only if user subscribe we want to save the data on the database
        //the parameters are the ids that we are suing on the form.
        AddContact(fullName.value, contactNumber.value, emailAddress.value)
      }
    })

  }

  function DisplayEditPage(){
    //get the hash on the url
    //console.log(location.hash)

    //assign the word after the hash symbol and assign it to a variable
    let page = location.hash.substring(1)

    switch (page) {
      case "Add":
        {
          $("#welcome").text("Add - WEBD6201 Demo")

          $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`)

          $("#editButton").on("click", (event) => {
            event.preventDefault()

            //get the form info (name ,contact number, email address)
            AddContact(fullName.value, contactNumber.value, emailAddress.value)

            //redirect to contact list
            location.href = "contact-list.html"
          })
        }
        break;
      default:
        {
          // default behaviour
          //get contact info from localStorage
          let contact = new core.Contact()

          contact.deserialize(localStorage.getItem(page)) //this is not really a page, this is whatever after th hash in the url

          //display contact info in edit form
          $("#fullName").val(contact.Name)
          $("#contactNumber").val(contact.ContactNumber)
          $("#emailAddress").val(contact.EmailAddress)

          //when edit button pressed, update the contact
          $("#editButton").on("click", (event) => {
            event.preventDefault()

            //get all changes from the form
            contact.Name = $("#fullName").val()
            contact.ContactNumber = $("#contactNumber").val()
            contact.EmailAddress = $("#emailAddress").val()

            //replace the changes in localStorage
            localStorage.setItem(page, contact.serialize()) //transform the contact info into a string separated by commas

            //go back to contactlist.html
            location.href = 'contact-list.html'

          })

        }

        break
    }


  }

  function DisplayReferences() {
    console.log("References Page");
  }

  function DisplayServices() {
    console.log("Services Page");
  }

  function Start() {
    console.log("App Started Successfully")

    switch (document.title) {
      case "Home - WEBD6201 Demo":
        DisplayHome()
        break;
      case "About - WEBD6201 Demo":
        DisplayAbout()
        break;
      case "Contact List - WEBD6201 Demo":
        DisplayContactList()
        break;
      case "Contact Us - WEBD6201 Demo":
        DisplayContacts()
        break;
      case "Projects - WEBD6201 Demo":
        DisplayProjects()
        break;
      case "References - WEBD6201 Demo":
        DisplayReferences()
        break;
      case "Services - WEBD6201 Demo":
        DisplayServices()
        break;
      case "Edit - WEBD6201 Demo":
        DisplayEditPage()
        break;
      default:
      // code block
    }
  }

  window.addEventListener("load", Start)
})()


