const form = document.querySelector(".contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // 🛑 Prevent form from reloading

  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const mobile = document.getElementById("mobileInput").value.trim();
  const message = document.getElementById("messageInput").value.trim();

  if (!name || !email || !mobile || !message) {
    alert("❗Please fill all fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, mobile, message }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Message sent successfully!");
      form.reset();
    } else {
      alert("❌ Failed to send message: " + data.error);
    }
  } catch (err) {
    alert("⚠️ Something went wrong: " + err.message);
  }
});
