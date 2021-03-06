import './App.css';
import Header from './component/Header'
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';
import CartScreen from './Screen/CartScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router>
    <Header></Header>
    <Route path='/' component={HomeScreen} exact></Route>
     <Route path='/product/:id' component={ProductScreen}></Route>
     <Route path='/cart/:id?' component={CartScreen}></Route>
    </Router>
    </div>
  );
}

export default App;
