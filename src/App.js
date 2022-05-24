import logo from './logo.svg';
import './App.css';
import Header from "./Layout/Header/Header.js"
import Form from './Layout/Header/Form';
import ConvertedPlaylist from './ConvertedPlaylist/ConvertedPlaylist';
import PlaylistProvider from './store/PlaylistProvider';

function App() {
  return (
    <div className="App">
      <PlaylistProvider>
        <Header></Header>
        <Form />
        <ConvertedPlaylist />
      </PlaylistProvider>
    </div>
  );
}

export default App;
