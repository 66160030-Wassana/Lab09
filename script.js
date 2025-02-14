async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    const userList = document.getElementById('user-list');
    userList.innerHTML = users.map(user => `
      <div class="user-item" onclick="window.location='user-detail.html?id=${user.id}'">
        <h3>${user.name}</h3>
        <p>${user.email}</p>
      </div>
    `).join('');
  }
  fetchUsers();