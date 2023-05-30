import './Alert.css'
import Modal from '../../library/Modal'

export default function Alert ({ message, level, onAccept }) {
  return (
    <Modal>
      <p className='alert'>{message}
        <button className={`button ${level === 'error' ? 'error' : 'warn'}`} type='button' onClick={onAccept}>ACCEPT</button>
      </p>
    </Modal>
  )
}
