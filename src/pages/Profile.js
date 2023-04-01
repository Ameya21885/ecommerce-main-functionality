import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { loginWithRedirect,user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }
  return (
    <div>
      <h1>Profile</h1>
{
    isAuthenticated ? (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    ):(
        <>
        <button onClick={() => loginWithRedirect()}>Log In</button>
        </>
    )
}
    </div>
  )
}

export default Profile
