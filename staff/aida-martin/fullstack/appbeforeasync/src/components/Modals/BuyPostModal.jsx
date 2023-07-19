import './BuyPostModal.css'
import { useState, useEffect } from 'react'
import { useAppContext } from '../../hooks'
import { buyPost, retrievePost } from '../../logic'
import Modal from '../../library/Modal'
import Container from '../../library/Container'

export default function BuyPostModal({ postId, onPostBought, onCancel }) {
  const { alert, freeze, unfreeze } = useAppContext()

  const [post, setPost] = useState(null)

  function handleBuyPost() {
    try {
      freeze()

      buyPost(postId)
        .then(onPostBought)
        .catch((error) => alert(error.message, 'error'))
        .finally(unfreeze)
    } catch (error) {
      unfreeze()

      alert(error.message, 'warn')
    }
  }

  function handleCancel() {
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
          <Container tag="form" className="buy-post-form form">
            <h2>BUY POST</h2>

            <p className="text-buy-post">Are you sure to buy this post?</p>
            <p className="text-buy-post">Price: {`${post.price}€`}</p>

            <button className="button" type="button" onClick={handleBuyPost}>
              BUY
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
