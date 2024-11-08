
import Layout from "./components/Layout/Layout.jsx";
import Home from "./screens/Home/Home.jsx";
import { Routes, Route } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <div className="App">
      <Layout id="layout-App">
        <Routes id='routes-App'>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </Layout>
    </div>
  )
}

export default App
