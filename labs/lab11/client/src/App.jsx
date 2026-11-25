import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, fetchProfile } from "./authSlice.js";

// Decode the JWT payload (middle part) so we can show what is inside it.
// Decoding is NOT verifying: only the server can check the signature.
function decodeJwt(token) {
  const [header, payload] = token.split(".");
  const parse = (part) => JSON.parse(atob(part.replace(/-/g, "+").replace(/_/g, "/")));
  return { header: parse(header), payload: parse(payload) };
}

function LoginForm() {
  const dispatch = useDispatch(); // DISPATCH: send actions to the store
  const { status, error } = useSelector((s) => s.auth); // SUBSCRIBE: re-render when these change
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("password123");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <main className="card">
      <h1>Sign in</h1>
      <p className="hint">Demo account: demo / password123</p>
      <form onSubmit={onSubmit}>
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}

function Profile() {
  const dispatch = useDispatch();
  const { user, token, profile } = useSelector((s) => s.auth);
  const decoded = decodeJwt(token);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <main className="card wide">
      <header className="row">
        <h1>Welcome, {user.name}</h1>
        <button className="secondary" onClick={() => dispatch(logout())}>Log out</button>
      </header>

      <section>
        <h2>Protected data from the server</h2>
        {profile ? <pre>{JSON.stringify(profile, null, 2)}</pre> : <p className="hint">Loading...</p>}
      </section>

      <section>
        <h2>Your JWT</h2>
        <pre className="token">{token}</pre>
        <h2>Header</h2>
        <pre>{JSON.stringify(decoded.header, null, 2)}</pre>
        <h2>Payload</h2>
        <pre>{JSON.stringify(decoded.payload, null, 2)}</pre>
        <p className="hint">The signature (third part) is what stops anyone from editing the payload.</p>
      </section>
    </main>
  );
}

export default function App() {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  return isAuthenticated ? <Profile /> : <LoginForm />;
}
