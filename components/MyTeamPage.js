// Component for not found Page
export default {
  content: async function () {
    const title = 'Football Media | My Team';
    document.title = title;

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
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="myTeam.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Team</title>
</head>
<body>
    <section class="container">
    <div class="head">
        <h1 class="teamName">Chelsea FC</h1>
        <span class="logo">Football Media</span>
    </div>
    <div class="teamInfo">
        <div class="teamFormation">
            <span class="text">Team Formation</span>
            <img src="./ChelseaForm.jpg" alt="Team Formation">
        </div>
        <div class="teamDesc">
            <p class="title">About Chelsea F.C</p>
            <p class="wikipedia">Chelsea Football Club is an English professional football club based in Fulham, West London. Founded in 1905, the team play their home games at Stamford Bridge.[5] The club competes in the Premier League, the top division of English football. It won its first major honour, the League championship, in 1955. The club won the FA Cup for the first time in 1970, their first European honour, the Cup Winners' Cup, in 1971, and became the third English club to win the Club World Cup in 2022.</p>
            <div class="teamGallery">
                <h2 class="text">Gallery</h2>
                <div class="images">
                    <div class="up">
                        <img src="./teamImage1.jpg" alt="">
                        <img src="./teamImage2.jpg" alt="">
                    </div>
                    <div class="down">
                        <img src="./teamImage3.jpg" alt="">
                        <img src="./teamImage4.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="teamSummery">
            <div class="teamLogo">
                <img src="./Chelsea.svg" alt="">
            </div>
            <div class="teamShortInfo">
               <div class="title">
                <span class="titleItem">Full name :</span>
                <span class="titleItem">Nickname :</span>
                <span class="titleItem">Founded :</span>
                <span class="titleItem">Ground :</span>
                <span class="titleItem">League :</span>
               </div>
               <div class="value">
                <span class="titleValue">Chelsea Football Club</span>
                <span class="titleValue">The Blues</span>
                <span class="titleValue">10 March 1905</span>
                <span class="titleValue">Stamford Bridge</span>
                <span class="titleValue">Premier League</span>
               </div>
            </div>
            <div class="teamPredictPage">
                <span class="text">Want to predict Match?</span>
                <a href=""><img src="./predictImage.jpg" alt="" class="clickHere"></a>
            </div>

        </div>

    </div>
    </section>
</body>
</html>
    `;
  },
};
