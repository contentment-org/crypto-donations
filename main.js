(function () {
  function loadCSS() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "donation.css";
    document.head.appendChild(link);
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadCSS();

    const modalHtml = `
      <div class="iframe-modal" id="iframe-modal">
        <div class="iframe-content">
          <span class="iframe-close-button" id="close-iframe-modal">&times;</span>
          <iframe id="donation-iframe" src="donation.html" sandbox="allow-scripts allow-forms"></iframe>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);

    const buttonHtml = `<button id="open-donation-iframe" class="donate-button">Donate Crypto</button>`;
    document.body.insertAdjacentHTML("beforeend", buttonHtml);

    const iframeModal = document.getElementById("iframe-modal");
    const openDonationIframeButton = document.getElementById(
      "open-donation-iframe"
    );
    const closeIframeModalButton =
      document.getElementById("close-iframe-modal");

    openDonationIframeButton.addEventListener("click", () => {
      iframeModal.style.display = "flex";
    });

    closeIframeModalButton.addEventListener("click", () => {
      iframeModal.style.display = "none";
    });

    window.addEventListener("message", async (event) => {
      const data = event.data;
      if (!data) return;

      switch (data.type) {
        case "submitDonation":
          handleDonation(data.data);
          break;
        case "updateIframeDimensions":
          const { height, width } = data.dimensions;
          const donationIframe = document.getElementById("donation-iframe");
          donationIframe.style.height = `${height}px`;
          donationIframe.style.width = `${width}px`;
          break;
      }
    });
  });

  async function handleDonation({ donationType, email, amount, tokenAddress }) {
    console.log(
      "Processing donation:",
      donationType,
      email,
      amount,
      tokenAddress
    );

    if (!window.ethereum) {
      console.error("Ethereum provider not found. Please install MetaMask.");
      sendStatusToIframe(
        "Ethereum provider not found. Please install MetaMask."
      );
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0]; // Using the first account
      const web3 = new Web3(window.ethereum);
      const donationContract = new web3.eth.Contract(
        DonationABI,
        DonationAddress
      );

      // Create a unique message to sign
      const message = web3.utils.soliditySha3(
        { type: "string", value: email },
        { type: "uint256", value: amount }
      );
      const signature = await web3.eth.personal.sign(message, account);

      if (donationType === "ETH") {
        const donationValue = web3.utils.toWei(amount.toString(), "ether");
        await donationContract.methods.donateETH(email, signature).send({
          from: account,
          value: donationValue,
        });
        console.log("ETH Donation successful!");
        sendStatusToIframe("ETH Donation successful! Thank you!");
      } else if (donationType === "ERC20") {
        const erc20Token = new web3.eth.Contract(ERC20ABI, tokenAddress);
        const tokenAmount = web3.utils.toWei(amount.toString(), "ether"); // Assuming the token uses 18 decimals
        await erc20Token.methods
          .approve(DonationAddress, tokenAmount)
          .send({ from: account });
        await donationContract.methods
          .donateERC20(tokenAddress, tokenAmount, email, signature)
          .send({ from: account });
        console.log("ERC20 Donation successful!");
        sendStatusToIframe("ERC20 Donation successful! Thank you!");
      }
    } catch (error) {
      console.error("Failed to process donation:", error);
      sendStatusToIframe(`Donation failed: ${error.message}`);
    }
  }

  function sendStatusToIframe(message) {
    const donationIframe = document.getElementById("donation-iframe");
    donationIframe.contentWindow.postMessage(
      {
        type: "updateStatus",
        message: message,
      },
      "*"
    );
  }
})();
