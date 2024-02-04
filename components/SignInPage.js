export default {
  content: async function () {
    const title = 'Twitter Sport | SignIn';
    document.title = title;

    let userLogin;
    async function fetchAuth() {
      const auth = await fetch('http://localhost:8080/api/auth', {
        method: 'Get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (auth.status === 500) {
        userLogin = false;
        console.log('userLogin', userLogin);
      } else if (auth.status === 200) {
        userLogin = true;
        window.location.href = '/';
      }
    }
    await fetchAuth();

    return `   <div class="formContainer">
          <h3>SignIn</h3>
          <input type="emai" id="emailInput" placeholder="Email">
          <input type="password" id="passwordInput" placeholder="Password">
          <button class="signInBtn" onclick="handleSignIn()">Sign In</button>
          <div class="dontHaveAccount">
          <p>Don't have an account?</p>
          <a href="/signUp">Sign Up</a>
      </div>
        </div> 
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
      const res = await fetch('http://localhost:8080/api/auth', {
        method: 'POST',
        body: JSON.stringify({
          email: email.value,
          pass: pass.value,
        }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      console.log(data);
      alert('You are Logged In!');
      window.location.href = '/';
    } catch (error) {
      console.error('Error:', error);
    }
  }
};
