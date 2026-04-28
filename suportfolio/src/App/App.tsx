import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/home/HomePage";
import NotFound from "@/pages/NotFound";
import JantaSuvidhaKendra from "@/pages/jsk/JantaSuvidhaKendra";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/janta-suvidha-kendra" element={<JantaSuvidhaKendra />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
