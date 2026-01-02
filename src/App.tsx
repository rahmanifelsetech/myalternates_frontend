import { BrowserRouter as Router, useRoutes } from 'react-router';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from '@app/router';
import { store, persistor } from '@app/store';
import { ScrollToTop } from '@shared/components/common/ScrollToTop';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@shared/context/ThemeContext';
import Loading from './shared/components/common/Loading';
import { PersistGate } from 'redux-persist/integration/react';

// const LoadingFallback = () => (
//   <div className="flex items-center justify-center h-screen">
//     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//   </div>
// );

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            limit={5}
            className={'z-[99999]'}
            style={{ zIndex: 99999 }}
          />
          <HelmetProvider>
            <Router>
              <ScrollToTop />
              <Suspense fallback={<Loading type='cover' loading={true} className='h-screen w-screen fixed inset-0' />}>
                <AppRoutes />
              </Suspense>
            </Router>
          </HelmetProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
