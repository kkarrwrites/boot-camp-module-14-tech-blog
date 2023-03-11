const loginFormHandler = async (event) => {
  event.preventDefault();

  // Declare variables and collect values from the login form
  const username = document.querySelector("#username_login").value.trim();
  const password = document.querySelector("#password_login").value.trim();

  if (username && password) {
    // POST (Read) request sent to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the brower to the Dashboard page
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

// Add event listener to the login form submit
document
  .querySelector("#login_form")
  .addEventListener("submit", loginFormHandler);
