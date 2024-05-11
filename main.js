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

    window.addEventListener("message", (event) => {
      if (event.data && event.data.type === "donation-iframe-dimensions") {
        const donationIframe = document.getElementById("donation-iframe");
        donationIframe.style.height = `${event.data.height}px`;
        donationIframe.style.width = `${event.data.width}px`;
      }
    });
  });
})();
