const groupNameForm = document.querySelector("#group-form");

groupNameForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const groupNameInputValue = document
    .querySelector("#name-input")
    .value.trim();

  try {
    const response = await fetch("http://localhost:5000/v1/groups", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: groupNameInputValue,
      }),
    });

    if (response.ok) {
      groupNameForm.reset();

      alert("Group added successfuly");

      window.location.assign(`./index.html`);
    }

    if (!response.ok || response.status >= 400) {
      const data = await response.json();

      return alert(data.error || response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
});
