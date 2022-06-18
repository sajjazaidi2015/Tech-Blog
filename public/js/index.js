(function () {
  function signup(event) {
    event.preventDefault();
    const username = $("#signup-name").val();
    const email = $("#signup-email").val();
    const password = $("#signup-password").val();

    /*
            - use fetch to post data and create user on the server
            - after successful sign up send user to the login page
            - if error show error message
        */
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
  const user = sessionStorage.getItem("user");
  if (user) {
    dashboardLink.show();
    logoutLink.show();
  } else {
    dashboardLink.hide();
    logoutLink.hide();
  }
})();


(function() {
  function logout() {
    const response = fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        if(data.ok) {
          sessionStorage.removeItem("user");
          document.location.replace("/login");
        }
      })
      .catch((err) => {
        alert("Err", err);
      });
  }
  $("#logout-link").on("click", logout);
})();
