
import { Navigate, Route,Routes } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProblemsPage from './pages/ProblemsPage'
import { useUser } from '@clerk/clerk-react'
import Dashboard from './pages/Dashboard'
import Problem from './pages/Problem'
import SessionPage from './pages/SessionPage'
import { Toaster } from 'react-hot-toast'
function App() {
  const { isSignedIn,isLoaded } = useUser()
  if(!isLoaded)return null
  return (
    <>
    <Routes>
      <Route path="/" element={!isSignedIn ? <HomePage/>:<Navigate to="/dashboard"/>}/>
      <Route path="/dashboard" element={(isSignedIn ?<Dashboard/> :<Navigate to="/"/> )}/>
      <Route path="/problems" element={(isSignedIn ? <ProblemsPage /> : <Navigate to="/" />)}/>
      <Route path='/problem/:id' element={(isSignedIn?<Problem/>:<Navigate to='/'/>)}/>
      <Route path='/session/:id' element={(isSignedIn?<SessionPage/>:<Navigate to='/'/>)}/>

      
    </Routes>
<Toaster position="top-center"/>      
    </>
  )
}

export default App
