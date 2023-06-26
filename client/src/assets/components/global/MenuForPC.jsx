import React, {Component} from 'react'
import MenuLeft from '../menuPC/MenuLeft'
import MainMenu from '../menuPC/MainMenu'
import SettingsMenu from '../menuPC/SettingsMenu'

class MenuForPC extends Component {

    state = {
        settings: false,
    }

    setSettings = (e) => {
        this.setState({settings: e})
    }

    render() {

        const {settings} = this.state

        return(

            <div className='menu-pc'>
                <MenuLeft 
                    settings={settings} 
                    setSettings={this.setSettings}
                />
                <MainMenu 
                    incoming={this.props.incoming}
                    mode={this.props.listFetch}
                    writeMail={this.props.writeMail}
                />
                {settings ? (<SettingsMenu active={settings} setSettings={this.setSettings}/>) : ('')}
            </div>

        )
    }

}

export default MenuForPC