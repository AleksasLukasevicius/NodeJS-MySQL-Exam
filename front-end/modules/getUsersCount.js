const getUsersCount = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/v1/authorization/users"
    );
    const usersCount = await response.json();

    if (!response.ok || response.status >= 400) {
      alert(content.error || content.statusText);
    }

    return usersCount;
  } catch (error) {
    // alert(error.message);
    console.log(error);
  }
};

const usersCount = await getUsersCount();

const content = document.querySelector("#content");
const usersCountElement = document.createElement("h2");
usersCountElement.textContent = `Current database users count: ${usersCount[0].usersCount}`;

content.append(usersCountElement);
