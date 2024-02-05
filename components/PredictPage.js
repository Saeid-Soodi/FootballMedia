// Component for not found Page
export default {
  content: async function () {
    const title = 'Soccer Media | Predict';
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

    let firstTeam = 'Chelsea';
    let secondTeam = 'Liverpool';
    window.predictionHandler = async function () {
      const firstTeamPrediction = document.getElementById(
        'firstTeamPrediction'
      );
      const secondTeamPrediction = document.getElementById(
        'secondTeamPrediction'
      );

      try {
        const res = await fetch(
          `http://localhost:8080/api/user/${user.userId}`,
          {
            method: 'PATCH',
            body: JSON.stringify({
              predictions: {
                firstTeam,
                secondTeam,
                firstTeamPrediction: firstTeamPrediction.value,
                secondTeamPrediction: secondTeamPrediction.value,
                predictionDate: Date.now(),
              },
            }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const data = await res.json();

        console.log(data);
        if (res.status === 200) {
          alert('Prediction Submitted!');
        } else {
          alert('something went wrong!');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // print the date time
    // const timestamp = 1707140193558;
    // const date = new Date(timestamp);
    // console.log(date);

    return `
    <div class="container">
    <img class="imageContainer" draggable="false" src="../assets/images/footballGround.jpg" alt="footballGround" />
    <div class="content">
    <div class="upComingMatch">UpComing Match</div>
    <div class="teams"><img draggable="false" src="../assets/images/Team Logo/Chelsea.svg" alt="Chelsea" /> <span>VS</span> <img draggable="false" src="../assets/images/Team Logo/Liverpool.svg" alt="Liverpool" /></div>
    <div class="predictions"><div><input value="0" min="0" max="20" type="number" id="firstTeamPrediction" /><input value="0"  min="0" max="20" type="number" id="secondTeamPrediction" /></div> <button class="predictBtn" onclick="predictionHandler()">Predict</button></div>
    </div>
    </div>
    `;
  },
};
