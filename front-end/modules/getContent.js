const getContent = async () => {
  try {
    const response = await fetch("http://localhost:5000/v1/tutorials", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const content = await response.json();

    if (!response.ok || response.status >= 400) {
      alert(content.error || content.statusText);
      return window.location.assign(`./login.html`);
    }

    if (response.ok) {
      return content;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getContent };
