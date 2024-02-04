// Component for not found Page
export default {
  content: async function () {
    const title = 'Soccer Media | Profile';
    document.title = title;
    // var id = window.location.toString().split('#')[1];
    // console.log('id :', id);

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
        window.location.href = '/';
      } else if (auth.status === 200) {
        userLogin = true;
      }
    }
    await fetchAuth();

    return `
    <div class="container">
    Profile page
    </div>
    `;
  },
};
