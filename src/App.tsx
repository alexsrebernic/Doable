import React, {createContext, useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import useInitializeApp from './hooks/useInitializeApp';
import { User } from './types/User';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './store/slices/userSlice';
import Task from './types/Task/Task';
import connectToFirebaseEmulator from './api/firebase/connectToFirebaseEmulator'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow:" 0px 0px 15px -2px rgba(0,0,0,0.75)",
  },
};
export const AppContext = createContext(null as any)
export const App = ({children} : {children: React.ReactNode} ) => {
  useInitializeApp()
  Modal.setAppElement('#root');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null)
  const [isSidebarShowing, collapseSidebar] = useState(false)
  const [isHelpSidebarShowing, collapseHelpSidebar] = useState(false)
  const [isCalendarShowing, collapseCalendar] = useState(false)
  const [searchBarInput, setSearchBarInputValue] = useState('')
  const [taskId, setTaskId] = useState<number | null>(null)
  const user : User | null = useSelector(selectCurrentUser) || null
  function openModal(content : JSX.Element) {
    setModalContent(content)
    setIsOpen(true);
  }
  function showToast(message: string , type : string){
    toast[type](message)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {modalContent}
        </Modal>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      <div 
      className={`h-screen  max-w-screen flex flex-col font-montserrat overflow-hidden`}>
        <AppContext.Provider value={
          {
            openModal: (arg : JSX.Element) => openModal(arg),
            closeModal: () => closeModal(),
            modalIsOpen,
            showToast: (message: string , type : string) => showToast(message,type),
            sidebar: { state:isSidebarShowing, func:() => collapseSidebar(oldVal => !oldVal)},
            calendar: {state: isCalendarShowing, func: () => collapseCalendar(oldVal => !oldVal)},
            helpSidebar: { 
              state:isHelpSidebarShowing, 
              func: () => collapseHelpSidebar(oldVal => !oldVal), 
              taskId,
              setTaskId
            },
            user,
            searchBarData: {state: searchBarInput, func: (val) => setSearchBarInputValue(val)}
          }
        }>
          {children}
        </AppContext.Provider>
      </div>
    </>
  

  )
}
