// Component for contact Page
export default {
  content: async function () {
    const title = 'Twitter Sport | Contact Us';
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

    return `<h2>contacts</h2><p>
      <img src="./assets/images/code-snapshot.png" alt="code" /></p>`;
  },
};
