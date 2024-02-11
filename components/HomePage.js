// Component for Home Page
export default {
  content: async function () {
    const title = 'Home | Football Media';
    document.title = title;

    try {
      let data;
      let authData;
      let userLogin;
      let user;
      let users;
      let listData;
      let tweetsList;
      let favoriteTeamData;
      let wether;
      let footballLeagueList;

      async function fetchContent() {
        // get login user
        const auth = await fetch('http://localhost:8080/M00872834/auth', {
          method: 'Get',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        authData = await auth.json();
        if (auth.status === 500) {
          userLogin = false;
        } else if (auth.status === 200) {
          userLogin = true;
        }

        // get login user data
        const resUser = await fetch(
          `http://localhost:8080/M00872834/user/${authData.userId}`
        );
        user = await resUser.json();

        // get all users data
        const usersRes = await fetch('http://localhost:8080/M00872834/user');
        users = await usersRes.json();

        // list of tweets
        const tweets = await fetch('http://localhost:8080/M00872834/tweet', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        tweetsList = await tweets.json();

        const resWether = await fetch(
          'https://api.weatherapi.com/v1/current.json?key=8d1867c0eb6447ea876202032240802&q=london'
        );
        wether = await resWether.json();

        // get FootballLeague list
        const resFootballLeague = await fetch(
          'http://localhost:8080/M00872834/footballLeague'
        );
        footballLeagueList = await resFootballLeague.json();
      }
      await fetchContent();

      window.tweetHandler = async function () {
        const tweetContent = document.getElementById('tweetContent').value;
        if (tweetContent === '') {
          return alert('tweet can not be empty');
        }
        // tweet user
        const up = await fetch('http://localhost:8080/M00872834/tweet', {
          method: 'POST',
          body: JSON.stringify({
            userId: user._id,
            userNameAndFamilyName: user.name + ' ' + user.familyName,
            userName: user.userName,
            tweetContent,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await up.json();
        if (up.status === 200) {
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
            userId: user._id,
            userNameAndFamilyName: user.name + ' ' + user.familyName,
            userName: user.userName,
            commentContent,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await up.json();
        if (up.status === 201) {
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

      window.tweetLikeHandler = async function (button) {
        const tweetId = button.getAttribute('data-tweet-id');
        // like tweet
        const up = await fetch('http://localhost:8080/M00872834/like', {
          method: 'POST',
          body: JSON.stringify({
            tweetId,
            userId: user._id,
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

      window.commentLikeHandler = async function (button) {
        const tweetId = button.getAttribute('data-tweet-id');
        const commentIndex = button.getAttribute('data-comment-id');
        // like tweet
        const up = await fetch('http://localhost:8080/M00872834/likeComment', {
          method: 'POST',
          body: JSON.stringify({
            tweetId,
            commentIndex,
            userId: user._id,
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

      // Function to extract date and time components from a given date string
      function getDateTime(dateString) {
        // Check the input format
        if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateString)) {
          throw new Error('Invalid date and time format.');
        }

        // Convert the string to a Date object
        const dateObject = new Date(dateString);

        // Extract the date and time
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // 0-based index
        const day = dateObject.getDate();
        const hour = dateObject.getHours().toString().padStart(2, '0');
        const minute = dateObject.getMinutes().toString().padStart(2, '0');
        const second = dateObject.getSeconds().toString().padStart(2, '0');

        // Format the date and time
        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = `${hour}:${minute}:${second}`;

        // Return the values
        return {
          date: formattedDate,
          time: formattedTime,
        };
      }

      return `
      <div class="banner">
      <img  src="../assets/images/twitterHeader.jpg" alt="twitterHeader" />
      </div>
      <div class="container">
      
          <div class="left-sidebar">
          
          <!-- Add the title for the chart -->
          <div class="title">
              England Football League <span>2024 <img src="../assets/images/FootballMediaLogo.png" alt="" /></span>
         </div>
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
              ${footballLeagueList
                .map((item) => {
                  return `<tr>
                    <td class="td">${item.teamName}</td>
                    <td class="td">${item.points}</td>
                    <td class="td">${item.goals}</td>
                </tr>`;
                })
                .join('')}
          </table>
          </div>


          <div class="tweetSection">
          ${
            userLogin
              ? `<div class="newTweet">
      <div class="tweetName">
       <img src="../assets/images/profile.png" alt="img">
       <div class="text">
           <span class="name">${user.name + ' ' + user.familyName}</span>
           <span class="id">@${user.userName}</span>
       </div>
      </div>
      <div class="tweeting">
       <textarea placeholder="What's happening?" cols="65" rows="5" id="tweetContent"></textarea>
     <!-- Remove the onclick attribute from the button -->
     <button onclick="tweetHandler()">Tweet <i class="bi bi-send-fill"></i></button>
       </div>
      </div>`
              : ''
          }
          
      
 ${
   tweetsList.length === 0
     ? `<div>There is no tweet in Football Media</div>`
     : tweetsList
         .reverse()
         .map((tweet, index) => {
           const { date, time } = getDateTime(tweet.createdAt);
           return `
        <div class="userTweet">
            <a href="${
              tweet.userId === user._id
                ? '/profile'
                : '/usersProfile#' + tweet.userId
            }" class="userInfo">
                <img src="../assets/images/profile.png" alt="">
                <div class="text">
                    <span class="name">${tweet.userNameAndFamilyName}</span>
                    <span class="id">@${tweet.userName}</span>
                </div>
            </a>
            <p class="userLastTweet">${tweet.tweetContent}
           </p>
           <div class="userIntract">
            <div>
            <button ${
              userLogin ? '' : 'disabled'
            }  onclick="tweetLikeHandler(this)" data-tweet-id="${
             tweet._id
           }" class="likes">
            ${
              tweet.likes.includes(user._id)
                ? '<i class="bi bi-heart-fill"></i>'
                : '<i class="bi bi-heart"></i>'
            } ${tweet.likes.length}</button>
            <span class="comments"><i class="bi bi-chat-right-text"></i> ${
              tweet.comments.length
            }</span>
             </div>
            <span class="time"> <i class="bi bi-calendar-week-fill"></i> ${date} , <i class="bi bi-clock"></i> ${time}</span>
           </div>
           <div class="commentsSection">
           ${
             tweet.comments != 0
               ? `<h4>Comments: </h4>
           `
               : ''
           }
           
           ${tweet.comments
             .map((comment, index) => {
               const { date, time } = getDateTime(comment.dateTime);

               return `
               <div class="comment">
               <a href="${
                 comment.userId === user._id
                   ? '/profile'
                   : '/usersProfile#' + comment.userId
               }" class="userInfo">
               <div>
               <img src="../assets/images/profile.png" alt="userProfile">
               <div class="text">
                 <span class="name">${comment.userNameAndFamilyName}</span>
                 <span class="id">@${comment.userName}</span>
               </div>
             </div>
               <div class="time"><i class="bi bi-calendar-week-fill"></i> ${date} , <i class="bi bi-clock"></i> ${time}
               </div>
             </a>
                    <div class="othersComment">
                    <p>${comment.commentContent}</p>
                    <button ${
                      userLogin ? '' : 'disabled'
                    } onclick="commentLikeHandler(this)" data-tweet-id="${
                 tweet._id
               }" data-comment-id="${index}">${
                 comment.likes.includes(user._id)
                   ? '<i class="bi bi-heart-fill"></i>'
                   : '<i class="bi bi-heart"></i>'
               } ${comment.likes.length}</button>
                    </div>
              </div>`;
             })
             .join('')}

           </div>
           ${
             userLogin
               ? `<div class="userInfo" id="comment" >
                       <input type="text" id="commentInput_${index}" class="comment" placeholder="${
                   tweet.userId === user._id
                     ? 'add a comment for yourself'
                     : `${'add a comment for ' + tweet.userNameAndFamilyName}`
                 }">
                       <button class="commentBtn" onclick='commentHandler(${index}, "${
                   tweet._id
                 }")'>comment</button>
                   </div>`
               : ''
           }
           
           </div>`;
         })
         .join('')
 }
          
    </div>        
              
    <div class="right-sidebar">

    
    <section class="input-part">
    <p class="info-txt"></p>
    <div class="content">
     
    <h1 class='weatherTitle'>Can we play today?</h1>
    </div>
  </section>
  <img class='center-img' src="${
    wether.current.condition.icon
  }" alt="Weather Icon">
  <section class="weather-part">
  <div class="weather">${wether.current.condition.text}</div>
  
    <div class="temp">
      ${wether.current.feelslike_c}
      <sup>°</sup>C
    </div>
    <div class="location">
      
      <span><i class="bi bi-geo-alt"></i>${wether.location.name}, ${
        wether.location.country
      }</span>
    </div>
    <div class="bottom-details">
    <div class="humidity">
      ${
        wether.current.humidity
      }<div> <i class="bi bi-moisture"></i> Humidity</div> </div>
    <div class="localTime"><i class="bi bi-calendar-week"></i>  ${
      wether.location.localtime
    }</div>
      
               
    </div>
  </section>
    </div>
</div>
</div>
        </div>   


 
      `;
    } catch (error) {
      console.error('Error fetching home data:', error);
      return '<h2>Error Loading Home Page</h2><p>Unable to fetch data.</p>';
    }
  },
};
