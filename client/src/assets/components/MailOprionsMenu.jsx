import React, {useState} from "react";
import shareIcon from '../icons/share-icon.svg'
import trashIcon from '../icons/trash-icon.svg'
import writtenIcon from '../icons/written-icon.svg'

const MailOptionsMenu = (props) => {

    const [active, setActive] = useState(false)

    const checkHandler = () => {
        setActive(active ? false : true)
        props.check(active)
    }

    const deleteHandler = () => {
        props.delete()
    }

    return (
        <div className="row mail-options">
            <label className="checkbox">
                <input 
                    type="checkbox"
                    name="check"
                    onChange={() => checkHandler()}
                />
                <div className="checkmark"></div>
            </label>
            <button 
                className="btn btn-layout btn-context" 
                disabled={(active || props.activeMenu) && props.pageMode !== 'deleted' ? "" : "disabled"}
            >
                <img className='icon' src={shareIcon} alt=""/>
                Переслать
            </button>
            <button 
                className="btn btn-layout btn-context" 
                disabled={active || props.activeMenu ? "" : "disabled"}
                onClick={() => deleteHandler()}
            >
                <img className='icon' src={trashIcon} alt=""/>
                Удалить
            </button>
            <button 
                className="btn btn-layout btn-context" 
                disabled={(active || props.activeMenu) && props.pageMode !== 'deleted' ? "" : "disabled"}
            >
                <img className='icon' src={writtenIcon} alt=""/>
                Прочитать
            </button>
        </div>
    )

}

export default MailOptionsMenu