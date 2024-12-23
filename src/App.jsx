
import Layout from "./components/Layout/Layout.jsx";
import Home from "./screens/Home/Home.jsx";
import Videos from "./screens/Videos/Videos.jsx";
import { Routes, Route } from 'react-router-dom';
import WebProjects from "./screens/WebProjects/WebProjects.jsx";
import WebProjectsDetail from "./screens/WebProjectDetail/WebProjectsDetail.jsx";
import Sounds from "./screens/Sounds/Sounds.jsx";
import Things from "./screens/Things/Things.jsx";
import ThingDetail from "./screens/ThingDetail/ThingDetail.jsx";
import { ScrollProvider } from "./hooks/ScrollContext.jsx";
import stylesApp from "./stylesApp.module.css";

function App() {

  return (
    <div className="App">
      <ScrollProvider>
        <Layout id="layout-App">
          <Routes id='routes-App'>
            <Route path="/" element={<Home />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/sounds" element={<Sounds />} />
            <Route path="/things" element={<Things />} />
            <Route path="/webportfolio" element={<WebProjects />} />
            <Route path="/webportfolio/:slug" element={<WebProjectsDetail />} />
            <Route path="/things/:slug" element={<ThingDetail />} />
            
          </Routes>
        </Layout>
      </ScrollProvider>
    </div>
  )
}

export default App
