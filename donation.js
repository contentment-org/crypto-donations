document.addEventListener("DOMContentLoaded", () => {
  const donationStatus = document.getElementById("donation-status");

  window.addEventListener("message", (event) => {
    if (event.data.type === "updateStatus") {
      donationStatus.textContent = event.data.message;
    }
  });

  const donationForm = document.getElementById("donation-form");
  const donationTypeSelect = document.getElementById("donation-type");
  const erc20Fields = document.querySelectorAll(".erc20-field");

  donationTypeSelect.addEventListener("change", () => {
    erc20Fields.forEach((field) => {
      field.style.display =
        donationTypeSelect.value === "ERC20" ? "block" : "none";
    });
    sendMessageToUpdateDimensions();
  });

  donationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const donationType = donationTypeSelect.value;
    const email = document.getElementById("donor-email").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const tokenAddress =
      donationType === "ERC20"
        ? document.getElementById("token-address").value
        : null;

    window.parent.postMessage(
      {
        type: "submitDonation",
        data: {
          donationType,
          email,
          amount,
          tokenAddress,
        },
      },
      "*"
    );
  });

  function sendMessageToUpdateDimensions() {
    const dimensions = {
      height: document.body.scrollHeight,
      width: document.body.scrollWidth,
    };
    window.parent.postMessage(
      {
        type: "updateIframeDimensions",
        dimensions: dimensions,
      },
      "*"
    );
  }

  const donationContainer = document.querySelector(".donation-container");
  if (donationContainer) {
    const observer = new ResizeObserver(sendMessageToUpdateDimensions);
    observer.observe(donationContainer);
  }
});
