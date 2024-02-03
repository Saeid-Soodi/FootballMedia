// Component for header
export default {
  content: function () {
    // let authData;
    // async function fetchContent() {
    //   const auth = await fetch('http://localhost:8080/api/auth', {
    //     method: 'Get',
    //     credentials: 'include',
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    //   authData = await auth.json();
    //   console.log(authData);
    // }
    // await fetchContent();

    return `<div>
    <nav>
    <div class="left">
        <img src="../assets/images/SoccerMediaLogo.png" alt="SoccerMediaLogo">
        <span class="text">Soccer Media</span>
      
    </div>
    <ul class="center">
        <li>Home</li>
        <li>Profile</li>
        <li>Predict</li>
        <li>My Team</li>
        <li>Settings & Privacy</li>
    </ul>
    <button class="right">
        Sign In
    </button>
</nav>
    </div>`;
  },
};
