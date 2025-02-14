async function fetchUserDetail() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await response.json();
    document.getElementById('user-detail').innerHTML = `
      <h2>${user.name}</h2>
      <p>Username: ${user.username}</p>
      <p>Email: ${user.email}</p>
      <p>Website: ${user.website}</p>
    `;
    document.getElementById('view-posts').addEventListener('click', () => {
      window.location = `user-posts.html?id=${userId}&name=${encodeURIComponent(user.name)}`;
    });
  }
  fetchUserDetail();