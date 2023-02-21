export const addBill = async () => {
  const billForm = document.querySelector("form#addBill-form");

  billForm.addEventListener("submit", async (event) => {
    event.preventDefault();

<<<<<<< HEAD
  const urlParams = new URLSearchParams(window.location.search);
  const groupId = +urlParams.get("group_id");
  const descriptionValue = document
    .querySelector("#description-input")
    .value.trim();
  const amountValue = +document.querySelector("#amount-input").value;

  console.info({ groupId });

  try {
    const response = await fetch("http://localhost:5000/v1/bills", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        groupId,
        description: descriptionValue,
        amount: amountValue,
      }),
    });
=======
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = +urlParams.get("group_id");
    const descriptionValue = document
      .querySelector("#description-input")
      .value.trim();
    const amountValue = +document.querySelector("#amount-input").value;

    try {
      const response = await fetch("http://localhost:5000/v1/bills", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          groupId,
          description: descriptionValue,
          amount: amountValue,
        }),
      });
>>>>>>> 718c7f2036c7d99b960177854e5147dfc8f8ed1a

      const data = await response.json();

<<<<<<< HEAD
    console.info({ data });
=======
      if (!response.ok || response.status >= 400) {
        return alert(data.error || response.statusText);
      }
>>>>>>> 718c7f2036c7d99b960177854e5147dfc8f8ed1a

      alert("Bill added successfuly");

      billForm.reset();

      window.location.reload();
    } catch (error) {
      alert(error.message);

      console.log(error);
    }
  });
};
