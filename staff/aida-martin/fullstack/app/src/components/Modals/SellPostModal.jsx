import './SellPostModal.css'
import { useState, useEffect, useContext } from 'react'
import sellPost from '../../logic/sellPost'
import retrievePost from '../../logic/retrievePost'
import { context } from '../../ui'
import Context from '../../Context'
import Modal from '../../library/Modal'
import Container from '../../library/Container'

export default function SellPostModal ({ postId, onPostForSale, onCancel }) {
  const { alert, freeze, unfreeze } = useContext(Context)

  const [post, setPost] = useState(null)

  function handleSellPost (event) {
    event.preventDefault()

    const price = event.target.price.value

    try {
      freeze()

      sellPost(context.userId, postId, price, (error) => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')

          return
        }
        onPostForSale()
      })
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  function handleCancel (event) {
    event.preventDefault()

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
          <Container tag='form' className='sell-post-form form' onSubmit={handleSellPost}>
            <h2>SELL YOUR POST</h2>
            <input
              className='input'
              type='number'
              name='price'
              defaultValue={post.price}
              placeholder='Post price'
            />

            <button className='button' type='submit'>UPDATE</button>
            <button className='button cancel' type='button' onClick={handleCancel}>CANCEL</button>
          </Container>
        </Modal>}
    </>
  )
}
