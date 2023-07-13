import './Post.css'
import { useState } from 'react'
import { useAppContext } from '../hooks'
import { DEFAULT_AVATAR_URL } from '../constants'
import formatLikes from '../logic/helpers/utils'
import {
  toggleLikePost,
  toggleSavePost,
  deletePost,
  togglePrivatizePost,
  isCurrentUser,
  getUserId,
} from '../logic'

export default function Post({
  post,
  onEditPost,
  onLiked,
  onSaved,
  onDeletePost,
  onPrivatizePost,
  onSellPost,
  onBuyPost,
}) {
  const { alert, freeze, unfreeze } = useAppContext()

  const [privateIcon, setPrivateIcon] = useState(
    post.visibility === 'public' ? 'lock_open' : 'lock'
  )

  const handleLikePost = () => {
    try {
      freeze()

      toggleLikePost(post.id)
        .then(onLiked)
        .catch((error) => alert(error.message, 'error'))
        .finally(unfreeze)
    } catch (error) {
      unfreeze()

      alert(error.message, 'warn')
    }
  }

  const handleSavePost = () => {
    try {
      freeze()

      toggleSavePost(post.id)
        .then(onSaved)
        .catch((error) => alert(error.message, 'error'))
        .finally(unfreeze)
    } catch (error) {
      unfreeze()

      alert(error.message, 'warn')
    }
  }

  const handleEditPost = () => {
    onEditPost(post.id)
  }

  const handleDeletePost = () => {
    try {
      freeze()

      deletePost(post.id)
        .then(onDeletePost)
        .catch((error) => alert(error.message, 'error'))
        .finally(unfreeze)
    } catch (error) {
      unfreeze()

      alert(error.message, 'warn')
    }
  }

  const handlePrivatizePost = () => {
    try {
      freeze()

      togglePrivatizePost(post.id)
        .then(() => {
          setPrivateIcon(privateIcon === 'lock' ? 'lock_open' : 'lock')

          onPrivatizePost()
        })
        .catch((error) => alert(error.message, 'error'))
        .finally(unfreeze)
    } catch (error) {
      unfreeze()

      alert(error.message, 'warn')
    }
  }

  const handleSellPost = () => {
    onSellPost(post.id)
  }

  const handleBuyPost = () => {
    onBuyPost(post.id)
  }

  const isCurrentUserPost = isCurrentUser(post.author.id)

  return (
    <article data-id={post.id}>
      <div className="user-container-post">
        <img
          className="avatar"
          src={post.author.avatar ? post.author.avatar : DEFAULT_AVATAR_URL}
        />
        <p className="post-user">{post.author.name}</p>
        {isCurrentUserPost && (
          <span
            className="material-symbols-outlined private"
            onClick={handlePrivatizePost}
          >
            {privateIcon}
          </span>
        )}
      </div>
      <div className="image-container-post">
        <img className="post-image" src={post.image} />
      </div>
      <div className="likes-saves-container">
        <span
          className={`material-symbols-outlined likes ${
            post.likes && post.likes.includes(getUserId()) ? 'fill' : 'unfill'
          }`}
          onClick={handleLikePost}
        >
          favorite
        </span>
        <p className="count-likes">{formatLikes(post)}</p>
        <span
          className={`material-symbols-outlined saves ${
            post.saves ? 'fill' : 'unfill'
          }`}
          onClick={handleSavePost}
        >
          bookmark
        </span>
      </div>
      <time className="post-date">
        {new Date(post.date).toLocaleString('en-GB')}
      </time>
      <p className="post-text">{post.text}</p>
      {isCurrentUserPost && (
        <div className="utils-container-post">
          <button
            className="button reverse-color icon-button edit-post-button"
            onClick={handleEditPost}
          >
            <span className="material-symbols-outlined edit">stylus</span>
          </button>
          <button
            className="button reverse-color icon-button delete-post-button"
            onClick={handleDeletePost}
          >
            <span className="material-symbols-outlined delete">delete</span>
          </button>
          <button
            className="button reverse-color sell-post-button"
            onClick={handleSellPost}
          >
            SELL {`${post.price && post.price > 0 ? post.price + '€' : ''}`}
          </button>
        </div>
      )}

      {post.author.id !== getUserId() && post.price !== 0 && (
        <div className="utils-container-post">
          <button
            className="button reverse-color buy-post-button"
            onClick={handleBuyPost}
          >
            BUY {`${post.price + '€'}`}
          </button>
        </div>
      )}
    </article>
  )
}
