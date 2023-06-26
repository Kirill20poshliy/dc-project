import React, {useState, useCallback} from 'react';
import './assets/css/global/App.css';
import MenuForPC from './assets/components/global/MenuForPC';
import MainField from './assets/components/global/MainField';


const App = () => {

  const [incoming, setIncoming] = useState(0)
  const [pageMode, setPageMode] = useState('')
  const [mailList, setMailList] = useState([])

  const incomingHandler = () => {
    fetch('http://localhost:3000/mails')
    .then(response => response.json())
    .then(data => {
        let incoming = 0
        for (let i = 0; i < data.length; i++) {
            if (!data[i].read) {
                incoming += 1
            }
        }
        setIncoming(incoming)
    })
    .catch(err => console.log(err))
  }

  const listFetch = useCallback((listFilter) => {
    fetch(`http://localhost:3000/mails${listFilter}`)
    .then(response => response.json())
    .then(mails => {
      if (listFilter === '') {
        for (let i = 0; i < mails.length; i++) {
          if (!mails[i].attachments.length) {
            mails = mails.filter((mail) => (mail.attachments.length !== 0 && mail.deleted === false))
          }
        }
      }
      if (listFilter === '?deleted=true') {
        setPageMode('deleted')
      } else {
        setPageMode('')
      }
      setMailList(mails)
    })
    .catch((err) => console.log(err))   
  }, [])

  // const listFetch = (listFilter) => {
  //   fetch(`http://localhost:3000/mails${listFilter}`)
  //   .then(response => response.json())
  //   .then(mails => {
  //     if (listFilter === '') {
  //       for (let i = 0; i < mails.length; i++) {
  //         if (!mails[i].attachments.length) {
  //           mails = mails.filter((mail) => (mail.attachments.length !== 0 && mail.deleted === false))
  //         }
  //       }
  //     }
  //     if (listFilter === '?deleted=true') {
  //       setPageMode('deleted')
  //     } else {
  //       setPageMode('')
  //     }
  //     setMailList(mails)
  //   })
  //   .catch((err) => console.log(err))
  // }

  const mailWriteHandler = () => {
    setPageMode('writeMail') 
  }

  return (

    <div className="App">
      <MenuForPC 
        incoming={incoming}
        listFetch={listFetch}
        writeMail={mailWriteHandler}
      />
      <MainField 
        incoming={incomingHandler} 
        mails={mailList} 
        listFetch={listFetch}
        pageMode={pageMode}
      />
    </div>

  )  

}

export default App;
