"use strict";
var core;
(function (core) {
    class User {
        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_username = username;
            this.m_password = password;
        }
        get DisplayName() {
            return this.m_displayName;
        }
        set DisplayName(name) {
            this.m_displayName = name;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        set EmailAddress(emailAddress) {
            this.m_emailAddress = emailAddress;
        }
        get Username() {
            return this.m_username;
        }
        set Username(username) {
            this.m_username = username;
        }
        get Password() {
            return this.m_password;
        }
        set Password(password) {
            this.m_password = password;
        }
        toString() {
            return `Display Name: ${this.DisplayName}\nEmail Address: ${this.EmailAddress}\nUsername: ${this.Username}`;
        }
    }
    core.User = User;
    return {
        "DisplayName": this.DisplayName,
        "EmailAddress": this.EmailAddress,
        "Username": this.Username
    };
})(core || (core = {}));
fromJSON(data, any);
void {
    this: .DisplayName = data.DisplayName,
    this: .EmailAddress = data.EmailAddress,
    this: .Username = data.Username,
    this: .Password = data.Password
};
serialize();
string | null;
{
    if (this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "")
        return `${this.DisplayName}, ${this.EmailAddress}, ${this.Username} `;
    console.error("One or more properties pr fields of the contact object are missing or invalid");
    return null;
}
deserialize(data, string);
{
    let propertyArray = data.split(", ");
    this.DisplayName = propertyArray[0];
    this.EmailAddress = propertyArray[1];
    this.Username = propertyArray[2];
}
//# sourceMappingURL=user.js.map