document.addEventListener("DOMContentLoaded", async () => {
    const userList = document.getElementById("user-list");

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        userList.innerHTML = users.map(user => `
            <div class="user-item" onclick="handleUserClick(this, ${user.id})">
                <h3>${user.name}</h3>
                <p>${user.email}</p>
            </div>
        `).join("");
    } catch (error) {
        userList.innerHTML = "<p>โหลดข้อมูลไม่สำเร็จ</p>";
        console.error("Error fetching users:", error);
    }
});

function handleUserClick(element, userId) {
    // เอาทุก element ที่มี .clicked ออกก่อน
    document.querySelectorAll(".user-item").forEach(item => item.classList.remove("clicked"));
    
    // เพิ่ม class "clicked" ให้ element ที่ถูกคลิก
    element.classList.add("clicked");

    // ลิงก์ไปหน้ารายละเอียด
    window.location.href = `user-detail.html?id=${userId}`;
}