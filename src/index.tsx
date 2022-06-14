import ReactDOM from 'react-dom/client';
import App from 'App';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Theme } from 'theme';
import { RecoilRoot } from 'recoil';
import 'react-reflex/styles.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'assets/fonts.css';
import { devices } from 'style/media-queries';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-family: ${props => props.theme.fontFamily.main};
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  overflow: hidden;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
  font-size: 16px;
  font-family: 'Nanum Gothic', sans-serif;
}
a {
  text-decoration: none;
}
.logo {
  font-family: 'Comfortaa', cursive;
  color : #1082FD;
}
.toggle-menu-icon {
  @media ${devices.mobileL} {
    opacity: 1 !important;
  }
}
`;

root.render(
  <RecoilRoot>
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>,
);
