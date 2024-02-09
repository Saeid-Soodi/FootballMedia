// Component for header
export default {
  content: async function () {
    let userLogin
    let user
    async function fetchAuth() {
      const auth = await fetch('http://localhost:8080/M00872834/auth', {
        method: 'Get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      user = await auth.json()
      if (auth.status === 500) {
        userLogin = false
      } else if (auth.status === 200) {
        userLogin = true
      }
    }

    await fetchAuth()

    window.signInHandler = function () {
      window.location.href = '/signIn'
    }

    window.logOutHandler = async function () {
      const resSignOut = await fetch(
        'http://localhost:8080/M00872834/signOut',
        {
          method: 'Get',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const ResSignOut = await resSignOut.json()
      window.location.href = '/signIn'
    }

    return `<div>
    <nav>
    <div class="left">
        <img src="../assets/images/FootballMediaLogo.png" alt="FootballMediaLogo">
        <span class="text displayNone">Football Media</span>
      
    </div>
    <ul class="center">
        <li><a class="${
          window.location.pathname === '/' ? 'navActive' : null
        }" href="/"><i class="bi bi-house-fill"></i> Home</a></li>
        ${
          userLogin
            ? `<li><a class="${
                window.location.pathname === '/profile' ? 'navActive' : null
              }" href="/profile"><i class="bi bi-person-lines-fill"></i> Profile</a></li>`
            : ''
        }
        
        <li><a class="${
          window.location.pathname === '/predict' ? 'navActive' : null
        }" href="/predict"><i class="bi bi-question-circle-fill"></i> Predict</a></li>
        <li><a class="${
          window.location.pathname === '/myTeam' ? 'navActive' : null
        }" href="/myTeam"><i class="bi bi-flag-fill"></i> My Team</a></li>
      
          <li><a class="${
            window.location.pathname === '/termsAndConditions'
              ? 'navActive'
              : null
          }" href="/termsAndConditions"><i class="bi bi-book-half"></i> Privacy</a></li>
          ${
            userLogin
              ? `<li><a class="${
                  window.location.pathname === '/settings' ? 'navActive' : null
                }" href="/settings"><i class="bi bi-gear-fill"></i> Settings</a></li>`
              : ''
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
    </div>`
  },
}

// document.addEventListener('DOMContentLoaded', function () {
//   let TextLogo = document.querySelector('.text');
//   TextLogo.addEventListener('mouseover', () => {
//     TextLogo.classList.remove('displayNone');
//     TextLogo.classList.add('displayBlock');
//   });
// });
