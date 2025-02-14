document.addEventListener("DOMContentLoaded", async () => {
    const postsList = document.getElementById("posts-list");
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");

    if (!userId) {
        postsList.innerHTML = "<p>ไม่พบข้อมูลโพสต์</p>";
        return;
    }

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await response.json();

        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post-item");
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button onclick="toggleComments(${post.id}, this)">ดูความคิดเห็น</button>
                <div id="comments-${post.id}" class="comments" style="display: none;"></div>
            `;
            postsList.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        postsList.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดโพสต์</p>";
    }
});

async function toggleComments(postId, button) {
    const commentsDiv = document.getElementById(`comments-${postId}`);

    if (commentsDiv.style.display === "none") {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const comments = await response.json();

            commentsDiv.innerHTML = comments.map(comment => `
                <p><strong>${comment.name}:</strong> ${comment.body}</p>
            `).join("");

            commentsDiv.style.display = "block";
            button.textContent = "ซ่อนความคิดเห็น";
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    } else {
        commentsDiv.style.display = "none";
        button.textContent = "ดูความคิดเห็น";
    }
}