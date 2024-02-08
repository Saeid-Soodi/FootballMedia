// Component for change Password Page
export default {
  content: async function () {
    const title = 'Change Password | Football Media';
    document.title = title;

    try {
      let user;
      let userLogin;
      let userData;
      async function fetchContent() {
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

        const res = await fetch(
          `http://localhost:8080/M00872834/user/${user.userId}`
        );
        userData = await res.json();
        console.log(userData);
      }
      await fetchContent();

      window.changePasswordHandler = async function () {
        const oldPassword = document.getElementById('oldPasswordInput');
        const newPassword = document.getElementById('newPasswordInput');
        const repeatNewPassword = document.getElementById(
          'repeatNewPasswordInput'
        );

        if (
          oldPassword.value === '' ||
          newPassword.value === '' ||
          repeatNewPassword.value === ''
        ) {
          alert('You must fill the form before changePassword');
        } else if (newPassword.value !== repeatNewPassword.value) {
          alert('Repeat Password does not Match');
        } else {
          try {
            const res = await fetch(
              `http://localhost:8080/M00872834/user/${userData._id}`,
              {
                method: 'PATCH',
                body: JSON.stringify({
                  oldPass: oldPassword.value,
                  pass: newPassword.value,
                }),
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
              }
            );
            const data = await res.json();
            if (res.status === 201) {
              alert('your Password has been changed, please sign In again');
              const resSignOut = await fetch(
                'http://localhost:8080/M00872834/signOut',
                {
                  method: 'Get',
                  credentials: 'include',
                  headers: { 'Content-Type': 'application/json' },
                }
              );
              const ResSignOut = await resSignOut.json();
              window.location.href = '/signIn';
            } else {
              alert(data.message);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
      };

      window.cancelHandler = async function () {
        window.location.href = '/settings';
      };

      return `
      <div class="container">
      <div class="right"><img src="../assets/images/footballPlayers.jpg" alt="footballPlayers" />
      <div class="quote"><i class="bi bi-quote"></i><q>I start early, and I stay late, day after day, year after year. It took me 17 years and 114 days to become an overnight success.</q> <span>Lionel Messi</span></div>
      </div>
      <div class="left">
      <span class="brand"><span class="color">F</span>ootball <span class="color">M</span>edia</span>
      <div class="details">
      <h3>Change Password</h3>
      <p>Just type it twice and try not to forget it.
Password should be and must contain:</p>
<div class="items">
<span class="item">
<span class="top">8+</span>
<span class="bottom">Character</span>
</span>
<span class="item">
<span class="top">AA</span>
<span class="bottom">Uppercase</span>
</span>
<span class="item">
<span class="top">aa</span>
<span class="bottom">Lowercase</span>
</span>
<span class="item">
<span class="top">123</span>
<span class="bottom">Number</span>
</span>
<span class="item">
<span class="top">@$#</span>
<span class="bottom">Symbol</span>
</span>
</div>
      </div>
      <div class="form">
      
      <span class="item">
      <label>Old Password : </label>
      <input type="Password" id="oldPasswordInput" placeholder="Old Password"/>
      </span>
      <span class="item">
      <label>New Password : </label>
      <input type="Password" id="newPasswordInput" placeholder="New Password"/>
      </span>
      <span class="item">
      <label>Repeat New Password : </label>
      <input type="Password" id="repeatNewPasswordInput" placeholder="Repeat New Password"/>
      </span>
      <button class=""  onclick="changePasswordHandler()">Change Password</button>
      <a href="/settings">Back to Settings</a>
      </div>
      </div>
      
    
    
    
    
</div>
      `;
    } catch (error) {
      console.error('Error fetching Change Password data:', error);
      return '<h2>Error Loading Change Password Page</h2><p>Unable to fetch data.</p>';
    }
  },
};
