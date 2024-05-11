(function () {
  // Load the external CSS and JavaScript files
  function loadExternalFiles() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "donation.css";
    document.head.appendChild(link);

    const web3Script = document.createElement("script");
    web3Script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/web3/4.8.0/web3.min.js";
    web3Script.onload = () => {
      const donationScript = document.createElement("script");
      donationScript.src = "donation.js";
      document.head.appendChild(donationScript);
    };
    document.head.appendChild(web3Script);
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadExternalFiles();

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
    const donationIframe = document.getElementById("donation-iframe");
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

    window.addEventListener("message", (event) => {
      if (
        iframeModal.style.display !== "none" &&
        event.data &&
        event.data.type === "donation-iframe-dimensions"
      ) {
        donationIframe.style.height = `${event.data.height}px`;
        donationIframe.style.width = `${event.data.width}px`;
      }
    });
  });
})();
