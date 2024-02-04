// Component for not found Page
export default {
  content: async function () {
    const title = 'Soccer Media | My Team';
    document.title = title;

    let userLogin;
    let user;
    async function fetchAuth() {
      const auth = await fetch('http://localhost:8080/api/auth', {
        method: 'Get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      user = await auth.json();
      if (auth.status === 500) {
        userLogin = false;
      } else if (auth.status === 200) {
        userLogin = true;
      }
    }
    await fetchAuth();

    return `
    <div class="container">
    My team page
    </div>
    `;
  },
};
