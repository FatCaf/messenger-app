import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';
import { AppRoute } from './enums/app-route';
import { Auth } from './pages/auth/auth';
import Chats from './pages/chats/chats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.ROOT} element={<Auth />} index />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} index />
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path={AppRoute.CHATS} element={<Chats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
