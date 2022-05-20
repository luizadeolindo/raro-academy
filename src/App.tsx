import { BrowserRouter } from "react-router-dom";
import { MainRoutes } from "./Routes";
import ScrollToTop from "./helpers/ScrollToTop";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;
