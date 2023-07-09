import React from 'react';
import MenuForPC from './global/MenuForPC';
import MainField from './global/MainField';
import Modal from './Modal';
import {useSelector} from "react-redux";

const BodyWrapper = () => {

  const modal = useSelector(state => state.mails.modal)

  return (

    <div className="App">
        <MenuForPC/>
        <MainField/>
        {modal && <Modal/>}
    </div>

  )  

}

export default BodyWrapper;
