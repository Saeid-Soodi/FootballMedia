// Component for Home Page
export default {
  content: async function () {
    const title = 'Home | Football Media';
    document.title = title;

    try {
      let data;
      let authData;
      let user;
      let users;
      let userData;
      let listData;
      let tweetsList;
      let favoriteTeamData;
      async function fetchContent() {
        const auth = await fetch('http://localhost:8080/M00872834/auth', {
          method: 'Get',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        authData = await auth.json();
        // ... do something with the data
        user = {userId:auth.id}
        const res = await fetch('http://localhost:8080/M00872834/user');
        data = await res.json();
        const userRes = await fetch('http://localhost:8080/M00872834/user');
        users = await userRes.json();

        const resUser = await fetch(
          `http://localhost:8080/M00872834/user/${user.userId}`
        );
        userData = await resUser.json();

        // list of followings
        const followings = await fetch(
          `http://localhost:8080/M00872834/followingList/${user.userId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        listData = await followings.json();

        // list of tweets
        const tweets = await fetch(
          `http://localhost:8080/M00872834/tweet/${user.userId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        tweetsList = await tweets.json();

        // favorite team data
        const favoriteTeam = await fetch(
          `http://localhost:8080/M00872834/team/${user.userId}`,
          {
            method: 'Get',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        favoriteTeamData = await favoriteTeam.json();
      }
      await fetchContent();

      // window.followHandler = async function (reqId) {
      //   // follow user
      //   const up = await fetch('http://localhost:8080/M00872834/follow', {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       reqId,
      //       userId: user.userId,
      //     }),
      //     headers: { 'Content-Type': 'application/json' },
      //   });
      //   const data = await up.json();
      //   if (up.status === 200) {
      //     window.location.reload();
      //   }
      // };

      // window.unFollowHandler = async function (reqId) {
      //   // unFollow user
      //   const up = await fetch('http://localhost:8080/M00872834/unFollow', {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       reqId,
      //       userId: user.userId,
      //     }),
      //     headers: { 'Content-Type': 'application/json' },
      //   });
      //   const data = await up.json();
      //   if (up.status === 200) {
      //     window.location.reload();
      //   }
      // };

      window.tweetHandler = async function () {
        const tweetContent = document.getElementById('tweetContent').value;
        if (tweetContent === '') {
          return alert('tweet can not be empty');
        }
        // tweet user
        const up = await fetch('http://localhost:8080/M00872834/tweet', {
          method: 'POST',
          body: JSON.stringify({
            userId: user.userId,
            userNameAndFamilyName: userData.name + ' ' + userData.familyName,
            userName: userData.userName,
            tweetContent,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await up.json();
        if (up.status === 200) {
          alert('tweet added!');
          window.location.reload();
        }
      };

      window.commentHandler = async function (index, tweetId) {
        const commentContent = document.getElementById(
          `commentInput_${index}`
        ).value;
        if (commentContent === '') {
          return alert('comment can not be empty');
        }
        // comment on tweet
        const up = await fetch('http://localhost:8080/M00872834/comment', {
          method: 'POST',
          body: JSON.stringify({
            tweetId,
            userId: userData._id,
            userNameAndFamilyName: userData.name + ' ' + userData.familyName,
            userName: userData.userName,
            commentContent,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await up.json();
        if (up.status === 201) {
          alert('comment added!');
          window.location.reload();
        } else {
          alert(data);
        }
      };

      window.followerLinkHandler = function () {
        window.location.href = `/followers#${user.userId}`;
      };
      window.followingLinkHandler = function () {
        window.location.href = `/followings#${user.userId}`;
      };
      window.likeHandler = async function (button) {
        const tweetId = button.getAttribute('data-tweet-id');
        // like tweet
        const up = await fetch('http://localhost:8080/M00872834/like', {
          method: 'POST',
          body: JSON.stringify({
            tweetId,
            userId: userData._id,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await up.json();
        if (up.status === 201) {
          window.location.reload();
        } else {
          alert(data.message);
        }
      };

      return `
      <div class="container">
      <div class="header">
      <div class="tweets">
      <div class="tweetName">
       <img src="../assets/images/profile.png" alt="img">
       <div class="text">
           <!-- Replace the dynamic name and family name with static values -->
           <span class="name">John Smith</span>
           <!-- Replace the dynamic user name with a static value -->
           <span class="id">@johnsmith</span>
       </div>
      </div>
      <div class="tweeting"">
       <textarea placeholder="What's happening?" cols="65" rows="5" id="tweetContent"></textarea>
     <!-- Remove the onclick attribute from the button -->
     <button>Tweet  <i class="bi bi-send-fill"></i></button>
       </div>
      </div>
      <div class="flex-container">
          <div class="left-sidebar">
          <div class="right-sidebar">
          <div class="container-li">
          
          </div>
          <!-- Add the title for the chart -->
          <div class="title">
              <span>England Football League 2024</span>
         
          <!-- Add the table for the chart -->
          <table class="table">
              <!-- Add the table header row -->
              <tr>
                  <th class="th">Team</th>
                  <th class="th">Points</th>
                  <th class="th">Goals</th>
              </tr>
              <!-- Add the table data rows -->
              <!-- Use some static data for the example -->
              <tr>
                  <td class="td">Liverpool</td>
                  <td class="td">85</td>
                  <td class="td">76</td>
              </tr>
              <tr>
                  <td class="td">Manchester City</td>
                  <td class="td">83</td>
                  <td class="td">81</td>
              </tr>
              <tr>
                  <td class="td">Chelsea</td>
                  <td class="td">75</td>
                  <td class="td">69</td>
              </tr>
              <tr>
                  <td class="td">Manchester United</td>
                  <td class="td">72</td>
                  <td class="td">64</td>
              </tr>
              <tr>
                  <td class="td">Leicester City</td>
                  <td class="td">66</td>
                  <td class="td">58</td>
              </tr>
          </table>
          </div>
          </div>
          </div>


          <div class="main">



             <div class="post">
          <div class="post-header">
            <img src="../assets/images/profile.png" class="post-avatar" alt="Avatar">
            <div class="post-info">
              <span class="post-name">kiarsh alizadeh</span>
              <span class="post-username">@ksha</span>
              <span>2024/12/6</span>
            </div>
          </div>
          <div class="post-content">
            <p>Hi, I'm Copilot, an AI companion that can help you with various tasks. I can generate code, poems, stories, and more. Ask me anything!</p>
          
          </div>
          <div class="post-footer">
            <div class="post-action">
              <!-- snippet for check icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/></svg>              <span class="post-count">12</span>
            </div>
            <div class="post-action">
              <!-- snippet for cross icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>

              <span class="post-count">8</span>
              </div>
              </div>
              <div class='center-input-items'>
              <input class='input-style Placeholder='comment'></input>
              <button class='button-style' >send</botton>
              
              </div>
        </div>   
       </div>


          <div class="right-sidebar">

          
          <section class="input-part">
          <p class="info-txt"></p>
          <div class="content">
           
          <h1 class='center'>London</h1>
          </div>
        </section>
        <img class='center-img' src="" alt="Weather Icon">
        <section class="weather-part">
        
          <div class="temp">
            <span class="numb">_</span>
            <span class="deg">°</span>C
          </div>
          <div class="weather">_ _</div>
          <div class="location">
            <i class='bx bx-map'></i>
            <span>_, _</span>
          </div>
          <div class="bottom-details">
            <div class="column feels">
              <i class='bx bxs-thermometer'></i>
              <div class="details">
                <div class="temp">
                  <span class="numb-2">_</span>
                  <span class="deg">°</span>C
                </div>
                <p>Feels like</p>
              </div>
            </div>
            <div class="column humidity">
              <i class='bx bxs-droplet-half'></i>
              <div class="details">
                <span>_</span>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </section>
          </div>
      </div>
  </div>
  </div>
 

    <p></p>
      <div style="display: flex; flex-direction: column;">

      `;
    } catch (error) {
      console.error('Error fetching home data:', error);
      return '<h2>Error Loading Home Page</h2><p>Unable to fetch data.</p>';
    }
  },
};
