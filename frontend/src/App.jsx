import Login from "./pages/Login";
import Cases from "./pages/Cases";

function App() {
  const token = localStorage.getItem("access");

  // If not logged in → show Login
  if (!token) {
    return <Login />;
  }

  // If logged in → show Cases
  return <Cases />;
}

export default App;

