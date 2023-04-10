"use strict";
(function () {
    function AuthGuard() {
        let protectedRoutes = [
            '/contact-list',
            '/edit'
        ];
        if (protectedRoutes.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem("user")) {
                location.href = '/login';
            }
        }
    }
    function DisplayHome() {
        $("#randomButton").on("click", function () {
            window.location.href = "/contact";
        });
        let firstString = "This is a ";
        let secondString = `${firstString} main paragraph that we added to the page using JQuery`;
        $("main").addClass("container").append(`<p id="mainParagraph" class="mt-3 mb-5 container"> ${secondString} </p>`);
        return new Function();
    }
    function DisplayProjects() {
        console.log("Projects Page");
        return new Function();
    }
    function DisplayAbout() {
        console.log("About Page");
        return new Function();
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.Name.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function ValidateInput(inputFieldID, regularExpression, exception) {
        let messageArea = $('#messageArea').hide();
        $('#' + inputFieldID).on("blur", function () {
            let inputText = $(this).val();
            if (!regularExpression.test(inputText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(exception).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidate() {
        let emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-][^\D]{1,10}$/g;
        let fullNamePattern = /^([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)*([A-Z][a-z]{1,})*$/g;
        let contactNumberPattern = /^(\()?(\+)?(\d{0,3})?(\s|-|\))?(\d{3,})(\s|-)?(\d{3,})(\s|-)?(\d{4,})$/g;
        ValidateInput("fullName", fullNamePattern, "Please enter a valid full name which means a capitalized first name and capitalized last name.");
        ValidateInput("emailAddress", emailAddressPattern, "Please enter a valid email address.");
        ValidateInput("contactNumber", contactNumberPattern, "Please enter a valid contact number.");
    }
    function DisplayContacts() {
        $('a[href="/contact-list"]').off('click');
        $('a[href="/contact-list"]').on('click', function () {
            location.href = '/contact-list';
        });
        if (sessionStorage.getItem("user")) {
            let form = $("#contactForm");
            form.after("<div class='col-lg-4 col-md-4'>"
                + "<a href='/contact-list' class='btn btn-primary btn-lg'>"
                + "<i class='fas fa-users fa-lg'></i>Show Contact List"
                + "</a></div>");
        }
        ContactFormValidate();
        let submitButton = document.getElementById("submitButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        submitButton.addEventListener("click", function () {
            if (subscribeCheckbox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                let contact = new core.Contact(fullName, contactNumber, emailAddress);
                if (contact.serialize()) {
                    let key = contact.Name.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
        return new Function();
    }
    function DisplayContactList() {
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
                console.log(`The index: ${index} - The key: ${key}`);
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact("", "", "");
                contact.deserialize(contactData);
                data +=
                    `<tr>
            <th scope="row" class="text-center">${index}</th>
            <td class="text-center">${contact.Name}</td>
            <td class="text-center">${contact.ContactNumber}</td>
            <td class="text-center">${contact.EmailAddress}</td>
            <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
            <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
          <tr/>

          `;
                index++;
            }
            contactList.innerHTML = data;
            $("button.delete").on("click", function () {
                if (confirm("Are you sure you want to delete this?"))
                    localStorage.removeItem($(this).val());
                location.href = '/contact-list';
            });
            $("button.edit").on("click", function () {
                window.location.href = '/edit#' + $(this).val();
            });
        }
        $("#addButton").on("click", () => {
            location.href = '/edit#Add';
        });
        return new Function();
    }
    function DisplayEditPage() {
        ContactFormValidate();
        let page = location.hash.substring(1);
        console.log(page);
        switch (page) {
            case "Add":
                {
                    $("#welcome").text("Add - WEBD6201 Demo");
                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        let fullName = document.forms[0].fullName.value;
                        let contactNumber = document.forms[0].contactNumber.value;
                        let emailAddress = document.forms[0].emailAddress.value;
                        AddContact(fullName, contactNumber, emailAddress);
                        location.href = "/contact-list";
                    });
                }
                break;
            default:
                {
                    let contact = new core.Contact("", "", "");
                    contact.deserialize(localStorage.getItem(page));
                    $("#fullName").val(contact.Name);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        contact.Name = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();
                        localStorage.setItem(page, contact.serialize());
                        location.href = '/contact-list';
                    });
                    $("#resetButton").on("click", () => {
                        location.href = '/contact-list';
                    });
                }
                break;
        }
        return new Function();
    }
    function DisplayReferences() {
        console.log("References Page");
        return new Function();
    }
    function DisplayLoginPage() {
        console.log("Login Page");
        let messageArea = $('#messageArea');
        messageArea.hide();
        $('#loginButton').on('click', function () {
            let success = false;
            let newUser = new core.User();
            $.get('./Data/users.json', function (data) {
                for (const user of data.users) {
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;
                    console.log(username);
                    console.log(password);
                    if (username == user.Username && password == user.Password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem('user', newUser.serialize());
                    messageArea.removeAttr('class').hide();
                    location.href = '/contact-list';
                }
                else {
                    $('#username').trigger('focus').trigger('select');
                    messageArea.addClass('alert alert-danger').text('Error: invalid login credentials: Username/Password Mismacth').show();
                }
            });
        });
        $('#cancelButton').on('click', function () {
            document.forms[0].reset();
            location.href = '/home';
        });
        return new Function();
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $('#login').html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);
            $('#logout').on('click', function () {
                sessionStorage.clear();
                $('#login').html(`<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>`);
                location.href = '/login';
            });
        }
    }
    function DisplayRegisterPage() {
        console.log("References Page");
        return new Function();
    }
    function DisplayServices() {
        console.log("Services Page");
        return new Function();
    }
    function Display404Page() {
        console.log('404 Page');
        return new Function();
    }
    function Start() {
        console.log("App Started Successfully");
        let pageId = $('body')[0].getAttribute('id');
        CheckLogin();
        switch (pageId) {
            case "home":
                DisplayHome();
            case "projects":
                DisplayProjects();
            case "contact":
                DisplayContacts();
            case "contact-list":
                AuthGuard();
                DisplayContactList();
            case "references":
                DisplayReferences();
            case "edit":
                AuthGuard();
                DisplayEditPage();
            case "login":
                DisplayLoginPage();
            case "register":
                DisplayRegisterPage();
            case "about":
                DisplayAbout();
            case "services":
                DisplayServices();
            case "404":
                Display404Page();
        }
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=main.js.map