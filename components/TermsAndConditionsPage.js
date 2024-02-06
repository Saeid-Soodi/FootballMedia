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
      <h2>Welcome to the TermsAndConditionsPage Page</h2>
      `;
    } catch (error) {
      console.error('Error fetching home data:', error);
      return '<h2>Error Loading Home Page</h2><p>Unable to fetch data.</p>';
    }
  },
};
