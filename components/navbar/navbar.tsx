import React from 'react'
import Navbarcontent from './navbarcontent'
import { auth } from '@/auth'
import SigninButton from './signinbutton'
// import SigninButton from "./SignInButton";
// import SearchButton from "./SearchButton";

const NavBar = async () => {
  const session = await auth()
  const Role = session?.user.role
  return (
    <header className="flex px-2 bg-mediumBeige">
      <div className="flex justify-between items-center w-full">
        {Role && <Navbarcontent Role={Role} />}
        <div className="flex flex-row items-center">
          {/* <SearchButton /> */}
          {/* {Rule === "admin" ? null : <ShoppingCartDropdown />} */}
          {session && <SigninButton session={session} />}
        </div>
      </div>
    </header>
  )
}

export default NavBar
