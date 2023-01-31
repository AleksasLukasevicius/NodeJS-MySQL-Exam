const billForm = document.querySelector("form#addBill-form");

billForm.addEventListener("submit", async (event) => {
  event.preventDefault();

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
    console.info({ response });

    const data = await response.json();

    if (!response.ok || response.status >= 400) {
      return alert(data.error || response.statusText);
    }

    billForm.reset();

    alert("Bill added successfuly");

    window.location.reload();
  } catch (error) {
    alert(error.message);

    console.log(error);
  }
  // });
};

export { addBill };
