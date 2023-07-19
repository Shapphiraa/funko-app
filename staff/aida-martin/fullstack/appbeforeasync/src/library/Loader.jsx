import './Loader.css'
import Container from './Container'
import Modal from './Modal'

export default function Loader () {
  return (
    <Modal>
      <Container className='lds-ring'><div /><div /><div /><div /></Container>
    </Modal>
  )
}
