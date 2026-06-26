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

function loadProfile() {

    document.getElementById("userName").innerText = user.name;

    document.getElementById("userEmail").innerText = user.email;

    document.getElementById("profileImage").src =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1877f2&color=ffffff`;

}

// ======================================
// Load My Posts
// ======================================

async function loadMyPosts() {

    try {

        const response = await fetch("http://localhost:5000/api/posts");

        const posts = await response.json();

        const myPosts = posts.filter(post => {

            if (typeof post.user === "object") {
                return post.user._id === user._id;
            }

            return post.user === user._id;

        });

        document.getElementById("totalPosts").innerText = myPosts.length;

        let html = "";

        myPosts.reverse().forEach(post => {

            html += `

            <div class="post-card">

                ${
                    post.image
                    ? `<img src="http://localhost:5000/uploads/${post.image}" alt="Post Image">`
                    : `<img src="https://picsum.photos/400/250?random=${post._id}" alt="Post">`
                }

                <div class="post-content">

                    <h3>${post.caption}</h3>

                    <p>
                        ❤️ ${post.likes ? post.likes.length : 0} Likes
                    </p>

                    <div class="post-actions">

                        <button
                            class="delete-btn"
                            onclick="deletePost('${post._id}')">

                            <i class="fa-solid fa-trash"></i>

                            Delete

                        </button>

                    </div>

                </div>

            </div>

            `;

        });

        document.getElementById("posts").innerHTML = html;

    } catch (error) {

        console.log(error);

        alert("Unable to load posts.");

    }

}

// ======================================
// Load Followers
// ======================================

async function loadFollowers() {

    try {

        const response = await fetch("http://localhost:5000/api/follow");

        const follows = await response.json();

        const followers = follows.filter(f => f.following === user._id);

        const following = follows.filter(f => f.follower === user._id);

        document.getElementById("followers").innerText = followers.length;

        document.getElementById("following").innerText = following.length;

    } catch (error) {

        console.log(error);

    }

}

// ======================================
// Delete Post
// ======================================

async function deletePost(postId) {

    if (!confirm("Delete this post?")) return;

    try {

        const response = await fetch(

            `http://localhost:5000/api/posts/delete/${postId}`,

            {
                method: "DELETE"
            }

        );

        const data = await response.json();

        alert(data.message);

        loadMyPosts();

    } catch (error) {

        console.log(error);

    }

}

// ======================================
// Logout
// ======================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

}

// ======================================
// Initialize Page
// ======================================

loadProfile();
loadMyPosts();
loadFollowers();