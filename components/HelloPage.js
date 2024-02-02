// Component for hello Page
export default {
  content: async function () {
    const title = 'Twitter Sport | Hello';
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

    return `<h2>hello everyone #</h2>`;
  },
};
