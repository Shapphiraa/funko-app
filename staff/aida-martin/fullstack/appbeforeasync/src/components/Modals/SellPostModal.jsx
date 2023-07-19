import './SellPostModal.css'
import { useState, useEffect } from 'react'
import { useAppContext } from '../../hooks'
import { sellPost, retrievePost } from '../../logic'
import Modal from '../../library/Modal'
import Container from '../../library/Container'

export default function SellPostModal({ postId, onPostForSale, onCancel }) {
  const { alert, freeze, unfreeze } = useAppContext()

  const [post, setPost] = useState(null)

  function handleSellPost(event) {
    event.preventDefault()

    const price = event.target.price.value

    try {
      freeze()

      sellPost(postId, price)
        .then(onPostForSale)
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
            className="sell-post-form form"
            onSubmit={handleSellPost}
          >
            <h2>SELL YOUR POST</h2>
            <input
              className="input"
              type="number"
              name="price"
              defaultValue={post.price}
              placeholder="Post price"
            />

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
