
import mobile from './extensions/mobile.png';
import LoginLogo from './extensions/login2.png';
import Logo from './extensions/logo2.png';
import Logo3 from './extensions/logo3.png';


export default {
  config: {
    auth: {
      logo: Logo3,
    },
    head: {
      favicon: Logo3,
    },
    menu: {
      logo: Logo3,
    },
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'Visionary CMS',
        'Auth.form.welcome.title': 'Welcome',
        'Auth.form.welcome.subtitle': "Login to your Visionary account"
      }
    }
  },

  bootstrap() { },
};
