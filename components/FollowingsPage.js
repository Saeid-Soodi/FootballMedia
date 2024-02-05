// Component for Followings Page
export default {
  content: async function () {
    var id = window.location.toString().split('#')[1];

    const title = 'Football Media | Followings';
    document.title = title;

    let userLogin;
    let user;
    let listData;
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

      // list of followers
      const res = await fetch(`http://localhost:8080/api/followingList/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      listData = await res.json();
      console.log('data:', listData);
    }
    await fetchAuth();

    window.unFollowHandler = async function (reqId) {
      // unFollow user
      const up = await fetch('http://localhost:8080/api/unFollow', {
        method: 'POST',
        body: JSON.stringify({
          reqId,
          userId: id,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await up.json();
      console.log(data);
      if (up.status === 200) {
        window.location.reload();
      }
    };

    return `
    <div class="container">
    <div class="backBtnContainer">
    <a class="backBtn" href="/profile">Back</a>
    <div class="followings">
    <h3>Followings</h3>
    ${
      listData.length >= 1
        ? listData
            .map((user) => {
              return `<div class="following"><span class="details"><img class="profileImage" src="../assets/images/profile.png" alt="user Profile" /> <span class="userDetails"><span class="detailName"">${
                user.name + ' ' + user.familyName
              }</span> <span class="detailId">@${
                user.userName
              }</span></span> </span><button class="unFollowBtn" onclick="unFollowHandler('${
                user.id
              }')">unFollow</button> </div>`;
            })
            .join('')
        : '<div>you have not follow any User </div>'
    }
    </div>
    </div>
    </div>
    `;
  },
};
