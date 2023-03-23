namespace core{
    export class User{

        // private instance members
        private m_displayName: string
        private m_emailAddress: string
        private m_username: string
        private m_password: string

        // constructor
        constructor(displayName: string = "", emailAddress: string = "", username: string = "", password: string = ""){
            this.m_displayName = displayName
            this.m_emailAddress = emailAddress
            this.m_username = username
            this.m_password = password
        }

        public get DisplayName(): string {
            return this.m_displayName
        }

        public set DisplayName(name: string) {
            this.m_displayName = name
        }

        public get EmailAddress(): string {
            return this.m_emailAddress
        }

        public set EmailAddress(emailAddress: string) {
            this.m_emailAddress = emailAddress
        }

        public get Username(): string {
            return this.m_username
        }

        public set Username(username: string) {
            this.m_username = username
        }

        public get Password(): string {
            return this.m_password
        }

        public set Password(password: string) {
            this.m_password = password
        }

        // Override Method
        toString(): string{
            return `Display Name: ${ this.DisplayName }\nEmail Address: ${ this.EmailAddress }\nUsername: ${ this.Username }`
        }

        // Utility Methods
        // this doesn't include password because its for console display purposes, not database
        //FIXME: need to fix the return type
        toJSON(): ( DisplayName: String, EmailAddress: String, Username: String ) {
            return {
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username
            }
        }

        // FIXME: fix parameter fata type
        fromJSON(data: any): void{
            this.DisplayName = data.DisplayName
            this.EmailAddress = data.EmailAddress
            this.Username = data.Username
            this.Password = data.Password
        }

        //Serialize Method
        serialize(): string | null {
            if(this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "")
                return `${ this.DisplayName }, ${ this.EmailAddress }, ${ this.Username } `
            
            console.error("One or more properties pr fields of the contact object are missing or invalid")
            return null
        }

        //Deserialize Method
        //gets all the data from the database and separate it based on the commas
        //each data piece represents each piece of data (each record on the database)
        deserialize(data: string) {
            let propertyArray = data.split(", ")
            this.DisplayName = propertyArray[0]
            this.EmailAddress = propertyArray[1]
            this.Username = propertyArray[2]
        }

    }

}