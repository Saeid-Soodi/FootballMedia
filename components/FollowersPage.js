// Component for Followers Page
export default {
  content: async function () {
    var id = window.location.toString().split('#')[1];
    const title = 'Soccer Media | Followers';
    document.title = title;

    let listData;
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
      // list of followers
      const res = await fetch(`http://localhost:8080/api/followerList/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      listData = await res.json();
    }
    await fetchAuth();

    window.removeHandler = async function (userId) {
      // remove user
      const up = await fetch('http://localhost:8080/api/unFollow', {
        method: 'POST',
        body: JSON.stringify({
          reqId: id,
          userId,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await up.json();
      if (up.status === 200) {
        window.location.reload();
      }
    };

    return `
    <div class="container">
    <div class="backBtnContainer">
    <a class="backBtn" href="/profile">Back</a>
    <div class="followings">
    <h3>Followers</h3>
    ${
      listData.length >= 1
        ? listData.map((user) => {
            return `<div class="following"><span class="details"><img class="profileImage" src="../assets/images/profile.png" alt="user Profile" /> <span class="userDetails">
            <span class="detailName">${user.name + ' ' + user.familyName}</span>
             <span class="detailId">@${user.userName}</span>
            </span>
            </span>
            
             <button class="unFollowBtn" onclick="removeHandler('${
               user.id
             }')">Remove</button> </div>`;
          })
        : '<div>you do not have any followers! </div>'
    }
    </div>
    </div>
    </div>
    `;
  },
};
