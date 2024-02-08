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
   <div class="header">
      <h2>Settings</h2>
      <img class="profileImage" src="./assets/images/profile.png" alt="" />
   </div>

 
    <div class="settingContainer">
      <div>
          <span>
          <label>Name : </label>
          <input type="text" id="nameInput" placeholder="Name"/>
          </span>
         
          
          <span>
          <label>Phone Number : </label>
          <input type="text" id="phoneInput" placeholder="Phone Number"/>
          </span>

          <span>

          <label>User Name : </label>
          <input type="text" id="userNameInput" placeholder="User Name"/>

          </span>

          <span>
            <label>Birth Date : </label>
            <input type="date" id="birthDateInput"/>
          </span>
          
          
      </div>
      

      
      <div>
          <span>
              
          <label>Family Name : </label>
          <input type="text" id="FamilyNameInput" placeholder="Family Name"/>
          </span>
         
          <span>
          
          <label>Email : </label>
          <input type="email" id="emailInput" placeholder="Email"/>
          </span>

          <span>
          
          <label>Favorite Team: </label>
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
    </div>
    <textarea class="textArea" name="" id="" cols="30" rows="3" placeHolder="Please Enter Your Bio"></textarea>
   
      <button class="settingBtn"  onclick="handleSignIn()">Change</button>
        <p>Do You want to Change Your Password ?  <a href="/changePassword">Click Here</a></p>
      </div>

    `;
  },
};
