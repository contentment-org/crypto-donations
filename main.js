/* Donation contract address */
const DonationAddress = "0x2CFA00116E473969973B8d799115D24E1f2C561A";
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
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "StringsInsufficientHexLength",
    type: "error",
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
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
];
/* ERC20 token contract ABI JSON array */
const ERC20ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];

(function () {
  function loadCSS() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "donation.css";
    document.head.appendChild(link);
  }

  function loadWeb3(callback) {
    const web3Script = document.createElement("script");
    web3Script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/web3/4.8.0/web3.min.js";
    web3Script.onload = callback;
    document.head.appendChild(web3Script);
  }

  async function fetchAccounts() {
    if (!window.ethereum) {
      sendStatusToIframe(
        "Ethereum provider not found. Please install MetaMask."
      );
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      sendAccountsToIframe(accounts);
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
      sendStatusToIframe(`Failed to fetch accounts: ${error.message}`);
    }
  }

  function initApp() {
    const modalHtml = `
      <div class="iframe-modal" id="iframe-modal">
        <div class="iframe-content">
          <span class="iframe-close-button" id="close-iframe-modal">&times;</span>
          <iframe id="donation-iframe" src="donation.html" sandbox="allow-scripts allow-forms allow-top-navigation"></iframe>
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
      fetchAccounts(); // Fetch accounts only when the modal is visible
    });

    closeIframeModalButton.addEventListener("click", () => {
      iframeModal.style.display = "none";
    });
  }

  function sendAccountsToIframe(accounts) {
    const donationIframe = document.getElementById("donation-iframe");
    donationIframe.contentWindow.postMessage(
      {
        type: "updateAccounts",
        accounts: accounts,
      },
      "*"
    );
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

  async function signMessage(web3, account, email) {
    const message = `${email}:${account}`;
    const hash = web3.utils.sha3(message);
    const signature = await web3.eth.personal.sign(hash, account, "");
    return signature;
  }

  async function handleDonation({ donationType, email, amount, tokenAddress }) {
    if (typeof Web3 === "undefined") {
      sendStatusToIframe("Web3 is not loaded.");
      return;
    }

    if (!window.ethereum) {
      sendStatusToIframe(
        "Ethereum provider not found. Please install MetaMask."
      );
      return;
    }

    const web3 = new Web3(window.ethereum);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      const donationContract = new web3.eth.Contract(
        DonationABI,
        DonationAddress
      );

      const signature = await signMessage(web3, account, email);

      if (donationType === "ETH") {
        const amountInWei = web3.utils.toWei(amount.toString(), "ether");

        // Estimate gas
        const estimatedGas = await donationContract.methods
          .donateETH(email, signature)
          .estimateGas({
            from: account,
            value: amountInWei,
          });

        await donationContract.methods.donateETH(email, signature).send({
          from: account,
          value: amountInWei,
          gas: estimatedGas,
        });
        console.log("ETH Donation successful!");
        sendStatusToIframe("ETH Donation successful! Thank you!");
      } else if (donationType === "ERC20") {
        if (!tokenAddress) {
          sendStatusToIframe("Missing token address for ERC20 donation.");
          return;
        }

        const erc20Token = new web3.eth.Contract(ERC20ABI, tokenAddress);
        const decimals = await erc20Token.methods.decimals().call();
        const tokensToDonate = BigInt(amount) * BigInt(10) ** BigInt(decimals); // Adjust for token decimals

        // First, estimate gas for the approve transaction
        const approveGas = await erc20Token.methods
          .approve(DonationAddress, tokensToDonate)
          .estimateGas({ from: account });

        await erc20Token.methods
          .approve(DonationAddress, tokensToDonate)
          .send({ from: account, gas: approveGas });

        // Estimate gas for the donation transaction
        const donateGas = await donationContract.methods
          .donateERC20(tokenAddress, tokensToDonate, email, signature)
          .estimateGas({
            from: account,
          });

        await donationContract.methods
          .donateERC20(tokenAddress, tokensToDonate, email, signature)
          .send({
            from: account,
            gas: donateGas,
          });
        console.log("ERC20 Donation successful!");
        sendStatusToIframe("ERC20 Donation successful! Thank you!");
      }
    } catch (error) {
      console.error("Failed to process donation:", error);
      sendStatusToIframe(`Donation failed: ${error.message}`);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadCSS();
    loadWeb3(initApp);
  });
})();
