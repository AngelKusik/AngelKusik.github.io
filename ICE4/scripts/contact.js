class Contact{
    //Constructors
    constructor(name, contactNumber, emailAddress){
        this.Name = name
        this.ContactNumber = contactNumber
        this.EmailAddress = emailAddress
    }

    //Accessors and Mutators
    get Name(){
        return this.m_name
    }

    set Name(name){
        this.m_name = name
    }

    get ContactNumber(){
        return this.m_contactNumber
    }

    set ContactNumber(contactNumber){
        this.m_contactNumber = contactNumber
    }

    get EmailAddress(){
        return this.m_emailAddress
    }

    set EmailAddress(emailAddress){
        this.m_emailAddress = emailAddress
    }

    //Public Utility Method
    //Used to serialize and deserialize the data

    //Serialize Method
    serialize() {
        if(this.Name !== "" && this.ContactNumber !== "" && this.EmailAddress !== "")
            return `${ this.Name }, ${ this.ContactNumber }, ${ this.EmailAddress } `
        
        console.error("One or more properties pr fields of the contact object are missing or invalid")
        return null
    }

    //Deserialize Method
    //gets all the data from the database and separate it based on the commas
    //each data piece represents each piece of data (each record on the database)
    deserialize(data) {
        let propertyArray = data.split(", ")
        this.Name = propertyArray[0]
        this.ContactNumber = propertyArray[1]
        this.EmailAddress = propertyArray[2]
    }


    //Public Override Method

    toString(){
        return `Full name is ${ this.Name } \n Contact Info is: ${ this.ContactNumber } \n Email Address: ${ this.EmailAddress }`

    }
}