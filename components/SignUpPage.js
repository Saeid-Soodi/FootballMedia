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

    return `<div class="formContainer">
    <h3>SignUp</h3>
      <input type="text" id="nameInput" placeholder="Name"/>
      <input type="text" id="FamilyNameInput" placeholder="Family Name"/>
      <input type="text" id="userNameInput" placeholder="User Name"/>
      <input type="text" id="phoneInput" placeholder="Phone Number"/>
      <input type="email" id="emailInput" placeholder="Email"/>
      <input type="password" id="passwordInput" placeholder="Password" />
      <input type="password" id="repeatPasswordInput" placeholder="Repeat Password" />
      
      <label>Birth Date : </label>
      <input type="date" id="birthDateInput"/>
      
      <label>Gender : </label>
      <select
            id="genderInput"
          >
            <option value=""  disabled selected>
              Select Gender
            </option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
      
      <button class="signUpBtn"  onclick="handleSignIn()">Sign Up</button>

      <div class="haveAccount">
        <p>Don't have an account?</p>
        <a href="/signIn">Sign In</a>
    </div>
      </div>
    
      `;
  },
};

window.handleSignIn = async function () {
  const name = document.getElementById('nameInput');
  const familyName = document.getElementById('FamilyNameInput');
  const userName = document.getElementById('userNameInput');
  const phone = document.getElementById('phoneInput');
  const email = document.getElementById('emailInput');
  const birthDate = document.getElementById('birthDateInput');
  const gender = document.getElementById('genderInput');
  const pass = document.getElementById('passwordInput');
  const repeatPass = document.getElementById('repeatPasswordInput');

  if (
    name.value === '' ||
    familyName.value === '' ||
    userName.value === '' ||
    phone.value === '' ||
    email.value === '' ||
    birthDate.value === '' ||
    gender.value === '' ||
    repeatPass.value === '' ||
    pass.value === ''
  ) {
    alert('You must fill the form before signing up');
  } else if (pass.value !== repeatPass.value) {
    alert('Repeat Password does not Match');
  } else {
    try {
      const res = await fetch('http://localhost:8080/api/user', {
        method: 'POST',
        body: JSON.stringify({
          name: name.value,
          familyName: familyName.value,
          userName: userName.value,
          email: email.value,
          birthDate: birthDate.value,
          pass: pass.value,
          gender: gender.value,
          phone: phone.value,
        }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      console.log(data);
      alert('Your Account has been successfully created!');
      window.location.href = '/';
    } catch (error) {
      console.error('Error:', error);
    }
  }
};
