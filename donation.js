document.addEventListener("DOMContentLoaded", () => {
  const donationForm = document.getElementById("donation-form");
  const donationTypeSelect = document.getElementById("donation-type");
  const erc20Fields = document.querySelectorAll(".erc20-field");
  const accountSelect = document.getElementById("account-list");
  const donationStatus = document.getElementById("donation-status");

  window.addEventListener("message", (event) => {
    const { type } = event.data;
    switch (type) {
      case "updateStatus":
        donationStatus.textContent = event.data.message;
        break;
      case "updateAccounts":
        updateAccountList(event.data.accounts);
        break;
    }
  });

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
    const selectedAccount = accountSelect.value; // Retrieve the selected account

    window.parent.postMessage(
      {
        type: "submitDonation",
        data: {
          donationType,
          email,
          amount,
          tokenAddress,
          account: selectedAccount,
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

  function updateAccountList(accounts) {
    const accountSelect = document.getElementById("account-list");
    accounts.forEach((account) => {
      const option = document.createElement("option");
      option.value = account;
      option.textContent = account;
      accountSelect.appendChild(option);
    });
  }

  const donationContainer = document.querySelector(".donation-container");
  if (donationContainer) {
    const observer = new ResizeObserver(sendMessageToUpdateDimensions);
    observer.observe(donationContainer);
  }
});
