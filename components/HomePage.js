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

      return `
      <h2>Welcome to the Home Page</h2><p>${
        data[0].name + ' ' + data[0].familyName
      }</p>
      <div style="display: flex; flex-direction: column;">${data
        .map((user) => `<span>${user.name} ${user.familyName}</span>`)
        .join('')}</div>

      `;
    } catch (error) {
      console.error('Error fetching home data:', error);
      return '<h2>Error Loading Home Page</h2><p>Unable to fetch data.</p>';
    }
  },
};
