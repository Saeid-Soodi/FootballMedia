import Header from './components/Header.js';
import Footer from './components/Footer.js';
const contentContainer = document.getElementById('root');
const headerElement = document.getElementById('header');
const footerElement = document.getElementById('footer');

document.addEventListener('DOMContentLoaded', () => {
  // Define routes
  const routes = [
    { path: '/', component: 'HomePage', css: 'home' },
    { path: '/profile', component: 'ProfilePage', css: 'profile' },
    { path: '/predict', component: 'PredictPage', css: 'predict' },
    { path: '/myTeam', component: 'MyTeamPage', css: 'myTeam' },
    { path: '/settings', component: 'SettingsPage', css: 'settings' },
    {
      path: '/termsAndConditions',
      component: 'TermsAndConditionsPage',
      css: 'termsAndConditions',
    },
    { path: '/signIn', component: 'SignInPage', css: 'signIn' },
    { path: '/signUp', component: 'SignUpPage', css: 'signUp' },
    {
      path: '/usersProfile',
      component: 'usersProfilePage',
      css: 'usersProfile',
    },
    { path: '/followers', component: 'FollowersPage', css: 'followers' },
    { path: '/followings', component: 'FollowingsPage', css: 'followings' },
  ];

  // Initial load of the content based on the current URL path
  navigateToPage(window.location.pathname);

  // Handle navigation changes
  document.addEventListener('click', (event) => {
    if (
      event.target.tagName === 'A' &&
      event.target.getAttribute('href').startsWith('/')
    ) {
      event.preventDefault();
      const path = event.target.getAttribute('href');
      navigateToPage(path);
      history.pushState(null, null, path);
    }
  });

  // Handle back and forward buttons
  window.addEventListener('popstate', () => {
    navigateToPage(window.location.pathname);
  });

  function navigateToPage(path) {
    const route = findRoute(path);
    loadCssFile(route.css);

    // Import the module dynamically based on the route
    const modulePath = `./components/${route.component}.js`;
    importModule(modulePath);
  }

  function findRoute(path) {
    const notFoundRoute = {
      path: '/404',
      component: 'NotFoundPage',
      css: 'notFound',
    };

    const matchedRoute =
      routes.find((route) => route.path === path) || notFoundRoute;

    // Dynamically add cases based on routes array
    if (routes.some((route) => route.path === path)) {
      return matchedRoute;
    } else {
      return notFoundRoute;
    }
  }

  function loadCssFile(cssFile) {
    if (cssFile) {
      const cssPath = `./assets/css/${cssFile}.css`;
      const existingStyle = document.getElementById('dynamic-style');
      if (existingStyle) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
      const style = document.createElement('link');
      style.id = 'dynamic-style';
      style.rel = 'stylesheet';
      style.href = cssPath;
      document.head.appendChild(style);
    } else {
      // Remove the CSS file if it exists
      const existingStyle = document.getElementById('dynamic-style');
      if (existingStyle) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    }
  }

  async function importModule(modulePath) {
    try {
      headerElement.innerHTML = await Header.content();
      footerElement.innerHTML = await Footer.content();
      const module = await import(modulePath);
      const { content } = module.default;

      // Fetch data dynamically
      const data = await content();
      contentContainer.innerHTML = data;
    } catch (error) {
      console.error(`Error loading module at ${modulePath}:`, error);

      // If module not found, load the 404 page
      handleNotFound();
    }
  }

  function handleNotFound() {
    import('./components/NotFoundPage.js').then(
      ({ default: notFoundContent }) => {
        contentContainer.innerHTML = notFoundContent.content();
      }
    );
  }
});
