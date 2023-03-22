(function(core){
    class User{

        // constructor
        constructor(displayName = "", emailAddress = "", username = "", password = ""){
            this.DisplayName = displayName
            this.EmailAddress = emailAddress
            this.Username = username
            this.Password = password
        }

        // TODO: input missing Getters and Setters eventually

        // Override Method
        toString(){
            return `Display Name: ${ this.DisplayName }\nEmail Address: ${ this.EmailAddress }\nUsername: ${ this.Username }`
        }

        // Utility Methods
        // this doesn't include password because its for console display purposes, not database
        toJSON(){
            return {
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username,
            }
        }

        fromJSON(data){
            this.DisplayName = data.DisplayName
            this.EmailAddress = data.EmailAddress
            this.Username = data.Username
            this.Password = data.Password
        }

        //Serialize Method
        serialize() {
            if(this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "")
                return `${ this.DisplayName }, ${ this.EmailAddress }, ${ this.Username } `
            
            console.error("One or more properties pr fields of the contact object are missing or invalid")
            return null
        }

        //Deserialize Method
        //gets all the data from the database and separate it based on the commas
        //each data piece represents each piece of data (each record on the database)
        deserialize(data) {
            let propertyArray = data.split(", ")
            this.DisplayName = propertyArray[0]
            this.EmailAddress = propertyArray[1]
            this.Username = propertyArray[2]
        }

    }

    core.User = User

})(core || (core={}))