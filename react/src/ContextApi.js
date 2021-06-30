import React from 'react'

const AppContext = React.createContext()

export const AppProvider = ({children}) => {
  const [darkMode, setDarkMode] = React.useState(false)
  
  
  return <AppContext.Provider value={{darkMode, setDarkMode}}>
    {children}
  </AppContext.Provider>
}


export const GlobalContext = () => {
  return React.useContext(AppContext)

}