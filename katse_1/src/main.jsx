import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import store from './store/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DndProvider>
      </Provider>
    </AuthProvider>
  </StrictMode>
);
