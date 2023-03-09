/**
 * @author Angelica Kusik
 * @version 6.0.0
 * @since January 12, 2023
 * @description WEBD6201 in class demonstrations
 * 
 */

(function () {

  /**
   * This function uses Ajax to open a connection to the server
   * and returns a data payload to the callback function.
   * @param {string} method 
   * @param {string} url 
   * @param {function} callback 
   */
  function AjaxRequest(method, url, callback){
    // Week 7 - AJAX
    // Instantiate the XHR Object
    let XHR = new XMLHttpRequest()

    // add event listener for readystatechange (there are 5 of them - 0-5, 0 meaning it's not ready)
    XHR.addEventListener("readystatechange", () => {
      // if the page is absolutelly ready
      if (XHR.readyState === 4 && XHR.status === 200){
        if (typeof callback === 'function'){
          // the responseText is the navbar 
          callback(XHR.responseText)
        }else{
          console.error("ERROR: callback is not a function.");
        }
      }
      
    })

    // receive the repsonse, connect and get data
    // Important: here we use relative path, because even the code is on main, we are calling it from the index or the other page
    XHR.open(method, url)

    // send the request to server to await response
    XHR.send()

  }

  /**
   * Load the static header
   * @param {HTML} html_data 
   */
  function LoadHeader(html_data){
    
    $("#navigationBar").html(html_data)
    $(`li>a:contains(${ document.title })`).addClass('active')
    CheckLogin()

  }

  function DisplayHome() {


    //Most amount of memory heap
    $("#randomButton").on("click", function () {
      window.location.href = "contact.html";
    })


    let firstString = "This is a "
    let secondString = `${firstString} main paragraph that we added to the page using JQuery`

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

  function ValidateInput(inputFieldID, regularExpression, exception) {
    let messageArea = $('#messageArea').hide()

    $('#' + inputFieldID).on("blur", function() {
        let inputText = $(this).val()

        if (!regularExpression.test(inputText)) {
            // failure to match full name with regex

            $(this).trigger("focus").trigger("select")

            messageArea.addClass("alert alert-danger").text(exception).show()
        } else {
            // success in matching full name with regex

            messageArea.removeAttr("class").hide()
        }
    })
  }

  function ContactFormValidate(){
    let emailAddressPattern =  /^[\w-\.]+@([\w-]+\.)+[\w-][^\D]{1,10}$/g
    let fullNamePattern =  /^([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)*([A-Z][a-z]{1,})*$/g
    let contactNumberPattern = /^(\()?(\+)?(\d{0,3})?(\s|-|\))?(\d{3,})(\s|-)?(\d{3,})(\s|-)?(\d{4,})$/g
    
    // The contactNumber Regex below accepts the following:
    // +123 416 835 9851
    // 4168359851 
    // +1-416-835-9851
    // 999-999-9999 
    // (+1)999-999-9999
    // (+11)999-999-9999
    // (+111)999-999-9999
    // 999-999-9999
    // (+1)999-999-9999
    // (+11)999-999-9999
    // (+111)999-999-9999/000
    // 999-999-9999 
    // (+1)999-999-9999
    // (+11)999-999-9999
    // (+111)999-999-9999
    // 123 416 835 9851

    ValidateInput("fullName", fullNamePattern, "Please enter a valid full name which means a capitalized first name and capitalized last name.")
    ValidateInput("emailAddress", emailAddressPattern, "Please enter a valid email address.")
    ValidateInput("contactNumber", contactNumberPattern, "Please enter a valid contact number.")

  }

  function DisplayContacts() {

    ContactFormValidate()

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

    ContactFormValidate()

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

  function DisplayLoginPage() {

    console.log("Login Page");

    let messageArea = $('#messageArea')
    
    messageArea.hide()

    $('#loginButton').on('click', function(){
      let success = false // flag indicating if a user is successfully logged in

      // create an empty user object
      let newUser = new core.User()

      // Use Jquery to load users.json file and read over it
      $.get('./Data/users.json', function(data){
        // iterate over every user in the users.json file ... for loop

        for (const user of data.users){
          // check if the username and password match the user data
          //passed in from users.json
          if(username.value == user.Username && password.value == user.Password) {
            newUser.fromJSON(user)

            success = true
            break

          }
        }

        // if username and password matched (success = true) -> perform the login sequence
      if (success){
        // add user to sessionStorage
        sessionStorage.setItem('user', newUser.serialize())

        // hide any error messages
        messageArea.removeAttr('class').hide()

        // redirect the user to the secure area of our website - contact-list.html
        location.href = 'contact-list.html'


      }else{
        // display the error message
        $('#username').trigger('focus').trigger('select')
        messageArea.addClass('alert alert-danger').text('Error: invalid login credentials: Username/Password Mismacth').show()
      }

      })

    })

    $('#cancelButton').on('click', function() {
      // clear the form
      document.form[0].reset()

      // return to the home page
      location.href = 'index.html'
    })
  }

  function CheckLogin() {
    if(sessionStorage.getItem("user")){
      // Switch the login button
      $('#login').html(
        `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
      )

      $('#logout').on('click', function() {
        //perform Logout
        sessionStorage.clear()

        // redirect to login.html
        location.href = 'login.html'
      })
    }
  }
 
  function DisplayRegisterPage() {
    console.log("References Page");
  }

  function DisplayServices() {
    console.log("Services Page");
  }

  function Start() {
    console.log("App Started Successfully")

    // Notice we are passing a reference to LoadHeader no the actual function
    AjaxRequest("GET", "./static/header.html", LoadHeader)

    switch (document.title) {
      case "Home":
        DisplayHome()
        break;
      case "About":
        DisplayAbout()
        break;
      case "Contact List":
        DisplayContactList()
        break;
      case "Contact Us":
        DisplayContacts()
        break;
      case "Projects":
        DisplayProjects()
        break;
      case "References":
        DisplayReferences()
        break;
      case "Services":
        DisplayServices()
        break;
      case "Edit":
        DisplayEditPage()
        break;
      case "Login":
        DisplayLoginPage()
        break;
      case "Register":
        DisplayRegisterPage()
        break;
      default:
      // code block
    }
  }

  window.addEventListener("load", Start)
})()


