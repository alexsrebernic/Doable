import React, {createContext, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export const ModalAndToastContext = createContext(null as any)

export const MainContainer = ({children} : {children: React.ReactNode} ) => {
  Modal.setAppElement('#root');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null)
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
    <div className='min-h-screen min-w-screen main-bg-gradient font-montserrat'>
         <ToastContainer
          position="top-center"
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
         <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >{modalContent}</Modal>
        <ModalAndToastContext.Provider value={
          {
            openModal: (arg : JSX.Element) => openModal(arg),
            closeModal: () => closeModal(),
            showToast: (message: string , type : string) => showToast(message,type)
          }
        }>
          {children}
        </ModalAndToastContext.Provider>
    </div>

  )
}
