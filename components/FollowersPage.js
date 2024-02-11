// Component for Followers Page
export default {
  content: async function () {
    var id = window.location.toString().split('#')[1];
    const title = 'Followers | Football Media';
    document.title = title;

    let authUser;
    let userLogin;
    let userData;
    let listData;
    async function fetchAuth() {
      const auth = await fetch('http://localhost:8080/M00872834/auth', {
        method: 'Get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      authUser = await auth.json();
      if (auth.status === 500) {
        userLogin = false;
        window.location.href = '/signIn';
      } else if (auth.status === 200) {
        userLogin = true;
      }

      //user data
      const resUser = await fetch(`http://localhost:8080/M00872834/user/${id}`);
      userData = await resUser.json();

      // list of followers
      const res = await fetch(
        `http://localhost:8080/M00872834/followerList/${id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      listData = await res.json();
    }
    await fetchAuth();

    window.removeHandler = async function (userId) {
      // remove user
      const up = await fetch('http://localhost:8080/M00872834/unFollow', {
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
    window.clickHandler = function () {
      window.location.href = `${
        authUser.userId === id ? '/profile' : `/usersProfile#${id}`
      }`;
    };

    return `
    <div class="container">
    <div class="backBtnContainer">
    <button onclick="clickHandler()" class="backBtn">Back</button>
    <div class="followings">
    ${
      authUser.userId === id
        ? `<h3>My Followers</h3>`
        : `<h3>Followers of ${userData.name + ' ' + userData.familyName}</h3>`
    }
    ${
      listData.length >= 1
        ? listData
            .map((followUser) => {
              return `<div class="following"><span class="details"><img class="profileImage" src="../assets/images/profile.png" alt="user Profile" /> <span class="userDetails">
            <span class="detailName">${
              followUser.name + ' ' + followUser.familyName
            }</span>
             <span class="detailId">@${followUser.userName}</span>
            </span>
            </span>
            ${
              authUser.userId === id
                ? `<button class="unFollowBtn" onclick="removeHandler('${followUser.id}')">Remove</button>`
                : ''
            }
              </div>`;
            })
            .join('')
        : '<div>you do not have any followers! </div>'
    }
    </div>
    </div>
    </div>
    `;
  },
};
