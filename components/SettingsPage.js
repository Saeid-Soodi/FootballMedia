// Component for not found Page
export default {
  content: async function () {
    const title = 'Settings | Football Media';
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
        window.location.href = '/';
      } else if (auth.status === 200) {
        userLogin = true;
      }
    }
    await fetchAuth();

    return `
    <div class="mainSetting">
    <h3>Setting</h3>
    <div class="settingContainer">
      <span>

      <label>Name : </label>
      <input type="text" id="nameInput" placeholder="Name"/>
      </span>
      <span>
      
      <label>Family Name : </label>
       <input type="text" id="FamilyNameInput" placeholder="Family Name"/>
      </span>
      <span>

      <label>User Name : </label>
      <input type="text" id="userNameInput" placeholder="User Name"/>
      </span>
      <span>
      
      <label>Phone Number : </label>
      <input type="text" id="phoneInput" placeholder="Phone Number"/>
      </span>
      <span>
      
      <label>Email : </label>
      <input type="email" id="emailInput" placeholder="Email"/>
      </span>
      <span>
      
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
      </span>
      </div>
   
      <button class="settingBtn"  onclick="handleSignIn()">Sign Up</button>
        <p>Do You Change Your Password ?  <a href="">Click Here</a></p>
      </div>

    `;
  },
};
