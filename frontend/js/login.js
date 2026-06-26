// ===============================
// Login Function
// ===============================

async function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation
    if (email === "" || password === "") {
        alert("Please enter email and password.");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/users/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            // Save User Data
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Success Message
            alert("Login Successful!");

            // Redirect
            window.location.href = "index.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Server Error!");

    }

}

// ===============================
// Press Enter to Login
// ===============================

document.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        login();

    }

});

// ===============================
// Already Logged In
// ===============================

const token = localStorage.getItem("token");

if(token){

    console.log("User already logged in.");

}