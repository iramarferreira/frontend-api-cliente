import logo from './logo.svg';
import './App.css';
import api from './services/apiCliente';
import Header from './components/Header';
import Footer from './components/Footer';
import Rotas from './rotas';

 
function App() {
    
  return (
    <div className="App">
      <Header></Header>
      <Rotas></Rotas>
      <Footer></Footer>
    </div>
  );
}

export default App;
