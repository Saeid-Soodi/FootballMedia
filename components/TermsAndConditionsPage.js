// Component for Home Page
export default {
  content: async function () {
    const title = 'Terms and Conditions | Football Media';
    document.title = title;

    try {
      let data;
      let authData;
      async function fetchContent() {
        const auth = await fetch('http://localhost:8080/M00872834/auth', {
          method: 'Get',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        authData = await auth.json();
        // ... do something with the data

        const res = await fetch('http://localhost:8080/M00872834/user');
        data = await res.json();
      }
      await fetchContent();

      return `
      <div class="container">
      <h1>Policy Page</h1>
      <p>This is a sample policy page for your website. You can edit this text to suit your needs.</p>
      <p>This policy page covers the following topics:</p>
      <ul>
          <li>What information we collect and why </></li>
          <li>How we use and share the information</li>
          <li>How we protect the information</li>
          <li>How you can access and update the information</li>
          <li>How you can contact us</li>
      </ul>
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
      <h2>How we protect the information</h2>
      <p>We take reasonable measures to protect your information from unauthorized access, use, disclosure, alteration, or destruction. We use industry-standard encryption, firewalls, and other security technologies to safeguard your information. However, no method of transmission or storage is 100% secure, and we cannot guarantee the absolute security of your information.</p>
      <h2>How you can access and update the information</h2>
      <p>You have the right to access, update, correct, or delete the information we have about you. You can do so by logging into your account on our website, or by contacting us at <a href="mailto:info@yourwebsite.com">info@yourwebsite.com</a>. We may ask you to verify your identity before fulfilling your request.</p>
      <h2>How you can contact us</h2>
      <p>If you have any questions, comments, or concerns about this policy or our privacy practices, please contact us at <a href="mailto:info@yourwebsite.com">info@yourwebsite.com</a> or by mail at:</p>
      <p>Your Website Name<br>
      Your Address<br>
      <p>This policy was last updated on February 7, 2024.</p>
  </div>
      `;
    } catch (error) {
      console.error('Error fetching home data:', error);
      return '<h2>Error Loading Home Page</h2><p>Unable to fetch data.</p>';
    }
  },
};
