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
        <span class="text displayNone">Soccer Media</span>
      
    </div>
    <ul class="center">
        <li><a href="/"><i class="bi bi-house-fill"></i> Home</a></li>
        ${userLogin ? '<li><a href="/profile"><i class="bi bi-person-lines-fill"></i> Profile</a></li>' : ''}
        
        <li><a href="/predict"><i class="bi bi-question-circle-fill"></i> Predict</a></li>
        <li><a href="/myTeam"><i class="bi bi-flag-fill"></i> My Team</a></li>
        ${
          userLogin ? '<li><a href="/settings"><i class="bi bi-gear-fill"></i> Settings</a></li>' : ''
        }
    </ul>
    ${
      !userLogin
        ? `<button onclick="signInHandler()" class="right"><i class="bi bi-box-arrow-in-right"></i> Sign In</button>`
        : `<div class="rightLogin">
        <span><i class="bi bi-person-fill"></i>${user.name} </span>
         <button onclick ="logOutHandler()"><i class="bi bi-box-arrow-in-left"></i> Log Out</button>
         <div>`
    }
    
</nav>
    </div>`;
  },
};

// document.addEventListener('DOMContentLoaded', function () {
//   let TextLogo = document.querySelector('.text');
//   TextLogo.addEventListener('mouseover', () => {
//     TextLogo.classList.remove('displayNone');
//     TextLogo.classList.add('displayBlock');
//   });
// });


