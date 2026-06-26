// ======================================
// Check Login
// ======================================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// ======================================
// Load User Details
// ======================================

document.getElementById("userName").innerText = user.name;

document.getElementById("profileImage").src =
`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1877f2&color=ffffff`;

// ======================================
// Preview Image
// ======================================

function previewImage(event) {

    const preview = document.getElementById("preview");

    const file = event.target.files[0];

    if (file) {

        preview.src = URL.createObjectURL(file);

        preview.style.display = "block";

    } else {

        preview.style.display = "none";

    }

}

// ======================================
// Create Post
// ======================================

async function createPost() {

    const caption = document.getElementById("caption").value.trim();

    const imageInput = document.getElementById("image");

    if (caption === "" && imageInput.files.length === 0) {

        alert("Please enter a caption or select an image.");

        return;

    }

    const button = document.querySelector(".post-card button");

    button.disabled = true;

    button.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Sharing...';

    try {

        // If your backend currently supports only text posts,
        // image is sent as an empty string.

        const response = await fetch(

            "http://localhost:5000/api/posts/create",

            {

                method: "POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    userId:user._id,

                    caption:caption,

                    image:""

                })

            }

        );

        const data = await response.json();

        if(response.ok){

            alert("🎉 Post Created Successfully!");

            document.getElementById("caption").value="";

            document.getElementById("image").value="";

            document.getElementById("preview").style.display="none";

            setTimeout(()=>{

                window.location.href="home.html";

            },1000);

        }

        else{

            alert(data.message);

        }

    }

    catch(error){

        console.log(error);

        alert("Server Error!");

    }

    button.disabled=false;

    button.innerHTML=
    '<i class="fa-solid fa-paper-plane"></i> Share Post';

}

// ======================================
// Logout
// ======================================

function logout(){

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    window.location.href="login.html";

}