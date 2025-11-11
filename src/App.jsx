import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RouterConfig from './router';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container-fluid px-0">
        <RouterConfig />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
