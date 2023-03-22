//let core
(function(core){

    class Router {
        // public properties: gets and sets
        /**
         * @returns string
         */
        get ActiveLink() {

            return this.m_activeLink // if it doesn't exist, javascript will create it
        }
        /**
         * @params {string} link
         */
        set ActiveLink(link) {

            this.m_activeLink = link            
        }

        // constructor
        /**
         * Creates an instance of Router.
         * @constructor
         */
        constructor() {
            this.ActiveLink = ""
        }

        // public methods - paths for methods
        /**
         * This method adds a new route to the Routing Table
         * @param {string[]} route 
         * @return {void}
         */
        Add(route) {
            this.m_routingTable.push(route) // will store our route table which is a list of paths that our application can use
        }
        /**
         * This method replaces the reference for the routing table with a new one
         * Note: routes should begin with a slash '/' always
         * @param {string} routingTable 
         * @returns {void}
         */
        AddRoutingTable(routingTable) {
            this.m_routingTable = routingTable
        }
        /**
         * This method finds and returns the index of the route in
         * @param {string} route 
         * @returns {number}
         */
        Find(route) {
            return this.m_routingTable.indexOf(route)
        }
        /**
         * This method removes our route from the routing table and returns
         * true if the route is removed otherwise it returns -1 / false
         * @param {string} route 
         * @returns {boolean}
         */
        Remove(route) {
            // if route is found, if not this is going to return -1 for "not found"
            if (this.Find(route) > -1){
                // remove the route
                this.m_routingTable.splice(this.Find(route), 1)
                return true
            }
            return false
        }


        // public override methods
        /**
         * This method overrides the built-in toString method and
         * returns the Routing Table in a comma-separated string
         * @returns {string}
         */
        toString() {
            return this.m_routingTable.toString()
        }
    }



    core.Router = Router
})(core || (core = {}))

let router = new core.Router() // associating the router with the namespace core so router will be accessible anywhere in the application

router.AddRoutingTable([
    "/",                        // default route
    "/home",                    // home page route
    "/about",                   // about page route
    "/services",                // services page route
    "/contact",
    "/contact-list",
    "/projects",
    "/register",
    "/login",                   // ...
    "/edit"                     // edit page route
])

// window.history.pushState('', '', '/')
let route = location.pathname   // alias for location.pathname 
                                // returns the location url path

// Note: We might get errors because ICE9 is not the root folder because of all the shanigans we have
// going on to display the ICEs on GitHub pages.

// if route is found in the routing table

// if (router.Find(route) > -1) {
//     router.ActiveLink = (route == "/") ? "home" : route.substring(1)  // get rif of the slash and tell me where I am
//     // The line above is doing the following:
//     // if (route == "/"){
//     //     router.ActiveLink = route.substring(1)
//     // }
// }else {
//     router.ActiveLink = "404"
// }

// And the line below is doing the same thing as the if & else above
// variable = (if condition) ? (if condition is true) : (else false)
router.ActiveLink = (router.Find(route) > -1) ? (route == "/") ? "home" : route.substring(1) : router.ActiveLink = "404"

