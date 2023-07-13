import { useEffect } from 'react';
import MenuForPC from './global/MenuForPC';
import MainField from './global/MainField';
import Modal from './Modal';
import { useSelector, useDispatch } from "react-redux";
import { useGetUserQuery } from '../../store/api';
import { setUserId } from '../../store/userSlice';

const BodyWrapper = () => {

  const modal = useSelector(state => state.mails.modal)
  const username = useSelector(state => state.user.username)
  const {data, isSuccess} = useGetUserQuery(username)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserId(data.results[0].id))
    }
  }, [isSuccess, data, dispatch])

  return (

    <div className="App">
        <MenuForPC/>
        <MainField/>
        {modal && <Modal/>}
    </div>

  )  

}

export default BodyWrapper;
