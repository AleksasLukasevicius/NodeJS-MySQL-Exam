const getUserGroups = async () => {
  const id = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("id="))
    ?.split("=")[1];

  console.info(id);

  if (!id) {
    alert("Please login to see your private groups");

    return window.location.assign(`./login.html`);
  }

  try {
    const response = await fetch(`http://localhost:5000/v1/user-groups/${id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const content = await response.json();

    if (!response.ok || response.status >= 400) {
      alert(content.error || response.statusText);

      return window.location.assign(`./login.html`);
    }

    if (response.ok) {
      return content;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getUserGroups };
