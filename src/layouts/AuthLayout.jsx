import { useEffect } from 'react'
import {Outlet} from 'react-router-dom'
//todo el contenido estara dentro del main
const AuthLayout = () => {

  useEffect(() => {
       document.body.classList.remove("app")
       document.body.classList.remove("publicSite")
 }, [])

  return (
    <>
        <main style={{ width: "100vw", height: "100vh" }}  className='container mx-auto h-full p-5 md:flex md:justify-center'>
            <div className='md:w-2/3 lg:w-2/5'>
               <Outlet />
            </div>
            
        </main>
    </>
  )
}

export default AuthLayout