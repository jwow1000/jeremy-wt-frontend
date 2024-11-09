
import Layout from "./components/Layout/Layout.jsx";
import Home from "./screens/Home/Home.jsx";
import Videos from "./screens/Videos/Videos.jsx";
import { Routes, Route } from 'react-router-dom';
import stylesApp from "./stylesApp.module.css";

function App() {

  return (
    <div className="App">
      <Layout id="layout-App">
        <Routes id='routes-App'>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          
        </Routes>
      </Layout>
    </div>
  )
}

export default App
