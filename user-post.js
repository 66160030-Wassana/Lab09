async function fetchUserPosts() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    const userName = params.get('name');
    document.getElementById('user-name').textContent = userName;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    const posts = await response.json();
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = posts.map(post => `
      <div class="post-item">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button onclick="toggleComments(${post.id}, this)">ดูความคิดเห็น</button>
        <div id="comments-${post.id}" class="comments" style="display:none;"></div>
      </div>
    `).join('');
  }
  async function toggleComments(postId, button) {
    const commentsDiv = document.getElementById(`comments-${postId}`);
    if (commentsDiv.style.display === 'none') {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      const comments = await response.json();
      commentsDiv.innerHTML = comments.map(comment => `
        <div><strong>${comment.name}</strong> (${comment.email})<p>${comment.body}</p></div>
      `).join('');
      commentsDiv.style.display = 'block';
      button.textContent = 'ซ่อนความคิดเห็น';
    } else {
      commentsDiv.style.display = 'none';
      button.textContent = 'ดูความคิดเห็น';
    }
  }
  fetchUserPosts();