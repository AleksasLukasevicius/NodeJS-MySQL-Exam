const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("group_id");

console.info(groupId);

export const getBills = async () => {
  try {
    const response = await fetch(`http://localhost:5000/bills/${groupId}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const bills = await response.json();
    console.info(bills);

    if (!response.ok || response.status >= 400) {
      alert(bills.error || response.statusText);

      return window.location.assign(`./login.html`);
    }

    return bills;
  } catch (error) {
    console.log(error);

    alert(error.message);
  }
};
