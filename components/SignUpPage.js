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

    return `
    <div class="background">
    <div class="container">
    <div class="formContainer"><h3>SignUp</h3>
    <div class="form">
      <input type="text" id="nameInput" placeholder="Name"/>
      <input type="text" id="FamilyNameInput" placeholder="Family Name"/>
      <input type="text" id="userNameInput" placeholder="User Name"/>
      <input placeholder="Birth Date" class="textbox-n" type="text" onfocus="(this.type='date')" onblur="(this.type='text')" id="birthDateInput" />
      <input type="email" id="emailInput" placeholder="Email"/>
      <input type="text" id="phoneInput" placeholder="Phone Number"/>
      <input type="password" id="passwordInput" placeholder="Password" />
      <input type="password" id="repeatPasswordInput" placeholder="Repeat Password" />
      <select
            id="genderInput"
          >
            <option value=""  disabled selected>
              Select Gender
            </option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
<select
      id="favoriteTeamInput"
    >
      <option value=""  disabled selected>
        Select your Favorite Team
      </option>
      <option value="65c1fe6be3d6499b5031b39e">Chelsea FC</option>
      <option value="65c2120026908c0b6257c183">FC Bayern Munich</option>
      <option value="65c2138b26908c0b6257c18b">FC Barcelona</option>
      <option value="65c2151d26908c0b6257c19c">Juventus FC</option>
      <option value="65c2166226908c0b6257c1a3">Manchester United F.C.</option>
      <option value="65c2186326908c0b6257c1aa">Real Madrid CF</option>
    </select>
    </div>
      <button class="signUpBtn"  onclick="handleSignUp()">Sign Up</button>
      <div class="haveAccount">
      <p>Already have an account?</p>
      <a href="/signIn">Sign In</a>
      </div>
    </div>
  </div></div>`;
  },
};

window.handleSignUp = async function () {
  const name = document.getElementById('nameInput');
  const familyName = document.getElementById('FamilyNameInput');
  const userName = document.getElementById('userNameInput');
  const phone = document.getElementById('phoneInput');
  const email = document.getElementById('emailInput');
  const birthDate = document.getElementById('birthDateInput');
  const gender = document.getElementById('genderInput');
  const favoriteTeam = document.getElementById('favoriteTeamInput');
  const pass = document.getElementById('passwordInput');
  const repeatPass = document.getElementById('repeatPasswordInput');

  function validate(item, value) {
    if (item === 'email') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(String(value).toLowerCase());
    }
  }

  if (
    name.value === '' ||
    familyName.value === '' ||
    userName.value === '' ||
    phone.value === '' ||
    email.value === '' ||
    birthDate.value === '' ||
    gender.value === '' ||
    favoriteTeam.value === '' ||
    repeatPass.value === '' ||
    pass.value === ''
  ) {
    return alert('You must fill the form before signing up');
  } else if (pass.value !== repeatPass.value) {
    return alert('Repeat Password does not Match');
  } else if (!validate('email', email.value)) {
    return alert('please enter a valid email');
  } else {
    try {
      const res = await fetch('http://localhost:8080/M00872834/user', {
        method: 'POST',
        body: JSON.stringify({
          name: name.value,
          familyName: familyName.value,
          userName: userName.value,
          email: email.value,
          birthDate: birthDate.value,
          pass: pass.value,
          gender: gender.value,
          favoriteTeam: favoriteTeam.value,
          phone: phone.value,
        }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.status === 201) {
        const logInAuth = await fetch('http://localhost:8080/M00872834/auth', {
          method: 'POST',
          body: JSON.stringify({
            email: email.value,
            pass: pass.value,
          }),
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const logInAuthData = await logInAuth.json();

        alert(
          'Your Account has been successfully created and You are Logged In!'
        );
        window.location.href = '/';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
};
