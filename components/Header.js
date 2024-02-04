// Component for header
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

    window.signInHandler = function () {
      window.location.href = '/signIn';
    };

    window.logOutHandler = async function () {
      const resSignOut = await fetch('http://localhost:8080/api/signOut', {
        method: 'Get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const ResSignOut = await resSignOut.json();
      console.log('res:', ResSignOut);
      window.location.href = '/signIn';
    };

    return `<div>
    <nav>
    <div class="left">
        <img src="../assets/images/SoccerMediaLogo.png" alt="SoccerMediaLogo">
        <span class="text">Soccer Media</span>
      
    </div>
    <ul class="center">
        <li><a href="/">Home</a></li>
        ${userLogin ? '<li><a href="/profile">Profile</a></li>' : ''}
        
        <li><a href="/predict">Predict</a></li>
        <li><a href="/myTeam">My Team</a></li>
        ${
          userLogin ? '<li><a href="/settings">Settings & Privacy</a></li>' : ''
        }
    </ul>
    ${
      !userLogin
        ? `<button onclick="signInHandler()" class="right">
          Sign In
        </button>`
        : `<div><span>welcome Dear ${user.name} </span> <button onclick ="logOutHandler()">Log Out</button><div>`
    }
    
</nav>
    </div>`;
  },
};
