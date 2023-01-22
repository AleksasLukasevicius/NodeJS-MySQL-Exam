const urlParams = new URLSearchParams(window.location.search);
const group_id = +urlParams.get("group_id");

const getBills = async () => {
  try {
    const response = await fetch(`http://localhost:5000/bills/${group_id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const bills = await response.json();

    if (!response.ok || response.status >= 400) {
      return alert(bills.error || bills.statusText);
    }

    return bills;
  } catch (error) {
    console.log(error);

    alert(error.message);
  }
};

export { getBills };
