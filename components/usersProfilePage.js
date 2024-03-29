// Component for Users Profile Page
export default {
  content: async function () {
    let id = window.location.toString().split('#')[1];

    let user;
    let users;
    let userData;
    let loggedInUser;
    let listData;
    let tweetsList;
    let favoriteTeamData;

    async function fetchAuth() {
      const auth = await fetch('http://localhost:8080/M00872834/auth', {
        method: 'Get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      user = await auth.json();
      if (auth.status === 500) {
        const userLogin = false;

        // set redirect
        const url = window.location.toString();
        let d = new Date();
        d.setTime(d.getTime() + 2 * 60 * 60 * 1000);
        let expires = 'expires=' + d.toUTCString();
        document.cookie = 'redirect=' + url + '; ' + expires + '; path=/;';

        window.location.href = '/signIn';
      } else if (auth.status === 200) {
        const userLogin = true;
      }
      const res = await fetch('http://localhost:8080/M00872834/user');
      users = await res.json();

      const resLoggedInUser = await fetch(
        `http://localhost:8080/M00872834/user/${user.userId}`
      );
      loggedInUser = await resLoggedInUser.json();
      const resUser = await fetch(`http://localhost:8080/M00872834/user/${id}`);
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
        `http://localhost:8080/M00872834/tweet/${id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      tweetsList = await tweets.json();

      // favorite team data
      const favoriteTeam = await fetch(
        `http://localhost:8080/M00872834/team/${id}`,
        {
          method: 'Get',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      favoriteTeamData = await favoriteTeam.json();
    }
    await fetchAuth();

    window.followHandler = async function (reqId) {
      // follow user
      const up = await fetch('http://localhost:8080/M00872834/follow', {
        method: 'POST',
        body: JSON.stringify({
          reqId,
          userId: user.userId,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await up.json();
      if (up.status === 200) {
        window.location.reload();
      }
    };

    window.unFollowHandler = async function (reqId) {
      // unFollow user
      const up = await fetch('http://localhost:8080/M00872834/unFollow', {
        method: 'POST',
        body: JSON.stringify({
          reqId,
          userId: user.userId,
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
          userId: loggedInUser._id,
          userNameAndFamilyName:
            loggedInUser.name + ' ' + loggedInUser.familyName,
          userName: loggedInUser.userName,
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
      window.location.href = `/followers#${id}`;
    };
    window.followingLinkHandler = function () {
      window.location.href = `/followings#${id}`;
    };

    window.tweetLikeHandler = async function (button) {
      const tweetId = button.getAttribute('data-tweet-id');
      // like tweet
      const up = await fetch('http://localhost:8080/M00872834/like', {
        method: 'POST',
        body: JSON.stringify({
          tweetId,
          userId: user.userId,
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
          userId: user.userId,
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

    const title = `${
      userData.name + ' ' + userData.familyName
    } | Football Media`;
    document.title = title;

    return `
    <div class="container">
    <div class="right">
    <div ><img class="image" src="../assets/images/upImage.jpg" alt="" /></div>
    <div class="suggestions">
      <h3>Suggestions</h3>
      ${
        users.length >= 1
          ? users
              .map((User) => {
                const isFollowing = listData.some(
                  (followingUser) => followingUser.id === User._id
                );
                if (User._id === user.userId) {
                  return;
                }
                return `<div class="suggestionsUser">
                <a href="/usersProfile#${User._id}" class="details">
        <img class="userImage" src="../assets/images/profile.png" alt="" />
        <span class="userDetails">
        <span class="detailName">${User.name + ' ' + User.familyName}</span>
        <span class="detailId">@${User.userName}</span>
        </span>
        </a>
        ${
          isFollowing
            ? ` <button
              class="unFollowBtn"
              onclick="unFollowHandler('${User._id}')"
            >
              UnFollow
            </button>`
            : `<button
              class="followBtn"
              onclick="followHandler('${User._id}')"
            >
              Follow
            </button>`
        }
        
      </div>`;
              })
              .join(' ')
          : '<div>no User Found!</div>'
      }
      
    </div>
    <div class="predictions"></div>
    <a href="${window.location.toString()}" class="shareProfile">
            <span><i class="bi bi-share-fill"></i> Share</span>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.toString()}" alt="qrCode">
        </a>
    </div>
    <div class="left">
    <div class="bio">
        <div class="profileImg">
            <img src="../assets/images/profile.png" alt="profileImg">
        </div>
        <div class="profileDesc">
            <div class="text">
                <span class="name">${
                  userData.name + ' ' + userData.familyName
                }</span>
                <span class="id">@${userData.userName}</span>
            </div>
            <div class="stats">
                <span>${tweetsList.length} Tweets</span>
                <button onclick="followerLinkHandler()"><span>${
                  userData.followers.length
                } Follower</span></button>
                <button onclick="followingLinkHandler()"><span>${
                  userData.followings.length
                } Following</span></button>
                 <div class="favoriteTeam"><img src="${
                   favoriteTeamData.teamLogo
                 }" alt="${favoriteTeamData.teamName}" />
   </div>
                
            </div><div class="desc">
            ${
              userData.bio != ''
                ? `
                <p class="text"><span><i class="bi bi-card-text"> </i>${userData.bio} </span></p>
                `
                : ''
            }
            ${
              userData.yourLink != ''
                ? `<a href="${userData.link}" class="bioLink"><i class="bi bi-link-45deg"></i> ${userData.yourLink}</a>`
                : ''
            }
            </div>
        </div>
        </div>
      
        ${
          tweetsList.length === 0
            ? `<div style="color:white">You haven't tweeted anything yet.</div>`
            : tweetsList
                .reverse()
                .map((tweet, index) => {
                  const { date, time } = getDateTime(tweet.createdAt);
                  return `
        <div class="userTweet">
            <div class="userInfo">
                <img src="../assets/images/profile.png" alt="">
                <div class="text">
                    <span class="name">${
                      userData.name + ' ' + userData.familyName
                    }</span>
                    <span class="id">@${userData.userName}</span>
                </div>
            </div>
            <p class="userLastTweet">${tweet.tweetContent}
           </p>
           <div class="userIntract">
            <div>
            <button onclick="tweetLikeHandler(this)" data-tweet-id="${
              tweet._id
            }" class="likes">${
                    tweet.likes.includes(user.userId)
                      ? '<i class="bi bi-heart-fill"></i>'
                      : '<i class="bi bi-heart"></i>'
                  } ${tweet.likes.length}</button>
            <span class="comments"><i class="bi bi-chat-right-text"></i> ${
              tweet.comments.length
            }</span>
             </div>
            <span class="time"><i class="bi bi-calendar-week-fill"></i> ${date} , <i class="bi bi-clock"></i> ${time}</span>
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

               return `<div class="comment">
               <a href="${
                 comment.userId === user.userId
                   ? '/profile'
                   : '/usersProfile#' + comment.userId
               }" class="userInfo">
               <div>
                <img src="../assets/images/profile.png" alt="">
                <div class="text">
                    <span class="name">${comment.userNameAndFamilyName}</span>
                    <span class="id">@${comment.userName}</span>
                </div>
            </div>
            <span class="time"><i class="bi bi-calendar-week-fill"></i> ${date} , <i class="bi bi-clock"></i> ${time} </span>
                </a>
                <div class="othersComment">
                <p>${comment.commentContent}</p>
                <button onclick="commentLikeHandler(this)" data-tweet-id="${
                  tweet._id
                }" data-comment-id="${index}">${
                 comment.likes.includes(user.userId)
                   ? '<i class="bi bi-heart-fill"></i>'
                   : '<i class="bi bi-heart"></i>'
               } ${comment.likes.length}</button>
                  </div>
                </div>`;
             })
             .join('')}

           </div>
           <div class="userInfo" id="comment" >
                       <input type="text" id="commentInput_${index}" class="comment" placeholder="add a comment for ${
                    userData.name
                  }">
                       <button class="commentBtn" onclick='commentHandler(${index}, "${
                    tweet._id
                  }")'>comment</button>
                   </div>
           </div>
           `;
                })
                .join('')
        }
        
            
    </div>
    </div>
    `;
  },
};
