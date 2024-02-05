// Component for not found Page
export default {
  content: async function () {
    const title = 'Football Media | Profile';
    document.title = title;

    let user;
    let users;
    let userData;
    let listData;
    let tweetsList;

    async function fetchAuth() {
      const auth = await fetch('http://localhost:8080/api/auth', {
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

      const res = await fetch('http://localhost:8080/api/user');
      users = await res.json();

      const resUser = await fetch(
        `http://localhost:8080/api/user/${user.userId}`
      );
      userData = await resUser.json();

      // list of followings
      const followings = await fetch(
        `http://localhost:8080/api/followingList/${user.userId}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      listData = await followings.json();

      // list of tweets
      const tweets = await fetch(
        `http://localhost:8080/api/tweet/${user.userId}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      tweetsList = await tweets.json();
    }
    await fetchAuth();

    window.followHandler = async function (reqId) {
      // follow user
      const up = await fetch('http://localhost:8080/api/follow', {
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
      const up = await fetch('http://localhost:8080/api/unFollow', {
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

    window.followerLinkHandler = function () {
      window.location.href = `/followers#${user.userId}`;
    };
    window.followingLinkHandler = function () {
      window.location.href = `/followings#${user.userId}`;
    };

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
    <div class="shareProfile">
            <span><i class="bi bi-share-fill"></i> Share</span>
            <img src="../assets/images/qrCode.png" alt="">
        </div>
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
             <span class="name">Saeed</span>
             <span class="id">@Saeedsi</span>
         </div>
        </div>
        <div class="tweeting"">
         <textarea placeholder="What's happening?" cols="65" rows="5"></textarea>
       <button>Tweet &nbsp; <i class="bi bi-send-fill"></i></button>
         </div>
        </div>
        <div class="userTweet">
            <div class="userInfo">
                <img src="../assets/images/profile.png" alt="">
                <div class="text">
                    <span class="name">Saeed</span>
                    <span class="id">@Saeedsi</span>
                </div>
            </div>
            <p class="userLastTweet">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, iste
           </p>
           <div class="userIntract">
            <div>
            <button class="likes"><i class="bi bi-heart-fill"></i> 100</button>
            <button class="comments"><i class="bi bi-chat-right-text"></i> 346</button>
             </div>
            <span class="time"><i class="bi bi-clock"></i> 2 Hours ago</span>
           </div>
           </div>
           <div class="userComments">
            <div class="userInfo">
                <input type="text" class="comment" placeholder="What do you think?">
            </div>
            <div class="comments">
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
           </div>
    </div>
    </div>
    `;
  },
};
