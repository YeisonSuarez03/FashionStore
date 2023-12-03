import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export const PublicContext = React.createContext()

const PublicProvider = ({ children }) => {


   return (
      <PublicContext.Provider
         value={{}}
      >
         {children}
      </PublicContext.Provider>
   )
}

const PublicRoutes = () => {
   const dispatch = useDispatch()

   useEffect(() => {
         document.body.classList.add("app")
         document.body.classList.add("publicSite")
   }, [])

   return (
      <>
         <PublicProvider>
            <Layout className='w-full app__public'>
               <Header />
               <Layout className='w-full md:flex flex-row md:min-h-screen relative' style={{ minHeight: "92vh" }}>
                  <Layout className='app__main-content bg-white' style={{ minHeight: "92vh" }}>
                     <Content >
                        <main className='w-full flex-1'>
                           <Outlet />
                        </main>
                     </Content>
                  </Layout>
               </Layout>
            </Layout>
         </PublicProvider>
      </>
   )
}

export default PublicRoutes
