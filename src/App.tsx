import { BrowserRouter } from "react-router-dom";
import { MainRoutes } from "./Routes";
import ScrollToTop from "./helpers/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;
