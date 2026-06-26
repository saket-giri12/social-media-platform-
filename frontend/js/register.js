// ===============================
// Register User
// ===============================

async function registerUser() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Validation
    if (name === "" || email === "" || password === "" || confirmPassword === "") {

        alert("Please fill all fields.");

        return;

    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;

    }

    // Password Length
    if (password.length < 6) {

        alert("Password must be at least 6 characters.");

        return;

    }

    // Confirm Password
    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }

    const button = document.querySelector(".register-card button");

    button.disabled = true;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

    try {

        const response = await fetch(
            "http://localhost:5000/api/users/register",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    name,
                    email,
                    password

                })

            }

        );

        const data = await response.json();

        if (response.ok) {

            alert("🎉 Registration Successful!");

            // Clear Form
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("confirmPassword").value = "";

            // Redirect after 1 second
            setTimeout(() => {

                window.location.href = "login.html";

            }, 1000);

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server Error!");

    }

    button.disabled = false;
    button.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create Account';

}

// ===============================
// Press Enter to Register
// ===============================

document.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        registerUser();

    }

});

// ===============================
// Already Logged In
// ===============================

const token = localStorage.getItem("token");

if (token) {

    console.log("User already logged in.");

}