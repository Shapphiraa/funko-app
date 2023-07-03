import { useState, useEffect } from 'react'
import './Posts.css'
import Post from './Post'
import retrievePosts from '../logic/retrievePosts'
import retrieveSavedPosts from '../logic/retrieveSavedPosts'
import { context } from '../ui'
import { useAppContext } from '../hooks'

export default function Posts({
  user,
  mySavedPosts = false,
  onEditPost,
  onSellPost,
  onBuyPost,
  lastPostsUpdate,
}) {
  const { alert, freeze, unfreeze } = useAppContext()

  const [posts, setPosts] = useState()

  // esto se hace solo una vez (por eso no tiene a quién observar)
  useEffect(() => handleRefreshPosts(), [])

  const handleRefreshPosts = () => {
    freeze()
    try {
      if (!mySavedPosts) {
        retrievePosts(context.token)
          .then((posts) => {
            unfreeze()

            setPosts(posts)
          })
          .catch((error) => {
            unfreeze()

            alert(error.message, 'error')
          })
      } else {
        retrieveSavedPosts(context.token)
          .then((savedPosts) => {
            unfreeze()

            setPosts(savedPosts)
          })
          .catch((error) => {
            unfreeze()

            alert(error.message, 'error')
          })
      }
    } catch (error) {
      unfreeze()

      alert(error.message, 'warn')
    }
  }

  useEffect(() => {
    if (lastPostsUpdate) {
      handleRefreshPosts()
    }
  }, [lastPostsUpdate])

  return (
    <section className="posts-list">
      {posts &&
        posts.map((post) => (
          <Post
            user={user}
            post={post}
            onEditPost={onEditPost}
            onSellPost={onSellPost}
            onBuyPost={onBuyPost}
            onLiked={handleRefreshPosts}
            onSaved={handleRefreshPosts}
            onDeletePost={handleRefreshPosts}
            onPrivatizePost={handleRefreshPosts}
            key={post.id}
          />
        ))}
    </section>
  )
}
