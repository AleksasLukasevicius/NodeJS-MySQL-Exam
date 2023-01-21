const getGroups = async () => {
  try {
    const response = await fetch("http://localhost:5000/v1/groups", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const groups = await response.json();

    if (!response.ok || response.status >= 400) {
      alert(groups.error || groups.statusText);
      return window.location.assign(`./login.html`);
    }

    if (response.ok) {
      return groups;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getGroups };
