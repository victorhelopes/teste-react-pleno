import { Provider } from 'react-redux';

import PokemonList from "./pages/Home";
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <PokemonList/>
  </Provider>
  );
}

export default App;
