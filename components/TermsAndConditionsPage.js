// Component for Terms And Conditions Page
export default {
  content: async function () {
    const title = 'Terms and Conditions | Football Media';
    document.title = title;

    return `
      <div class="container">
      <div class="policy">
      <h1>Terms And Conditions</h1>
      <h2>What information we collect and why</h2>
      <p>We collect various types of information from you when you visit our website, such as:</p>
      <ul>
          <li>Your name, email address, and other contact details</li>
          <li>Your preferences, interests, and feedback</li>
          <li>Your browsing history, IP address, and device information</li>
          <li>Your payment information, if you make a purchase on our website</li>
      </ul>
      <p>We collect this information for the following purposes:</p>
      <ul>
          <li>To provide you with our products and services</li>
          <li>To improve our website and user experience</li>
          <li>To communicate with you and respond to your inquiries</li>
          <li>To process your orders and transactions</li>
          <li>To comply with our legal obligations and enforce our policies</li>
      </ul>
      <h2>How we use and share the information</h2>
      <p>We use the information we collect from you for the purposes described above. We do not sell, rent, or trade your information with any third parties without your consent, except as required by law or as described below:</p>
      <ul>
          <li>We may share your information with our affiliates, partners, and service providers who help us operate our website and deliver our products and services to you. These third parties are bound by contractual obligations to keep your information confidential and secure.</li>
          <li>We may share your information with law enforcement, regulators, or other authorities if we believe it is necessary to protect our rights, property, or safety, or to comply with a legal request, court order, or subpoena.</li>
          <li>We may share your information with other parties in connection with a merger, acquisition, sale, or other business transaction involving our website or company.</li>
      </ul>
      
      <p>This policy was last updated on February 7, 2024.</p>
  </div>
  <img src="../assets/images/policy.jpg" alt="policy" />
  </div>
      `;
  },
};
