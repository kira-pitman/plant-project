import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from './Styled.tsx'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const { logout, loginWithRedirect, user } = useAuth0()

  function handleLogin() {
    loginWithRedirect({ redirectUri: `${window.location.origin}` });
  }

  function handleLogout() {
    logout({ returnTo: `${window.location.origin}` });
  }

  // const handleSignOut = () => {
  //   logout()
  // }

  // const handleSignIn = () => {
  //   loginWithRedirect()
  //   console.log(user)
  // }

  return (
    <>
      <NavGroup>
        <IfAuthenticated>
          <NavButton onClick={handleLogout}>Sign out</NavButton>
          {user && <p>Signed in as: {user?.nickname}</p>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavButton onClick={handleLogin}>Sign in</NavButton>
        </IfNotAuthenticated>
      </NavGroup>
      <h1>Fruit FTW!</h1>
    </>
  )
}

export default Nav