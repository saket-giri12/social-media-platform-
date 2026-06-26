// Check User Login
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// Load All Posts
async function loadPosts() {

    try {

        const response = await fetch("http://localhost:5000/api/posts");
        const posts = await response.json();

        let html = "";

        posts.reverse().forEach(post => {

            html += `
            <div class="post">

                <div class="post-header">

                    <img
                        class="avatar"
                        src="https://ui-avatars.com/api/?name=${post.user.name}&background=1877f2&color=ffffff"
                    >

                    <div>

                        <h3>${post.user.name}</h3>

                        <small>
                            ${new Date(post.createdAt).toLocaleString()}
                        </small>

                    </div>

                </div>

                <p class="caption">${post.caption}</p>

                ${
                    post.image
                    ? `<img src="http://localhost:5000/uploads/${post.image}" class="post-image">`
                    : ""
                }

                <div class="actions">

                    <button onclick="likePost('${post._id}')">
                        ❤️ ${post.likes.length}
                    </button>

                    <button onclick="showComments('${post._id}')">
                        💬 Comments
                    </button>

                    ${
                        post.user._id === user._id
                        ? `<button onclick="deletePost('${post._id}')">🗑 Delete</button>`
                        : ""
                    }

                </div>

                <div
                    class="comments"
                    id="comments-${post._id}">
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

// Create Post
async function createPost() {

    const caption = document.getElementById("caption").value.trim();

    if (caption === "") {

        alert("Please write something.");

        return;

    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/posts/create",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    userId: user._id,

                    caption: caption,

                    image: ""

                })

            }
        );

        const data = await response.json();

        alert(data.message);

        document.getElementById("caption").value = "";

        loadPosts();

    } catch (error) {

        console.log(error);

    }

}

// Like Post
async function likePost(postId) {

    await fetch(

        `http://localhost:5000/api/posts/like/${postId}`,

        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                userId: user._id

            })

        }

    );

    loadPosts();

}

// Show Comments
async function showComments(postId) {

    const response = await fetch(

        `http://localhost:5000/api/comments/${postId}`

    );

    const comments = await response.json();

    let html = "";

    comments.forEach(comment => {

        html += `
            <p>
                <strong>${comment.user.name}</strong> :
                ${comment.text}
            </p>
        `;

    });

    html += `

        <input
            type="text"
            id="comment-${postId}"
            placeholder="Write a comment">

        <button
            onclick="addComment('${postId}')">

            Send

        </button>

    `;

    document.getElementById(`comments-${postId}`).innerHTML = html;

}

// Add Comment
async function addComment(postId) {

    const text = document.getElementById(`comment-${postId}`).value;

    if (text.trim() === "") {

        alert("Please enter a comment");

        return;

    }

    await fetch(

        "http://localhost:5000/api/comments/add",

        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                userId: user._id,

                postId: postId,

                text: text

            })

        }

    );

    showComments(postId);

}

// Delete Post
async function deletePost(postId) {

    if (!confirm("Delete this post?")) return;

    const response = await fetch(

        `http://localhost:5000/api/posts/delete/${postId}`,

        {
            method: "DELETE"
        }

    );

    const data = await response.json();

    alert(data.message);

    loadPosts();

}

// Logout
function logout() {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.href = "login.html";

}

// Load Feed
loadPosts();