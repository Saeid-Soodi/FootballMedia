// Component for profile Page
export default {
  content: async function () {
    let user;
    let users;
    let userData;
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
        window.location.href = '/';
      } else if (auth.status === 200) {
        const userLogin = true;
      }

      const res = await fetch('http://localhost:8080/M00872834/user');
      users = await res.json();

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
                return `<a href="/usersProfile#${
                  User._id
                } " class="suggestionsUser">
                <span class="details">
        <img class="userImage" src="../assets/images/profile.png" alt="" />
        <span class="userDetails">
        <span class="detailName">${User.name + ' ' + User.familyName}</span>
        <span class="detailId">@${User.userName}</span>
        </span>
        </span>
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
        
      </a>`;
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
                }" alt="${favoriteTeamData.teamName}" /> </div>
            </div>
            <div class="desc">
                ${
                  userData.bio != ''
                    ? `
                <p class="text"><span><i class="bi bi-card-text"> </i>${userData.bio} </span></p>
                `
                    : ''
                }
            <a href="${window.location.toString()}" class="bioLink"><i class="bi bi-link-45deg"></i> Your Link</a>
            </div>
        </div>
        </div>
        <div class="tweets">
        <div class="tweetName">
         <img src="../assets/images/profile.png" alt="img">
         <div class="text">
             <span class="name">${
               userData.name + ' ' + userData.familyName
             }</span>
             <span class="id">@${userData.userName}</span>
         </div>
        </div>
        <div class="tweeting"">
         <textarea placeholder="What's happening?" cols="65" rows="5" id="tweetContent"></textarea>
       <button onclick="tweetHandler()">Tweet &nbsp; <i class="bi bi-send-fill"></i></button>
         </div>
        </div>${
          tweetsList.length === 0
            ? `<div>You has not tweet anything</div>`
            : tweetsList
                .reverse()
                .map((tweet, index) => {
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
            <button onclick="likeHandler(this)" data-tweet-id="${
              tweet._id
            }" class="likes">
            ${
              tweet.likes.includes(userData._id)
                ? '<i class="bi bi-heart-fill"></i>'
                : '<i class="bi bi-heart"></i>'
            } ${tweet.likes.length}</button>
            <span class="comments"><i class="bi bi-chat-right-text"></i> ${
              tweet.comments.length
            }</span>
             </div>
            <span class="time"><i class="bi bi-clock"></i> ${
              tweet.createdAt
            }</span>
           </div>
           <div class="commentsSection">
           ${
             tweet.comments != 0
               ? `<h4>Comments: </h4>
           `
               : ''
           }
           
           ${tweet.comments
             .map((comment) => {
               return `
               <div class="comment">
                    <div class="userInfo">
                        <img src="../assets/images/profile.png" alt="userProfile">
                        <div class="text">
                          <span class="name">${comment.userNameAndFamilyName}</span>
                          <span class="id">@${comment.userName}</span>
                        </div>
                    </div>
                    <div class="othersComment">
                    <p>${comment.commentContent}</p>
                    <span class="time"><i class="bi bi-clock"></i> ${tweet.createdAt}</span>
                    </div>
              </div>`;
             })
             .join('')}

           </div>
           <div class="userInfo" id="comment" >
                       <input type="text" id="commentInput_${index}" class="comment" placeholder="add a comment for yourself">
                       <button class="commentBtn" onclick='commentHandler(${index}, "${
                    tweet._id
                  }")'>comment</button>
                   </div>
           </div>`;
                })
                .join('')
        }
          
    </div>
    </div>
    `;
  },
};
