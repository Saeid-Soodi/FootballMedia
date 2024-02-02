// Component for Home Page
export default {
  content: async function () {
    const title = 'Twitter Sport | Home';
    document.title = title;

    try {
      let data;
      let authData;
      async function fetchContent() {
        const auth = await fetch('http://localhost:8080/api/auth', {
          method: 'Get',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        authData = await auth.json();
        console.log(authData);
        // ... do something with the data

        const res = await fetch('http://localhost:8080/api/user');
        data = await res.json();
        console.log(data);
      }
      await fetchContent();

      return `
      <h2>Welcome to the Home Page</h2><p>${
        data[0].name + ' ' + data[0].familyName
      }</p>
      <div style="display: flex; flex-direction: column;">${data
        .map((user) => `<span>${user.name} ${user.familyName}</span>`)
        .join('')}</div>

      <img src="./assets/images/logo.PNG" alt="kia" />`;
    } catch (error) {
      console.error('Error fetching home data:', error);
      return '<h2>Error Loading Home Page</h2><p>Unable to fetch data.</p>';
    }
  },
};
