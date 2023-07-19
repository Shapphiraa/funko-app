import './EditPostModal.css'
import { useState, useEffect } from 'react'
import { useAppContext } from '../../hooks'
import { updatePost, retrievePost } from '../../logic'
import Modal from '../../library/Modal'
import Container from '../../library/Container'

export default function EditPostModal({ postId, onPostEdited, onCancel }) {
  const { alert, freeze, unfreeze } = useAppContext()

  const [post, setPost] = useState(null)

  function handleEditPost(event) {
    event.preventDefault()

    const image = event.target.image.value
    const text = event.target.text.value

    try {
      freeze()

      updatePost(postId, image, text)
        .then(onPostEdited)
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

  useEffect(() => {
    try {
      freeze()

      retrievePost(postId)
        .then(setPost)
        .catch((error) => alert(error.message, 'error'))
        .finally(unfreeze)
    } catch (error) {
      unfreeze()

      alert(error.message, 'warn')
    }
  }, [postId])

  return (
    <>
      {post && (
        <Modal tag="section">
          <Container
            tag="form"
            className="edit-post-form form"
            onSubmit={handleEditPost}
          >
            <h2>EDIT YOUR POST</h2>
            <input
              className="input"
              type="url"
              name="image"
              defaultValue={post.image}
              placeholder="Image url"
            />
            <textarea
              className="textarea"
              name="text"
              cols="30"
              rows="10"
              defaultValue={post.text}
              placeholder="Text"
            />

            <p className="edit-post-error error off" />

            <button className="button" type="submit">
              UPDATE
            </button>
            <button
              className="button cancel"
              type="button"
              onClick={handleCancel}
            >
              CANCEL
            </button>
          </Container>
        </Modal>
      )}
    </>
  )
}
