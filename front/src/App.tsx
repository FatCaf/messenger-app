import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';
import { AppRoute } from './enums/app-route';
import { Auth } from './pages/auth/auth';
import Chat from './pages/home/components/chat/chat';
import Home from './pages/home/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.ROOT} element={<Auth />} index />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} index />
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route element={<ProtectedRoute />} />
        <Route path={AppRoute.CHATS} element={<Home />}>
          <Route
            path={`${AppRoute.CHATS}/:chatId/:userId`}
            element={<Chat />}
          />
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
