import { useState, useEffect, useContext } from 'react'
import './Posts.css'
import Post from './Post'
import retrievePosts from '../logic/retrievePosts'
import retrieveSavedPosts from '../logic/retrieveSavedPosts'
import { context } from '../ui'
import Context from '../Context'

export default function Posts ({ user, mySavedPosts = false, onEditPost, onSellPost, onBuyPost, lastPostsUpdate }) {
  const { alert, freeze, unfreeze } = useContext(Context)

  const [posts, setPosts] = useState()

  // esto se hace solo una vez (por eso no tiene a quién observar)
  useEffect(() => handleRefreshPosts(), [])

  const handleRefreshPosts = () => {
    freeze()
    try {
      if (!mySavedPosts) {
        retrievePosts(context.userId, (error, posts) => {
          unfreeze()
          if (error) {
            alert(error.message, 'error')

            return
          }

          setPosts(posts)
        })
      } else {
        retrieveSavedPosts(context.userId, (error, savedPosts) => {
          unfreeze()
          if (error) {
            alert(error.message, 'error')

            return
          }

          setPosts(savedPosts)
        })
      }
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  useEffect(() => {
    if (lastPostsUpdate) { handleRefreshPosts() }
  }, [lastPostsUpdate])

  return (
    <section className='posts-list'>
      {posts && posts.map(post => <Post user={user} post={post} onEditPost={onEditPost} onSellPost={onSellPost} onBuyPost={onBuyPost} onLiked={handleRefreshPosts} onSaved={handleRefreshPosts} onDeletePost={handleRefreshPosts} onPrivatizePost={handleRefreshPosts} key={post.id} />)}
    </section>
  )
}
