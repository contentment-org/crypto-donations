// donation.js

document.addEventListener("DOMContentLoaded", () => {
  /* Donation contract ABI JSON array */
  const DonationABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "email",
          type: "string",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "donateERC20",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "email",
          type: "string",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "donateETH",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdrawERC20",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdrawETH",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "erc20Donations",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalEthDonated",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "donor",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "email",
          type: "string",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "ERC20Donation",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "admin",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "ERC20Withdrawal",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "donor",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "email",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "EthDonation",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "admin",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Withdrawal",
      type: "event",
    },
  ];

  /* Donation contract address */
  const DonationAddress = "0xbA77E08c914df0CBA67eB0A7D96F82B1E4ae71aF";

  /* ERC20 token contract ABI JSON array */
  const ERC20ABI = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint8" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ name: "", type: "string" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ name: "", type: "string" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ name: "success", type: "bool" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_from", type: "address" },
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ name: "success", type: "bool" }],
      type: "function",
    },
  ];

  const donationForm = document.getElementById("donation-form");
  const donationTypeSelect = document.getElementById("donation-type");
  const erc20Fields = document.querySelectorAll(".erc20-field");
  const donationStatus = document.getElementById("donation-status");

  // Show/hide ERC20 fields based on the selected donation type
  donationTypeSelect.addEventListener("change", () => {
    const donationType = donationTypeSelect.value;
    erc20Fields.forEach((field) => {
      field.style.display = donationType === "ERC20" ? "block" : "none";
    });
  });

  // Handle form submission
  donationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    donationStatus.textContent = "Processing...";

    const donationType = donationTypeSelect.value;
    const email = document.getElementById("donor-email").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const account = (
      await ethereum.request({ method: "eth_requestAccounts" })
    )[0];

    // Initialize Web3
    const web3 = new Web3(Web3.givenProvider);
    const donationContract = new web3.eth.Contract(
      DonationABI,
      DonationAddress
    );
    const message = web3.utils.soliditySha3(
      { type: "string", value: email },
      { type: "address", value: account }
    );
    const signature = await web3.eth.personal.sign(message, account);

    try {
      if (donationType === "ETH") {
        // Donate with ETH
        const donationValue = web3.utils.toWei(amount.toString(), "ether");
        await donationContract.methods
          .donateETH(email, signature)
          .send({ from: account, value: donationValue });
      } else if (donationType === "ERC20") {
        // Donate with ERC20
        const tokenAddress = document.getElementById("token-address").value;
        const erc20Token = new web3.eth.Contract(ERC20ABI, tokenAddress);
        const donationValue = web3.utils.toWei(amount.toString(), "ether");

        // Approve and then donate
        await erc20Token.methods
          .approve(DonationAddress, donationValue)
          .send({ from: account });
        await donationContract.methods
          .donateERC20(tokenAddress, donationValue, email, signature)
          .send({ from: account });
      }
      donationStatus.textContent = "Donation successful! Thank you!";
    } catch (error) {
      donationStatus.textContent = `Donation failed: ${error.message}`;
    }
  });

  // Send the height of the donation container to the parent window
  const updateIframeDimensions = () => {
    window.parent.postMessage(
      {
        type: "donation-iframe-dimensions",
        height: document.body.offsetHeight,
        width: document.body.offsetWidth,
      },
      "*"
    );
  };

  // Run the function once initially
  updateIframeDimensions();

  // Observe changes in the donation container using ResizeObserver
  const donationContainer = document.querySelector(".donation-container");
  const observer = new ResizeObserver(updateIframeDimensions);
  observer.observe(donationContainer);
});
