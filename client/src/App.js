import React, {Component} from 'react';
import MenuLeft from './assets/components/MenuLeft';
import MainMenu from './assets/components/MainMenu';
import './assets/css/App.css';
import SettingsMenu from './assets/components/SettingsMenu';

class App extends Component {

  state = {
    incoming: 0,
    settings: false,
  }

  // componentDidMount() {
  //     fetch()
  //     .then(response => response.json())
  //     .then(data => this.setState({incoming: data.""}))
  // }

  // componentDidUpdate() {

  // }

  setSettings = (e) => {
    this.setState({settings: e})
  }

  render () {

    const {incoming, settings} = this.state

    return (
      <div className="App">
        <MenuLeft settings={settings} setSettings={this.setSettings}/>
        <MainMenu incoming={incoming}/>
        {settings ? (<SettingsMenu active={settings} setSettings={this.setSettings}/>) : ('')}
      </div>
    );    
  }
}

export default App;
