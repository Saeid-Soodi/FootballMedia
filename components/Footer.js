// Component for footer
export default {
  content: function () {
    return `
    <div>
  <div class='footer-flex-justify footer-bg-color'>
      <div>
        <div class='footer-flex-h1'>
        <h1 class='footer-h1'>
        No limit to share your emotion and discuss about soccer here feel free
        </h1>
        </div>
        <div class='footer-line'></div>
        <div class='footer-logo'>
         <h1 class='footer-h1-brand'>Soccer Media</h1>
         <img  src='../assets/images/SoccerMediaLogo.png'></img>
        </div>
        <ul class='footer-ul'>
        <li><a href="/">Home</a></li>
        <li><a href="/Profile">Profile</a></li>
        <li><a href="/Predict">Predict</a></li>
        <li><a href="/myTeam">My Team</a></li>
        <li><a href="/Settings">Settings & Privacy</a></li>
        </ul>
  </div>
  <div class='footer-gif-container-margin'>
       <div class="footer-gif-container">
          <img class="gifImage" autoplay loop muted src="../assets/images/Football.gif"></img>
        </div>
  </div>
 
  </div>
 

  </div>
    `;
  },
};
