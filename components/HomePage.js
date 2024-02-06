// Component for Home Page
export default {
  content: async function () {
    const title = 'Football Media | Home';
    document.title = title;

    try {
      let data;
      let authData;
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
      }
      await fetchContent();

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
