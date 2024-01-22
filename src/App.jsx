import MainPage from './pages';

import '@coreui/coreui/dist/css/coreui.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';

const App = (props) => {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <MainPage />
    </>
  );
};
export default App;
