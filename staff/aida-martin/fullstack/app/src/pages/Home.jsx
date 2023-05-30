import { useState, useEffect, useContext } from 'react'
import './Home.css'
import { context, openModal, hideModal, setTheme, getTheme } from '../ui'
import retrieveUser from '../logic/retrieveUser'
import { DEFAULT_AVATAR_URL } from '../constants'
import Posts from '../components/Posts'
import AddPostModal from '../components/modals/AddPostModal'
import EditPostModal from '../components/modals/EditPostModal'
import SellPostModal from '../components/modals/SellPostModal'
import BuyPostModal from '../components/modals/BuyPostModal'
import Profile from '../components/Profile'
import Context from '../Context'

export default function Home ({ onLogOut }) {
  const { alert, freeze, unfreeze } = useContext(Context)

  const [view, setView] = useState('posts')
  const [modal, setModal] = useState(null)
  const [postId, setPostId] = useState(null)
  const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
  const [dark, setDark] = useState(getTheme() === 'dark')
  const [user, setUser] = useState()

  useEffect(() => handleRefreshUser(), [])

  const handleLogOut = () => {
    context.removeItem('userId')

    onLogOut()
  }

  const handleOpenAddPost = () => {
    setModal('add-post')

    openModal()
  }

  const handleOpenEditPost = (postId) => {
    setModal('edit-post')
    setPostId(postId)

    openModal()
  }

  const handleOpenSellPost = (postId) => {
    setModal('sell-post')
    setPostId(postId)

    openModal()
  }

  const handleOpenBuyPost = (postId) => {
    setModal('buy-post')
    setPostId(postId)

    openModal()
  }

  const handleCloseModal = () => {
    setModal(null)

    hideModal()
  }

  const handleGoToProfile = (event) => {
    event.preventDefault()

    setView('profile')
  }

  const handleGoToPosts = () => {
    try {
      setView('posts')

      handleRefreshUser()
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  const handleGoToSavedPosts = () => {
    try {
      setView('saved-posts')

      handleRefreshUser()
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  const handleSwitchMode = () => {
    const dark = getTheme() === 'light'

    const theme = dark ? 'dark' : 'light'

    setTheme(theme)
    setDark(dark)
  }

  const handlePostUpdated = () => {
    setModal(null)
    setLastPostsUpdate(Date.now())

    hideModal()
  }

  const handleRefreshUser = () => {
    try {
      freeze()

      retrieveUser(context.userId, (error, user) => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')

          return
        }
        setUser(user)
      })
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  return (
    <section className='home'>
      <header className='home-header'>
        <h1 className='home-title' onClick={handleGoToPosts}>
          HOME
        </h1>

        <nav className='home-header-nav'>
          {user &&
            <>
              <img
                className='avatar home-header-avatar'
                src={user.avatar ? user.avatar : DEFAULT_AVATAR_URL}
                alt=''
              />
              <a href='' className='profile-link' onClick={handleGoToProfile}>
                {user.name}
              </a>

              <button className='button logout-button' onClick={handleLogOut}>
                LOG OUT
              </button>
            </>}
        </nav>
      </header>

      {view !== 'profile' && (
        <div className='button-new-post-container'>
          <button
            className='button reverse-color icon-button toggle-theme-button'
            onClick={handleSwitchMode}
          >
            {dark
              ? (
                <span className='material-symbols-outlined theme'>dark_mode</span>
                )
              : (
                <span className='material-symbols-outlined theme'>sunny</span>
                )}
          </button>
          <button
            className='button reverse-color icon-button saved-posts-button'
            onClick={handleGoToSavedPosts}
          >
            <span className='material-symbols-outlined favs'>pages</span>
          </button>
          <button
            className='button reverse-color new-post-button'
            onClick={handleOpenAddPost}
          >
            NEW POST
          </button>
        </div>
      )}

      <main className='main-container'>

        {view === 'posts' && user && (
          <Posts
            currentUser={user}
            onEditPost={handleOpenEditPost}
            onSellPost={handleOpenSellPost}
            onBuyPost={handleOpenBuyPost}
            lastPostsUpdate={lastPostsUpdate}
          />
        )}

        {view === 'profile' && (
          <Profile
            onUpdateUserAvatar={handleGoToPosts}
            onUpdateUserPassword={handleGoToPosts}
          />
        )}

        {view === 'saved-posts' && user && (
          <Posts
            currentUser={user}
            mySavedPosts
            onEditPost={handleOpenEditPost}
            onSellPost={handleOpenSellPost}
            onBuyPost={handleOpenBuyPost}
            lastPostsUpdate={lastPostsUpdate}
          />
        )}

        {modal === 'add-post' && (
          <AddPostModal
            onPostCreated={handlePostUpdated}
            onCancel={handleCloseModal}
          />
        )}

        {modal === 'edit-post' && (
          <EditPostModal
            onPostEdited={handlePostUpdated}
            onCancel={handleCloseModal}
            postId={postId}
          />
        )}

        {modal === 'sell-post' && (
          <SellPostModal
            onPostForSale={handlePostUpdated}
            onCancel={handleCloseModal}
            postId={postId}
          />
        )}

        {modal === 'buy-post' && (
          <BuyPostModal
            onPostBought={handlePostUpdated}
            onCancel={handleCloseModal}
            postId={postId}
          />
        )}
      </main>
    </section>
  )
}
