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

    //Public Override Method

    toString(){
        return `Full name is ${ this.Name } \n Contact Info is: ${ this.ContactNumber } \n Email Address: ${ this.EmailAddress }`

    }
}