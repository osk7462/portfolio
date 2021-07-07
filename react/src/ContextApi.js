import React from 'react'
import axiosInstance from './axios'

const AppContext = React.createContext()

const getLoggedIn = () => {
  if (localStorage.getItem('access_token') !== 'null')
    return true
  else 
    return false
}


const initialProfile = {
    id: '',
    name: '',
    image: '',
    resume: '',
    description: '',
    skills: [
      {
        id: '',
        name: '',
        proficiency: ''
      }
    ]
}

export const AppProvider = ({children}) => {
  const [darkMode, setDarkMode] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(getLoggedIn)
  const[profile, setProfile] = React.useState(initialProfile)
  const[loading, setLoading] = React.useState(true)

  const fetch = async () => {
    axiosInstance
    .get('about/')
    .then (response => {
      setProfile({...response.data[0]})
      setLoading(false)
    })
    .catch (error => {
      console.log("error loading profile", error)
    })
  }

  React.useEffect(()=>{
    fetch()
  },[])






  return <AppContext.Provider value={{
    darkMode, setDarkMode,
    loggedIn, setLoggedIn,
    profile,setProfile,
    loading, setLoading,
    }}>
    {children}
  </AppContext.Provider>
}


export const GlobalContext = () => {
  return React.useContext(AppContext)

}
