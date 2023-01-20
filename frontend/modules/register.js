const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userFullNamelInputValue = document
    .querySelector("#full-name")
    .value.trim();
  const emailInputValue = document.querySelector("#email-input").value.trim();
  const passwordInputValue = document
    .querySelector("#password-input")
    .value.trim();
  // const reapetPasswordInputValue = document
  //   .querySelector("#reapet-password-input")
  //   .value.trim();

  try {
    const response = await fetch(
      "http://localhost:5000/v1/authorization/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          full_name: userFullNamelInputValue,
          email: emailInputValue,
          password: passwordInputValue,
          // reapetPassword: reapetPasswordInputValue,
        }),
      }
    );

    console.info(password);
    console.info(reapetPassword);

    // if (password !== reapetPassword) {
    //   return alert({ message: "Passwords do not match" });
    // }

    if (response.ok) {
      registerForm.reset();

      window.location.assign(`./login.html`);

      return alert("Registered successfuly");
    }

    if (!response.ok || response.status >= 400) {
      const userData = await response.json();

      return alert(userData.error || userData.statusText);
    }
  } catch (error) {
    alert(error.message);
  }
});
