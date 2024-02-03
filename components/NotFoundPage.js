// Component for not found Page
export default {
  content: async function () {
    const title = 'Twitter Sport | Not Found';
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

    return `<h2>404 - Page Not Found!</h2>
    <p>Sorry ,the requested page does not exist!</p >`;
  },
};
