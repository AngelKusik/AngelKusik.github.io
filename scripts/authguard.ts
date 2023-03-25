(function() {

    let protectedRoutes: string[] = [
        'contact-list' // this is the protected route that we are going to use
    ]

    if (protectedRoutes.indexOf(router.ActiveLink) > -1){
        // check if user is logged in
        if (!sessionStorage.getItem("user")){
            // redirect the user to login.html
            location.href = '/login'
        }
    }

    
})()