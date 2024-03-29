// Component for not found Page
export default {
  content: async function () {
    const title = '404 | Football Media';
    document.title = title;

    let userLogin;
    let user;
    async function fetchAuth() {
      const auth = await fetch('http://localhost:8080/M00872834/auth', {
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
    <span>Whoops!</span>
    <h2>404 - Page Not Found</h2>
    <img src="../assets/images/notFound.jpg" alt="notFound" class="notFoundImage" />
    ${userLogin ? `<span>Dear ${user.name} are you Lost?</span>` : ''}
    <p>Looks like this page went on vacation.</p >
    <a href="/" class="backToHomeBtn">Back to Home Page</a>
    </div>
    `;
  },
};
