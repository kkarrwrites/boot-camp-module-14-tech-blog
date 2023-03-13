const logout = async () => {
  // POST (Read) request sent to the API endpoint
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // If successful, redirect the brower to the home page
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

// Add event listener to the logout form submit
document.querySelector("#logout").addEventListener("click", logout);
