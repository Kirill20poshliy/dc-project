import React, {useState} from 'react'
import MenuLeft from '../menuPC/MenuLeft'
import MainMenu from '../menuPC/MainMenu'
import SettingsMenu from '../menuPC/SettingsMenu'

const MenuForPC = (props) => {

    const [settings, setSettings] = useState(false)

    const useSetSettings = (e) => {
        setSettings(e)
    }

    return (

        <div className='menu-pc'>
            <MenuLeft 
                settings={settings} 
                setSettings={useSetSettings}
            />
            <MainMenu
                writeMail={props.writeMail}
            />
            {settings ? (<SettingsMenu active={settings} setSettings={useSetSettings}/>) : ('')}
        </div>

    )
}

export default MenuForPC