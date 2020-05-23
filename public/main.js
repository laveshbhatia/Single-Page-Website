function login() {
    var user = document.getElementById("login-username").value;
    var pwd = document.getElementById("login-password").value;
    var req = new XMLHttpRequest();
    req.onload = function () {
        if (req.status === 200) {
            if (req.responseText === "OK") {
                var url = "createpost.html";
                var request = new XMLHttpRequest();
                request.addEventListener('load', showContent);
                request.open("GET", url);
                request.send();
                sessionStorage["loggedin"] = "True";
                sessionStorage["username"] = user;
                //function showContent() to add data into your
            }
            else
                alert(req.responseText);
        }
        else
            alert("error communicating");

    }
    function showContent(e) {
        //add data to secContent
        secContent = document.getElementById('content');
        secContent.innerHTML = e.target.responseText;
    }
    var queryString = "user=" + user + "&pass=" + pwd;
    console.log(queryString);
    req.open("POST", "/login", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send(queryString);
}
function register() {
    var pwd = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var user = document.getElementById("username").value;
    if(!pwd || !email || !user){
        alert("Enter all details on register")
    }
    else {
        var req = new XMLHttpRequest();
                req.onload = function () {
                    if (req.status === 200) {
                        if (req.responseText === "OK") {
                            alert("Account Registered Successfully");
                        } else
                            alert(req.responseText);
                    } else
                        alert("error communicating");
                }
                var queryString = "user=" + user + "&pass=" + pwd + "&email=" + email;
                console.log(queryString);
                req.open("POST", "/register", true);
                req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                req.send(queryString);
}}

function submitForm() {
        var post = document.getElementById("post-details").value;
        var user = sessionStorage.getItem("username");
        var req = new XMLHttpRequest();
        req.onload = function () {
            if (req.status === 200) {
                if (req.responseText === "OK") {
                    alert("Post submitted successfully ");
                    add(3,1);
                }
                else
                    alert(req.responseText);
            }
            else
                alert("error communicating");
        }
        var queryString = "user=" + user + "&post=" + post;
        console.log(queryString);
        req.open("POST", "/uploadPost", true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send(queryString);
     }

     function add(num1,num2){
    return num1+num2;
     }
function logout() {
    sessionStorage.removeItem("loggedin");
    sessionStorage.removeItem("username");
    multiply(2,5);
    alert('Logged Out');
    var url = "login.html";
    var request = new XMLHttpRequest();
    request.addEventListener('load', showContent);
    request.open("GET", url);
    request.send();
}

function multiply(num1,num2) {
return num1 *num2;
}

function account() {
    if (sessionStorage["loggedin"] === "True") {
        var url = "logout.html";
        var request = new XMLHttpRequest();
        request.addEventListener('load', showContent);
        request.open("GET", url);
        request.send();
    } else {
        var url = "login.html";
        var request = new XMLHttpRequest();
        request.addEventListener('load', showContent);
        request.open("GET", url);
        request.send();
    }
}
function home() {
    if (sessionStorage["loggedin"] === "True") {
        result()
        function result() {
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "/displayPost", true);
            ajax.send()
            ajax.onreadystatechange = function () {
                if (ajax.status === 200) {
                var user = this.responseText
                    secContent = document.getElementById('content');
                    secContent.innerHTML = user;
            };
        }}

} else {
        var url = "error.html";
        var request = new XMLHttpRequest();
        request.addEventListener('load', showContent);
        request.open("GET", url);
        request.send();
    }
}

function post() {
    if (sessionStorage["loggedin"] === "True") {
        var url = "createpost.html";
        var request = new XMLHttpRequest();
        request.addEventListener('load', showContent);
        request.open("GET", url);
        request.send();
    }
    else {
        var url = "error.html";
        var request = new XMLHttpRequest();
        request.addEventListener('load', showContent);
        request.open("GET", url);
        request.send();
    }
}

//function showContent() to add data into your
function showContent(e) {
    //add data to secContent
    secContent = document.getElementById('content');
    secContent.innerHTML = e.target.responseText;
}
function searchFunction() {
    var user = document.getElementById("myinput").value;
    var req = new XMLHttpRequest();
    req.onload = function () {
        if (req.status === 200) {
            if (req.responseText === "OK") {
                alert("Not such user found");
        } else {
                var user = this.responseText
                secContent = document.getElementById('content');
                secContent.innerHTML = user;
            }
        }
    }

    var queryString = "user=" + user;
    console.log(queryString);
    req.open("POST", "/search", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send(queryString);
}


