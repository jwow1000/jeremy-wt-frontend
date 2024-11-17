
import Layout from "./components/Layout/Layout.jsx";
import Home from "./screens/Home/Home.jsx";
import Videos from "./screens/Videos/Videos.jsx";
import { Routes, Route } from 'react-router-dom';
import WebProjects from "./screens/WebProjects/WebProjects.jsx";
import WebProjectsDetail from "./screens/WebProjectDetail/WebProjectsDetail.jsx";
import stylesApp from "./stylesApp.module.css";

function App() {

  return (
    <div className="App">
      <Layout id="layout-App">
        <Routes id='routes-App'>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/webportfolio" element={<WebProjects />} />
          <Route path="/home/webportfolio/:slug" element={<WebProjectsDetail />} />
          
        </Routes>
      </Layout>
    </div>
  )
}

export default App
