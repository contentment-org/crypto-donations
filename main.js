(function () {
  // Function to inject external files
  function loadExternalFiles(cssUrl, web3JsUrl) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = cssUrl;
    document.head.appendChild(link);
    // Load Web3.js dynamically
    const web3Script = document.createElement("script");
    web3Script.src = web3JsUrl;
    document.head.appendChild(web3Script);
  }

  // Load external CSS for the modal and donation form
  loadExternalFiles(
    "donation.css",
    "https://cdn.jsdelivr.net/npm/web3@1.2.2/dist/web3.min.js"
  );

  document.addEventListener("DOMContentLoaded", () => {
    // Donation iframe modal structure
    const modalHtml = `
      <div class="iframe-modal" id="iframe-modal">
        <div class="iframe-content">
          <span class="iframe-close-button" id="close-iframe-modal">&times;</span>
          <iframe id="donation-iframe" sandbox="allow-scripts allow-forms"></iframe>
        </div>
      </div>
    `;
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = modalHtml;
    document.body.appendChild(modalDiv);

    // "Donate Crypto" button
    const buttonHtml = `<button id="open-donation-iframe" class="donate-button">Donate Crypto</button>`;
    const donateButtonDiv = document.createElement("div");
    donateButtonDiv.innerHTML = buttonHtml;
    document.body.appendChild(donateButtonDiv);

    const donationHTMLUrl = "donation.html";
    const iframeModal = document.getElementById("iframe-modal");
    const donationIframe = document.getElementById("donation-iframe");
    const openDonationIframeButton = document.getElementById(
      "open-donation-iframe"
    );
    const closeIframeModalButton =
      document.getElementById("close-iframe-modal");

    async function loadDonationIframe() {
      try {
        const response = await fetch(donationHTMLUrl);
        const donationHTML = await response.text();
        donationIframe.srcdoc = donationHTML;
        iframeModal.style.display = "flex";
      } catch (error) {
        donationIframe.srcdoc =
          "<p>Failed to load the donation form. Please try again later.</p>";
        console.error("Error loading donation form:", error);
      }
    }

    openDonationIframeButton.addEventListener("click", loadDonationIframe);

    // Close the iframe modal
    closeIframeModalButton.addEventListener("click", () => {
      iframeModal.style.display = "none";
    });

    // Adjust iframe dimensions dynamically using postMessage
    window.addEventListener("message", (event) => {
      if (
        iframeModal.style.display === "flex" &&
        event.data &&
        event.data.type === "donation-iframe-dimensions"
      ) {
        donationIframe.style.height = event.data.height + "px";
        donationIframe.style.width = event.data.width + "px";
      }
    });

    window.addEventListener("load", function () {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(() => {
            console.log("Ethereum enabled");

            web3.eth.getAccounts(function (err, acc) {
              if (err != null) {
                self.setStatus("There was an error fetching your accounts");
                return;
              }
              if (acc.length > 0) {
                console.log(acc);
              }
            });
          })
          .catch(() => {
            console.warn("User didn't allow access to accounts.");
          });
      } else {
        console.log(
          "Non-Ethereum browser detected. You should consider installing MetaMask."
        );
      }
    });
  });
})();
