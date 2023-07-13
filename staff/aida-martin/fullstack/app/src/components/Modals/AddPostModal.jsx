import './AddPostModal.css'
import { useAppContext } from '../../hooks'
import { createPost } from '../../logic'
import Modal from '../../library/Modal'
import Container from '../../library/Container'

export default function AddPostModal({ onPostCreated, onCancel }) {
  const { alert, freeze, unfreeze } = useAppContext()

  function handleCreatePost(event) {
    event.preventDefault()

    const image = event.target.image.value
    const text = event.target.text.value

    try {
      freeze()

      createPost(image, text)
        .then(onPostCreated)
        .catch((error) => alert(error.message, 'error'))
        .finally(unfreeze)
    } catch (error) {
      unfreeze()

      alert(error.message, 'warn')
    }
  }

  function handleCancel(event) {
    event.preventDefault()

    onCancel()
  }

  return (
    <Modal tag="section">
      <Container
        tag="form"
        className="add-post-form form"
        onSubmit={handleCreatePost}
      >
        <h2>CREATE A NEW POST</h2>
        <input
          className="input"
          type="url"
          name="image"
          placeholder="Image url"
        />
        <textarea
          className="textarea"
          name="text"
          cols="30"
          rows="10"
          placeholder="Text"
        />

        <p className="add-post-error error off" />

        <button className="button" type="submit">
          CREATE
        </button>
        <button className="button cancel" type="button" onClick={handleCancel}>
          CANCEL
        </button>
      </Container>
    </Modal>
  )
}
