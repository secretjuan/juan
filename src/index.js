// scroll bar
import 'simplebar/src/simplebar.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lightbox
import 'react-image-lightbox/style.css';

// lazy image
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import NotistackProvider from './theme/provider/NotistackProvider';

// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import './style.css';
// ----------------------------------------------------------------------
const USERSNAP_API_KEY = "5db6ed72-2881-4310-ac50-712e39193b7e";
const USERSNAP_GLOBAL_API_KEY =  "5db6ed72-2881-4310-ac50-712e39193b7e";
ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        <script type="text/javascript">
          {`
              window.onUsersnapCXLoad = function(api) {
                api.init();
                api.show('${USERSNAP_API_KEY}') 
              }
              var script = document.createElement('script');
              script.defer = 1;
              script.src = 'https://widget.usersnap.com/global/load/${USERSNAP_GLOBAL_API_KEY}?onload=onUsersnapCXLoad';
              document.getElementsByTagName('head')[0].appendChild(script);
          `}
        </script>
      </Helmet>
      <SettingsProvider>
        <CollapseDrawerProvider>
          <NotistackProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </NotistackProvider>
        </CollapseDrawerProvider>
      </SettingsProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
