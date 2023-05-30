import './BuyPostModal.css'
import { useState, useEffect, useContext } from 'react'
import buyPost from '../../logic/buyPost'
import retrievePost from '../../logic/retrievePost'
import { context } from '../../ui'
import Context from '../../Context'
import Modal from '../../library/Modal'
import Container from '../../library/Container'

export default function BuyPostModal ({ postId, onPostBought, onCancel }) {
  const { alert, freeze, unfreeze } = useContext(Context)

  const [post, setPost] = useState(null)

  function handleBuyPost () {
    try {
      freeze()

      buyPost(context.userId, postId, (error) => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')

          return
        }
        onPostBought()
      })
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  function handleCancel () {
    onCancel()
  }

  useEffect(() => {
    try {
      freeze()

      retrievePost(context.userId, postId, (error, post) => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')

          return
        }

        setPost(post)
      })
    } catch (error) {
      alert(error.message, 'warn')
    }
  }, [postId])

  return (
    <>
      {post &&
        <Modal tag='section'>
          <Container tag='form' className='buy-post-form form'>
            <h2>BUY POST</h2>

            <p className='text-buy-post'>Are you sure to buy this post?
            </p>
            <p className='text-buy-post'>Price: {`${post.price}€`}
            </p>

            <button className='button' type='button' onClick={handleBuyPost}>BUY</button>
            <button className='button cancel' type='button' onClick={handleCancel}>CANCEL</button>
          </Container>
        </Modal>}
    </>
  )
}
