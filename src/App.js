import { Navbar, RequireAuth, RestrictAuth } from "components";
import { Home, Login, Profile, Signup } from "pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<RequireAuth> <Home /> </RequireAuth>} />
        <Route path="/profile" element={<RequireAuth> <Profile /> </RequireAuth>} />
        <Route path="/login" element={<RestrictAuth> <Login /> </RestrictAuth>} />
        <Route path="/signup" element={<RestrictAuth> <Signup /> </RestrictAuth>} />
      </Routes>
    </div>
  );
}

export default App;
