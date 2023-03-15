(function() {

    if (!sessionStorage.getItem("user")){
        // redirect the user to login.html
        location.href = 'login.html'
    }
})()