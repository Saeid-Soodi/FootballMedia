// Component for Home Page
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
      <div class="">
    <h3>Change Password</h3>
    <div class="">
      <span>
      <label>Old Password : </label>
      <input type="Password" id="oldPasswordInput" placeholder="Old Password"/>
      </span>
      <span>
      <label>New Password : </label>
      <input type="Password" id="newPasswordInput" placeholder="New Password"/>
      </span>
      <span>
      <label>Repeat New Password : </label>
      <input type="Password" id="repeatNewPasswordInput" placeholder="Repeat New Password"/>
      </span>
      </div>
   
      <button class=""  onclick="changePasswordHandler()">Change Password</button>
      <button class=""  onclick="cancelHandler()">Cancel</button>
        
      </div>

      `;
    } catch (error) {
      console.error('Error fetching Change Password data:', error);
      return '<h2>Error Loading Change Password Page</h2><p>Unable to fetch data.</p>';
    }
  },
};
