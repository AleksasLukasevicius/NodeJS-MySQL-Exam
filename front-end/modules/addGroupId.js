const groupIdForm = document.querySelector("#groupId-form");

groupIdForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const groupIdInputValue = +document
    .querySelector("#groupId-input")
    .value.trim();

  try {
    const response = await fetch("http://localhost:5000/v1/accounts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        group_id: groupIdInputValue,
      }),
    });

    console.info({ response });

    if (response.ok) {
      groupIdForm.reset();

      alert("Group added successfuly");

      window.location.assign(`./user-groups.html`);
    }

    if (!response.ok || response.status >= 400) {
      const data = await response.json();

      return alert(data.error || response.statusText);
    }
  } catch (error) {
    alert(error.message);

    console.log(error);
  }
});
