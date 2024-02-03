// Component for header
export default {
  content: function () {
    // let authData;
    // async function fetchContent() {
    //   const auth = await fetch('http://localhost:8080/api/auth', {
    //     method: 'Get',
    //     credentials: 'include',
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    //   authData = await auth.json();
    //   console.log(authData);
    // }
    // await fetchContent();

    return `<div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/hello">hello page</a>
        <a href="/signIn">signIn page</a>
        <a href="/dfsdfs">404 page</a>
      </nav>
    </div>`;
  },
};
