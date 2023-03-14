const hideButton = () => {
  const newButton = document.querySelector("#new_button");
  const newForm = document.querySelector(".new_form");
  newButton.classList.add("hidden");
  newForm.classList.remove("hidden");
};

const newFormHandler = async (event) => {
  event.preventDefault();

  // Declare variables and collect values from the comment form
  const title = document.querySelector("#new_title").value.trim();
  const content = document.querySelector("#new_content").value.trim();

  if (title && content) {
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, reload the blog page
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector("#new_button").addEventListener("click", hideButton);
document.querySelector(".new_form").addEventListener("submit", newFormHandler);
