import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>REACT_APP_NOT_SECRET_CODE: {process.env.REACT_APP_NOT_SECRET_CODE} </p>
        <p>base url: { process.env.REACT_APP_BASE_URL}</p>
        <pre> {JSON.stringify(process.env, undefined, 2)} </pre> 
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
