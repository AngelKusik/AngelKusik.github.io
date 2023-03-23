"use strict";
var core;
(function (core) {
    class Contact {
        constructor(name, contactNumber, emailAddress) {
            this.m_name = name;
            this.m_contactNumber = contactNumber;
            this.m_emailAddress = emailAddress;
        }
        get Name() {
            return this.m_name;
        }
        set Name(name) {
            this.m_name = name;
        }
        get ContactNumber() {
            return this.m_contactNumber;
        }
        set ContactNumber(contactNumber) {
            this.m_contactNumber = contactNumber;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        set EmailAddress(emailAddress) {
            this.m_emailAddress = emailAddress;
        }
        serialize() {
            if (this.Name !== "" && this.ContactNumber !== "" && this.EmailAddress !== "")
                return `${this.Name}, ${this.ContactNumber}, ${this.EmailAddress} `;
            console.error("One or more properties pr fields of the contact object are missing or invalid");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(", ");
            this.Name = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
        toString() {
            return `Full name is ${this.Name} \n Contact Info is: ${this.ContactNumber} \n Email Address: ${this.EmailAddress}`;
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map