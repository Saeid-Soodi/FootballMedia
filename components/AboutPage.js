// Component for About Page
export default {
  content: async function () {
    const title = 'Twitter Sport | About Us';
    document.title = title;
    let authData;
    async function fetchContent() {
      const auth = await fetch('http://localhost:8080/api/auth', {
        method: 'Get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      authData = await auth.json();
      console.log(authData);
    }
    await fetchContent();

    try {
      return `<h2>About Us</h2><p> this is us</p>`;
    } catch (error) {
      console.error('Error fetching about data:', error);
      return '<h2>Error Loading About Page</h2><p>Unable to fetch data.</p>';
    }
  },
};
