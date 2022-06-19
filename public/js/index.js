(function () {
  function signup(event) {
    event.preventDefault();
    const username = $("#signup-name").val();
    const email = $("#signup-email").val();
    const password = $("#signup-password").val();

    if (username && email && password) {
      // Send a POST request to the API endpoint
      const response = fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({ name: username, email, password }),
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())
        .then((response) => {
          document.location.replace("/login");
        })
        .catch((err) => {
          alert("Err", err);
        });
    }
  }

  $("#signup-form").on("submit", signup);
})();

(function () {
  function login() {
    //   event.preventDefault();
    console.log("clicked");
    const email = $("#login-email").val();
    const password = $("#login-password").val();

    /*
              - use fetch to post data and create user on the server
              - after successful sign up send user to the login page
              - if error show error message
          */
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())

        .then((response) => {
          const { user } = response;
          const { id, email, name } = user;
          sessionStorage.setItem("user", JSON.stringify({ id, email, name }));
          document.location.replace("/dashboard");
        })
        .catch((err) => {
          alert("Err", err);
        });
    }
  }

  $("#login-form").on("click", login);
})();

(function () {
  const dashboardLink = $("#dashboard-link");
  const logoutLink = $("#logout-link");
  const loginLink = $("#login-link");
  const user = sessionStorage.getItem("user");
  if (user) {
    dashboardLink.show();
    logoutLink.show();
    loginLink.hide();
  } else {
    dashboardLink.hide();
    logoutLink.hide();
    loginLink.show();
  }
})();

(function () {
  function logout() {
    const response = fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        if (data.ok) {
          sessionStorage.removeItem("user");
          document.location.replace("/");
        }
      })

      .catch((err) => {
        alert("Err", err);
      });
  }
  $("#logout-link").on("click", logout);
})();

(function () {
  function home() {
    document.location.replace("/");
  }
  $("#home-link").on("click", home);
})();

(function () {
  function login() {
    document.location.replace("/login");
  }
  $("#login-link").on("click", login);
})();

(function () {
  function dashboard() {
    document.location.replace("/dashboard");
  }
  $("#dashboard-link").on("click", dashboard);
})();

(function () {
  function post() {
    document.location.replace("/post");
  }
  $("#add-post").on("click", post);
})();

(function () {
  function newBlog(event) {
    event.preventDefault();
    const title = $("#post-title").val();
    const content = $("#post-content").val();

    if (title && content) {
      // Send a POST request to the API endpoint
      const response = fetch("/api/blogs/", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())
        .then((response) => {
          document.location.replace("/dashboard");
        })
        .catch((err) => {
          alert("Err", err);
        });
    }
  }

  $("#new-post").on("click", newBlog);
})();

(function () {
  function updatePost(event) {
    event.preventDefault();
    const id = $("#post-id").val();
    const title = $("#post-title").val();
    const content = $("#post-content").val();

    if (id && title && content) {
      // Send a POST request to the API endpoint
      const response = fetch(`/api/blogs/${id}`, {
        method: "PUT",
        body: JSON.stringify({ id, title, content }),
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())
        .then((response) => {
          document.location.replace("/dashboard");
        })
        .catch((err) => {
          alert("Err", err);
        });
    }
  }

  $("#update-post").on("click", updatePost);
})();

(function () {
  function deletePost(event) {
    event.preventDefault();
    const id = $("#post-id").val();
    if (id) {
      // Send a POST request to the API endpoint
      const response = fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())
        .then((response) => {
          document.location.replace("/dashboard");
        })
        .catch((err) => {
          alert("Err", err);
        });
    }
  }

  $("#delete-post").on("click", deletePost);
})();
