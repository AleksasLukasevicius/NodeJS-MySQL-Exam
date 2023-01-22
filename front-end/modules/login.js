const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const emailInputValue = document.querySelector("#email-input").value.trim();
  const passwordInputValue = document
    .querySelector("#password-input")
    .value.trim();

  try {
    const response = await fetch(
      "http://localhost:5000/v1/authorization/login",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: emailInputValue,
          password: passwordInputValue,
        }),
      }
    );

    const userData = await response.json();

    if (response.ok) {
      loginForm.reset();

      console.info({ userData });

      localStorage.setItem("token", userData.token);

      document.cookie = `id=${userData.id}`;
      // document.cookie = `accessToken=${userData.token}; SameSite=None; Secure`;

      window.location.assign(`./index.html`);

      return alert("Successfully logged in");
    }

    if (!response.ok || response.status >= 400) {
      return alert(userData?.error || userData.statusText);
    }
  } catch (error) {
    alert(error.message);
  }
});
