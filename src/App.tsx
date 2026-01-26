import { RouterProvider } from 'react-router';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from '@app/router';
import { store, persistor } from '@app/store';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@shared/context/ThemeContext';
import Loading from './shared/components/common/Loading';
import { PersistGate } from 'redux-persist/integration/react';

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
            <Suspense fallback={<Loading type='cover' loading={true} className='h-screen w-screen fixed inset-0' />}>
              <RouterProvider router={router} />
            </Suspense>
          </HelmetProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
