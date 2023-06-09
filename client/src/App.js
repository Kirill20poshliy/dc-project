import React, {Component} from 'react';
import MenuLeft from './assets/components/MenuLeft';
import MainMenu from './assets/components/MainMenu';
import './assets/css/App.css';
import SettingsMenu from './assets/components/SettingsMenu';
import Header from './assets/components/Header';
import MailOptionsMenu from './assets/components/MailOprionsMenu';
import MailList from './assets/components/MailList';
import MailCard from './assets/components/MailCard';

class App extends Component {

  state = {
    incoming: 0,
    settings: false,
    checkAllItems: false,
    checkedItem: '',
    mailOptionsActive: false,
  }

  setSettings = (e) => {
    this.setState({settings: e})
  }

  checkAllItemsHandler = (state) => {
      this.setState({checkAllItems: state ? false : true})
  }

  checkHandler = () => {
    this.setState({mailOptionsActive: this.state.mailOptionsActive ? false : true})
}

  render () {

    const {incoming, settings, checkAllItems, mailOptionsActive} = this.state

    return (
      <div className="App">
        <MenuLeft 
          settings={settings} 
          setSettings={this.setSettings}
        />
        <MainMenu 
          incoming={incoming}
        />
        {settings ? (<SettingsMenu active={settings} setSettings={this.setSettings}/>) : ('')}
        <Header/>
        <MailOptionsMenu 
          check={this.checkAllItemsHandler} 
          activeMenu={mailOptionsActive}
        />
        <MailList 
          check={this.checkHandler} 
          checkAll={checkAllItems}
        />
        <MailCard/>
      </div>
    );    
  }
}

export default App;
