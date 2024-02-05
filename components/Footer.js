// Component for footer
export default {
  content: async function () {
    let userLogin;
    let user;
    async function fetchAuth() {
      const auth = await fetch('http://localhost:8080/api/auth', {
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
    <div>
  <div class='footer-flex-justify footer-bg-color'>
      <div>
        <div class='footer-flex-h1'>
        <h1 class='footer-h1'>
        No limit to share your emotion and discuss about Football here feel free
        </h1>
        </div>
        <div class='footer-line'></div>
        <div class='footer-logo'>
         <h1 class='footer-h1-brand'>Football Media</h1>
         <img  src='../assets/images/FootballMediaLogo.png'></img>
        </div>
        <ul class='footer-ul'>
        <li><a href="/">Home</a></li>
        ${userLogin ? '<li><a href="/profile">Profile</a></li>' : ''}
        
        <li><a href="/predict">Predict</a></li>
        <li><a href="/myTeam">My Team</a></li>
        ${
          userLogin
            ? `
        <li><a href="/settings">Settings</a></li>`
            : ''
        }
        
        </ul>
  </div>
  <div class='footer-gif-container-margin'>
       <div class="footer-gif-container">
          <img class="gifImage" autoplay loop src="../assets/images/Football.gif"></img>
        </div>
  </div>
 
  </div>
 

  </div>
    `;
  },
};
