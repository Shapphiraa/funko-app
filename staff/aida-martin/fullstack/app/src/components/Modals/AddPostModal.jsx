import './AddPostModal.css'
import { useContext } from 'react'
import createPost from '../../logic/createPost'
import { context } from '../../ui'
import Context from '../../Context'
import Modal from '../../library/Modal'
import Container from '../../library/Container'

export default function AddPostModal ({ onPostCreated, onCancel }) {
  const { alert, freeze, unfreeze } = useContext(Context)

  function handleCreatePost (event) {
    event.preventDefault()

    const image = event.target.image.value
    const text = event.target.text.value

    try {
      freeze()

      createPost(context.userId, image, text, (error) => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')

          return
        }

        onPostCreated()
      })
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  function handleCancel (event) {
    event.preventDefault()

    onCancel()
  }

  return (
    <Modal tag='section'>
      <Container tag='form' className='add-post-form form' onSubmit={handleCreatePost}>
        <h2>CREATE A NEW POST</h2>
        <input
          className='input'
          type='url'
          name='image'
          placeholder='Image url'
        />
        <textarea
          className='textarea'
          name='text'
          cols='30'
          rows='10'
          placeholder='Text'
        />

        <p className='add-post-error error off' />

        <button className='button' type='submit'>CREATE</button>
        <button className='button cancel' type='button' onClick={handleCancel}>CANCEL</button>
      </Container>
    </Modal>
  )
}
