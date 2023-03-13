const commentFormHandler = async (event) => {
  event.preventDefault();

  // Declare variables and collect values from the comment form
  const content = document.querySelector("#comment").value.trim();
  // window.location.toString().split("/") = ["http:", "", "localhost:3001", "blog", ":id"]
  // [window.location.toString().split("/").length - 1] = ":id"
  const blog_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content, blog_id }),
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

// Add event listener to the comment form submit
document
  .querySelector(".comment_form")
  .addEventListener("submit", commentFormHandler);
