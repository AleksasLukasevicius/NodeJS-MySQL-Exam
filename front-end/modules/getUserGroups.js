const getUserGroups = async () => {
  try {
    const response = await fetch(`http://localhost:5000/v1/accounts`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const userGroups = await response.json();

    if (!response.ok || response.status >= 400) {
      alert(userGroups.error || response.statusText);

      return window.location.assign(`./login.html`);
    }

    return userGroups;
  } catch (error) {
    console.log(error);
  }
};

export { getUserGroups };
