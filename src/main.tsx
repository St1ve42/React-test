import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {CustomQueryClient} from "./tanstackquery/CustomQueryClient.tsx";
import {Provider} from "react-redux";
import {store} from "./redux/redux-store.ts";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallbackComponent} from "./errors/ErrorFallbackComponent.tsx";

createRoot(document.getElementById('root')!).render(
      <StrictMode>
          <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
              <Provider store={store}>
                <CustomQueryClient>
                      <App/>
                </CustomQueryClient>
              </Provider>
          </ErrorBoundary>
      </StrictMode>
)
