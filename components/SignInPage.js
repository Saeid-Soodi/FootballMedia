export default {
  content: async function () {
    const title = 'Twitter Sport | SignIn';
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

    return `<h2>Welcome to the SignIn Page</h2>
      <input type="email" id="emailInput" placeholder="email"/>
      <input type="password" id="passwordInput" placeholder="pass" />
      <button id='signInBtn' onclick="handleSignIn()">Sign In</button>
      `;
  },
};

window.handleSignIn = async function () {
  const email = document.getElementById('emailInput');
  const pass = document.getElementById('passwordInput');

  if (email.value === '' || pass.value === '') {
    alert('You must fill the form before signing up');
  } else {
    try {
      const res = await fetch('http://localhost:8080/api/user/auth', {
        method: 'POST',
        body: JSON.stringify({
          email: email.value,
          pass: pass.value,
        }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      // Calculate the expiration date for the cookie
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1); // Add one day to the current date
      const expires = expirationDate.toUTCString();

      // Save the cookie in the browser with dynamic expiration time
      // if (data.data.token) {
      //   const cookieHeader = data.data.token;
      //   document.cookie = `token=${cookieHeader}; expires=${expires}; path=/;`;
      // }
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
};
