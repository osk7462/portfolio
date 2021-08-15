import React from 'react'
import axiosInstance from './axios'

const AppContext = React.createContext()

const getLoggedIn = () => {
  if (localStorage.getItem('access_token') !== null)
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
  const [projects, setProjects] = React.useState([])
  const[skills, setSkills] = React.useState([])
  const [loadProject, setLoadProject] = React.useState(false)

  const  customFetch = async () => {
    const url ='https://osk7462-api.herokuapp.com/'

    await fetch(url+'about')
    .then(response => response.json())
    .then(data => {
      setProfile(data[0])
      setSkills(data[0].skills)
    })

    await fetch(url+'projects')
    .then(response => response.json())
    .then(data => setProjects(data))

    setLoading(false)
    // await axiosInstance
    // .get('about/')
    // .then (response => {
    //   setProfile({...response.data[0]})
    //   setSkills(response.data[0].skills)
    //   setLoading(false)
    // })
    // .catch (error => {
    //   console.log("error loading profile", error.data)

    // })
  //   await axiosInstance.get('projects/')
  //   .then(response => {
  //     setLoading(true)
  //     setProjects(response.data)
  //     setLoading(false)
  //   })
  //   .catch(err => console.log('error loading projects', err))
  }
 

  React.useEffect(()=>{
    customFetch()
  },[loadProject])


  return <AppContext.Provider value={{
    darkMode, setDarkMode,
    loggedIn, setLoggedIn,
    profile,setProfile,
    loading, setLoading,
    projects, setProjects,
    skills, setSkills,
    loadProject, setLoadProject,
    }}>
    {children}
  </AppContext.Provider>
}


export const GlobalContext = () => {
  return React.useContext(AppContext)

}
