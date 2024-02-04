// Component for not found Page
export default {
  content: async function () {
    const title = 'Soccer Media | Profile';
    document.title = title;
    // var id = window.location.toString().split('#')[1];
    // console.log('id :', id);

    let userLogin;
    let user;
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

      // list of followers
      // const up = await fetch(
      //   'http://localhost:8080/api/followerList/65bf221269865bfec3e8482d',
      //   {
      //     method: 'GET',
      //     headers: { 'Content-Type': 'application/json' },
      //   }
      // );
      // const data = await up.json();
      // console.log('data:', data);
    }
    await fetchAuth();

    return `
    <div class="container">
    <div class="right">
    <div ><img class="image" src="../assets/images/upImage.jpg" alt="" /></div>
    <div class="suggestions">
      <h3>Suggestions</h3>
      <div class="suggestionsUser">
        <img class="userImage" src="../assets/images/profile.png" alt="" />
        <span class="userDetails">
        <span class="detailName">kiarash</span>
        <span class="detailId">@kiarash_alizadeh</span>
        </span>
        <button class="followBtn">Follow</button>
      </div>
      <div class="suggestionsUser">
        <img class="userImage" src="../assets/images/profile.png" alt="" />
        <span class="userDetails">
          <span class="detailName">kiarash</span>
          <span class="detailId">@kiarash_alizadeh</span>
        </span>
        <button class="followBtn">Follow</button>
      </div>
      <div class="suggestionsUser">
      <img class="userImage" src="../assets/images/profile.png" alt="" />
      <span class="userDetails">
      <span class="detailName">kiarash</span>
      <span class="detailId">@kiarash_alizadeh</span>
      </span>
      <button class="followBtn">Follow</button>
    </div>
    </div>
    <div class="predictions"></div>
    </div>
    <div class="left">
    <div class="bio">
        <div class="profileImg">
            <img src="../assets/images/profile.png" alt="profileImg">
            <i class="bi bi-plus-circle"></i>
        </div>
        <div class="profileDesc">
            <div class="text">
                <span class="name">Saeed Soodi</span>
                <span class="id">@Saeedsi</span>
            </div>
            <div class="stats">
                <span>9 Tweets</span>
                <span>2450 Follower</span>
                <span>1906 Following</span>
            </div>
            <div class="desc">
                <p class="text"><span><i class="bi bi-card-text"> </i>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem a quis, ut debitis saepe voluptatum.</span></p>
                <a href="" class="bioLink"><i class="bi bi-link-45deg"></i> Your Link</a>
            </div>
        </div>
        </div>
    <div class="tweets"></div>
    </div>
    </div>
    `;
  },
};
