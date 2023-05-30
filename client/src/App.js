import React, {Component} from 'react';
import MenuLeft from './assets/components/MenuLeft';
import MainMenu from './assets/components/MainMenu';
import './assets/css/App.css';
import SettingsMenu from './assets/components/SettingsMenu';
import Header from './assets/components/Header';
import MailOptionsMenu from './assets/components/MailOprionsMenu';
import MailList from './assets/components/MailList';

class App extends Component {

  state = {
    incoming: 0,
    settings: false,
    checkAllItems: false,
    checkedItem: '',
  }

  setSettings = (e) => {
    this.setState({settings: e})
  }

  checkItemsHandler = (state) => {
      this.setState({checkAllItems: state ? false : true})
  }

  render () {

    const {incoming, settings, checkedItem, checkAllItems} = this.state

    return (
      <div className="App">
        <MenuLeft settings={settings} setSettings={this.setSettings}/>
        <MainMenu incoming={incoming}/>
        {settings ? (<SettingsMenu active={settings} setSettings={this.setSettings}/>) : ('')}
        <Header/>
        <MailOptionsMenu check={this.checkItemsHandler}/>
        <MailList check={checkedItem} checkAll={checkAllItems}/>
      </div>
    );    
  }
}

export default App;
