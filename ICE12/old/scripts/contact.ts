namespace core {
    
    export class Contact{

        // private instance variables
        private m_name: string
        private m_contactNumber: string
        private m_emailAddress: string 


        //Constructors
        constructor(name: string, contactNumber: string, emailAddress: string){
            this.m_name = name
            this.m_contactNumber = contactNumber
            this.m_emailAddress = emailAddress
        }

        //Accessors and Mutators
        public get Name(): string{
            return this.m_name
        }

        public set Name(name: string){
            this.m_name = name
        }

        public get ContactNumber(): string{
            return this.m_contactNumber
        }

        public set ContactNumber(contactNumber: string){
            this.m_contactNumber = contactNumber
        }

        public get EmailAddress(): string{
            return this.m_emailAddress
        }

        public set EmailAddress(emailAddress: string){
            this.m_emailAddress = emailAddress
        }

        //Public Utility Method
        //Used to serialize and deserialize the data

        //Serialize Method - can either returned the serialied data or null id there is nothing
        serialize():string | null {
            if(this.Name !== "" && this.ContactNumber !== "" && this.EmailAddress !== "")
                return `${ this.Name }, ${ this.ContactNumber }, ${ this.EmailAddress } `
            
            console.error("One or more properties pr fields of the contact object are missing or invalid")
            return null
        }

        //Deserialize Method
        //gets all the data from the database and separate it based on the commas
        //each data piece represents each piece of data (each record on the database)
        deserialize(data: string) {
            let propertyArray = data.split(", ")
            this.Name = propertyArray[0]
            this.ContactNumber = propertyArray[1]
            this.EmailAddress = propertyArray[2]
        }


        //Public Override Method
        toString(): string{
            return `Full name is ${ this.Name } \n Contact Info is: ${ this.ContactNumber } \n Email Address: ${ this.EmailAddress }`

        }
    }
}