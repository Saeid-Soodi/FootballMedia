// Component for not found Page
export default {
  content: async function () {
    const title = 'Soccer Media | Profile';
    document.title = title;

    let userLogin;
    let user;
    let users;
    let userData;
    async function fetchAuth() {
      const auth = await fetch('http://localhost:8080/api/auth', {
        method: 'Get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      user = await auth.json();
      if (auth.status === 500) {
        userLogin = false;
        window.location.href = '/';
      } else if (auth.status === 200) {
        userLogin = true;
      }

      const res = await fetch('http://localhost:8080/api/user');
      users = await res.json();
      const resUser = await fetch(
        `http://localhost:8080/api/user/${user.userId}`
      );
      userData = await resUser.json();
      console.log(userData);
      // follow user
      // const up = await fetch('http://localhost:8080/api/follow', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     reqId: '65bf221269865bfec3e8482d',
      //     userId: '65bdeb1c1b2590e9e29f0551',
      //   }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // const data = await up.json();
      // console.log('data:', data);
    }
    await fetchAuth();

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
              .map((user) => {
                return `<div class="suggestionsUser">
                <span class="details">
        <img class="userImage" src="../assets/images/profile.png" alt="" />
        <span class="userDetails">
        <span class="detailName">${user.name + ' ' + user.familyName}</span>
        <span class="detailId">@${user.userName}</span>
        </span>
        </span>
        <button class="followBtn">Follow</button>
      </div>`;
              })
              .join(' ')
          : '<div>no User Found!</div>'
      }
      
    </div>
    <div class="predictions"></div>
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
                <span>9 Tweets</span>
                <button onclick="followingLinkHandler()"><span>${
                  userData.followers.length >= 1 ? userData.followers.length : 0
                } Follower</span></button>
                <button onclick="followerLinkHandler()"><span>${
                  userData.followings.length >= 1
                    ? userData.followers.length
                    : 0
                } Following</span></button>
                
            </div>
            <div class="desc">
                <p class="text"><span><i class="bi bi-card-text"> </i>${
                  userData.bio
                } </span></p>
                <a href="" class="bioLink"><i class="bi bi-link-45deg"></i> Your Link</a>
            </div>
        </div>
        </div>
    <div class="tweets">
      <div class="tweetText">
      <textarea class="tweetTextAraea" cols="70" rows="5"></textarea>
      <button class="tweetBtn">Tweet</button>
      </div>
    </div>
    </div>
    </div>
    `;
  },
};
