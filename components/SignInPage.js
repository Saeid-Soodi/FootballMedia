// Component for sign In Page
export default {
  content: async function () {
    const title = 'SignIn | Football Media';
    document.title = title;

    let userLogin;
    async function fetchAuth() {
      const auth = await fetch('http://localhost:8080/M00872834/auth', {
        method: 'Get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (auth.status === 500) {
        userLogin = false;
      } else if (auth.status === 200) {
        userLogin = true;
        window.location.href = '/';
      }
    }
    await fetchAuth();

    return `<div class="container"><div class="background"><img src="../assets/images/closeUpFootball.jpg" alt="" /></div><div class="formContainer">
          <h3>Sign In</h3>
          <input type="email" id="emailInput" placeholder="Email">
          <input type="password" id="passwordInput" placeholder="Password">
          <button class="signInBtn" onclick="handleSignIn()">Sign In</button>
          <div class="dontHaveAccount">
          <p>Don't have an account?</p>
          <a href="/signUp">Sign Up</a>
      </div>
        </div> 
        
      </div>
     
      `;
  },
};

window.handleSignIn = async function () {
  const email = document.getElementById('emailInput');
  const pass = document.getElementById('passwordInput');

  if (email.value === '' || pass.value === '') {
    alert('You must fill the form before signing In');
  } else {
    try {
      const res = await fetch('http://localhost:8080/M00872834/auth', {
        method: 'POST',
        body: JSON.stringify({
          email: email.value,
          pass: pass.value,
        }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.status === 400) {
        return alert(data.message);
      } else {
        alert('You are Logged In!');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
};
