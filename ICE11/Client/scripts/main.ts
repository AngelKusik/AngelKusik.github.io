/**
 * @author Angelica Kusik
 * @version 6.0.0
 * @since January 12, 2023
 * @description WEBD6201 in class demonstrations
 * 
 */

(function () {

  function AuthGuard(): void {
    let protectedRoutes: string[] = [
      '/contact-list', // this is the protected route that we are going to use
      '/edit'
    ]

    if (protectedRoutes.indexOf(router.ActiveLink) > -1){
        // check if user is logged in
        if (!sessionStorage.getItem("user")){
            // redirect the user to login.html
            //router.ActiveLink = 'login'
            location.href = '/login'
        }
    } 
  }

  function DisplayHome(): Function {


    //Most amount of memory heap
    $("#randomButton").on("click", function () {
      window.location.href = "/contact";
    })


    let firstString = "This is a "
    let secondString = `${firstString} main paragraph that we added to the page using JQuery`

    $("main").addClass("container").append(`<p id="mainParagraph" class="mt-3 mb-5 container"> ${secondString} </p>`)    
    
    return new Function()
  }

  function DisplayProjects(): Function {
    console.log("Projects Page");

    return new Function()

  }

  function DisplayAbout(): Function {

    console.log("About Page");

    return new Function()
  }

  function AddContact(fullName: string, contactNumber: string, emailAddress: string){

    let contact = new core.Contact(fullName, contactNumber, emailAddress)

    if (contact.serialize()) {
      //if the contact is not blank and can be serialized make a key that will be the first letter of the 
      //contact name and add the data (in this case the number of seconds passed since 70's)
      //Note: if we hit the submit button multiple times or even hold it for a bit it will save 
      //multiple contacts on the database because Date() updates every second (or milisecond), so the key will
      //be different creating multiple contacts with different keys but same information otherwise
      let key = contact.Name.substring(0, 1) + Date.now()
      localStorage.setItem(key, contact.serialize() as string)
    }
  }

  function ValidateInput(inputFieldID: string, regularExpression: RegExp, exception: string) {
    let messageArea = $('#messageArea').hide()

    $('#' + inputFieldID).on("blur", function() {
        let inputText = $(this).val() as string

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

  function ContactFormValidate(): void{
    let emailAddressPattern =  /^[\w-\.]+@([\w-]+\.)+[\w-][^\D]{1,10}$/g
    let fullNamePattern =  /^([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)*([A-Z][a-z]{1,})*$/g
    let contactNumberPattern = /^(\()?(\+)?(\d{0,3})?(\s|-|\))?(\d{3,})(\s|-)?(\d{3,})(\s|-)?(\d{4,})$/g

    ValidateInput("fullName", fullNamePattern, "Please enter a valid full name which means a capitalized first name and capitalized last name.")
    ValidateInput("emailAddress", emailAddressPattern, "Please enter a valid email address.")
    ValidateInput("contactNumber", contactNumberPattern, "Please enter a valid contact number.")

  }

  function DisplayContacts(): Function {

    $('a[href="/contact-list"]').off('click')
    $('a[href="/contact-list"]').on('click', function() {
      location.href='/contact-list'
    })

    // Ice 8 - only display Show Contact List if user is logged in
    // Step 1 - Check if user has a session:
    if(sessionStorage.getItem("user")){
      // if user is logged in:

      //Get form element from the page
      let form = $("#contactForm")

      // Append the showContactList  after the form
      form.after("<div class='col-lg-4 col-md-4'>" 
                + "<a href='/contact-list' class='btn btn-primary btn-lg'>"
                + "<i class='fas fa-users fa-lg'></i>Show Contact List"
                + "</a></div>")
    }
    // Step 2 - If user is not logged in, don't show the button! :)

    ContactFormValidate()

    let submitButton = document.getElementById("submitButton") as HTMLElement
    let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement

    submitButton.addEventListener("click", function() {
      if (subscribeCheckbox.checked) {
          let fullName = document.forms[0].fullName.value
          let contactNumber = document.forms[0].contactNumber.value
          let emailAddress = document.forms[0].emailAddress.value

          // If user subscribes, store the contact in localStorage
          let contact = new core.Contact(fullName, contactNumber, emailAddress)

          if (contact.serialize()) {
              let key = contact.Name.substring(0,1) + Date.now()
              localStorage.setItem(key, contact.serialize() as string)
          }
      }
  })

  return new Function()

  }

  function DisplayContactList(): Function  {
    if (localStorage.length > 0) {

      let contactList = document.getElementById("contactList") as HTMLElement // Our contact list in the table of the contact-list page //Here we are returning the id we have on the table on the Contact List page
      let data = "" // Add data to this variable. Append deserialized data from local storage to data
      let keys = Object.keys(localStorage) // Return a String array of keys
      let index = 1 // Count number of keys

      //for every key in the keys collection
      //for of = for every key in keys do something
      for (const key of keys) {
        console.log(`The index: ${index} - The key: ${key}`)

        let contactData = localStorage.getItem(key) as string // Get localStorage data value related to the key// Get localStorage data value related to the key
        let contact = new core.Contact("", "", "")

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

      $("button.delete").on("click", function () {
        if(confirm("Are you sure you want to delete this?")) //confirm method reserved for prompts / confirmations
          //console.log("delete button was clicked")
          localStorage.removeItem($(this).val() as string)

        location.href = '/contact-list'
        
      })

      $("button.edit").on("click",function () {
        //console.log("Edit button was clicked")
        //pass in the edit page url and the key value that we are getting from the button
        window.location.href = '/edit#' + $(this).val()
        
      })

    }

    //function for add button
    $("#addButton").on("click", () => {
      location.href = '/edit#Add'
      
    })

    return new Function()

  }

  function DisplayEditPage(): Function {

    ContactFormValidate()

    //assign the word after the hash symbol and assign it to a variable
    let page = location.hash.substring(1)

    console.log(page)

    switch (page) {
      case "Add":
        {
          $("#welcome").text("Add - WEBD6201 Demo")

          $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`)

          $("#editButton").on("click", (event) => {
            event.preventDefault()

            let fullName = document.forms[0].fullName.value
            let contactNumber = document.forms[0].contactNumber.value
            let emailAddress = document.forms[0].emailAddress.value

            //get the form info (name ,contact number, email address)
            AddContact(fullName, contactNumber, emailAddress)

            //redirect to contact list
            location.href = "/contact-list"
            
          })
        }
        break;
      default:
        {
          // default behaviour
          //get contact info from localStorage
          let contact = new core.Contact("", "", "")

          contact.deserialize(localStorage.getItem(page) as string) //this is not really a page, this is whatever after th hash in the url

          //display contact info in edit form
          $("#fullName").val(contact.Name)
          $("#contactNumber").val(contact.ContactNumber)
          $("#emailAddress").val(contact.EmailAddress)

          //when edit button pressed, update the contact
          $("#editButton").on("click", (event) => {
            event.preventDefault()

            //get all changes from the form
            contact.Name = $("#fullName").val() as string
            contact.ContactNumber = $("#contactNumber").val() as string
            contact.EmailAddress = $("#emailAddress").val() as string

            //replace the changes in localStorage
            localStorage.setItem(page, contact.serialize() as string) //transform the contact info into a string separated by commas

            //go back to contactlist.html
            location.href = '/contact-list'

          })

          $("#resetButton").on("click", () => {
            location.href = '/contact-list'
            
          })

        }

        break
    }

    return new Function()
  }

  function DisplayReferences(): Function {
    console.log("References Page");

    return new Function()
  }

  function DisplayLoginPage(): Function {

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

          let username = document.forms[0].username.value
          let password = document.forms[0].password.value

          console.log(username)
          console.log(password)
          // check if the username and password match the user data
          //passed in from users.json
          if(username == user.Username && password == user.Password) {
            newUser.fromJSON(user)

            success = true
            break

          }
        }

        // if username and password matched (success = true) -> perform the login sequence
      if (success){
        // add user to sessionStorage
        sessionStorage.setItem('user', newUser.serialize() as string)

        // hide any error messages
        messageArea.removeAttr('class').hide()

        // redirect the user to the secure area of our website - contact-list.html
        location.href = '/contact-list'

      }else{
        // display the error message
        $('#username').trigger('focus').trigger('select')
        messageArea.addClass('alert alert-danger').text('Error: invalid login credentials: Username/Password Mismacth').show()
      }

      })

    })

    $('#cancelButton').on('click', function() {
      // clear the form
      document.forms[0].reset()

      // return to the home page
      location.href = '/home'
    })

    return new Function()
  }

  function CheckLogin(): void {
    if(sessionStorage.getItem("user")){
      // Switch the login button
      $('#login').html(
        `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
      )

      $('#logout').on('click', function() {
        //perform Logout
        sessionStorage.clear()

        // switch logout link to login link
        $('#login').html(
          `<a class="nav-link" data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`
        )


        // redirect to login.html
        location.href = '/login'


      })
    }
  }
 
  function DisplayRegisterPage(): Function {
    console.log("References Page");

    return new Function()
  }

  function DisplayServices(): Function {
    console.log("Services Page");

    return new Function()
  }

  function Display404Page(): Function {
    console.log('404 Page');

    return new Function()
  }
  
  function Start() {
    console.log("App Started Successfully")

    let pageId = $('body')[0].getAttribute('id')

    CheckLogin()

    switch (pageId) {
      case "home":
          DisplayHome()
      case "projects":
          DisplayProjects()
      case "contact":
          DisplayContacts()
      case "contact-list":
          AuthGuard()
          DisplayContactList()
      case "references":
          DisplayReferences()
      case "edit":
          AuthGuard()
          DisplayEditPage()
      case "login":
          DisplayLoginPage()
      case "register":
          DisplayRegisterPage()
      case "about":
          DisplayAbout()    
      case "404":
          Display404Page()
    }
  }

  window.addEventListener("load", Start)
})()


