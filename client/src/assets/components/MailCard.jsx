import React, {useState} from 'react'
import resendIcon from '../icons/resend-icon-blue.svg'
import trashIcon from '../icons/trash-icon-blue.svg'
import attachmentsIcon from '../icons/attachments-icon.svg'
import downloadIcon from '../icons/download-icon.svg'
import shareIcon from '../icons/share-icon-blue.svg'

const MailCard = (props) => {

    const [menuActive, setMenu] = useState('')

    const menuHandler = () => {
        if (menuActive === '') {
            setMenu('active')
        } else {
            setMenu('')
        }
    }

    const {activeCard, letter} = props
        
    return (

        <div className='mail-card'>
            {
                activeCard ?
                    <>
                        <div className='card column card-active'>
                            <div className='heading column content-start'>
                                <div className='row space-between'>
                                    <p>От кого: {letter.mailer.name}</p>
                                    <p>{letter.mailer.email}</p>
                                </div>
                                <p>Кому: {letter.sentTo.join(', ')}</p>
                                <hr/>
                                <div className='row space-between'>
                                    <div>{letter.title}</div>
                                    <p>{letter.time}</p>
                                </div>
                            </div>
                            <p className='text-body-start'>{letter.body}</p>
                            {letter.attachments ? 
                                <>
                                    {
                                        letter.attachments.map(attachment => (
                                        <button className='btn btn-attachment space-between row' key={letter.attachments.indexOf(attachment)}>
                                            <div className='row btn-layout'>
                                                <img className='icon' src={attachmentsIcon} alt='Вложение'/>
                                                {attachment.source}                                            
                                            </div>
                                            <img className='icon' src={downloadIcon} alt='Скачать'/>
                                        </button>))                                           
                                    }
                                    {
                                        letter.attachments.length > 1 ?
                                            <button className='btn btn-attachment last content-center row'>
                                                Скачать все
                                            </button>
                                        :
                                        ''
                                    }                                      
                                </>
                                : 
                                ''
                            }  
                        </div>
                        <div className={`card-menu row ${menuActive}`}>
                            <div className={`burger ${menuActive}`} onClick={menuHandler}></div>
                            <div className={`body row content-center ${menuActive ? '' : 'op-0'}`}>
                                <button className='btn btn-option content-center btn-layout' title="Ответить">
                                    <img className='icon' src={resendIcon} alt='Ответить'/>
                                </button>
                                <button className='btn btn-option content-center btn-layout' title="Удалить">
                                    <img className='icon' src={trashIcon} alt='Удалить'/>
                                </button>
                                <button className='btn btn-option content-center btn-layout' title="Переслать">
                                    <img className='icon' src={shareIcon} alt='Переслать'/>
                                </button>
                            </div>
                        </div>                       
                    </> 
                    : 
                    <div className='card column content-center'>Ничего не выбрано</div>
            }
        </div>

    )

}

export default MailCard