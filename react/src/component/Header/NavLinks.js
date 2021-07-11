import React from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'






const navLinks = [
  {name: 'Home', link:'#home'},
  {name: 'About', link: '#about'},
  {name: 'Projects', link: '#projects'},
  // {name: 'Blog', link: '#blog'},
  {name: 'Contact', link: '#contact'},
]


function NavLinks(props) {
  const [currentTab, setCurrentTab] = React.useState(0)

  function handleScroll(e) {

    for(let i=0; i<navLinks.length; i++) {
      let link = navLinks[i].link.substring(1)
      const rect = document.getElementById(link).getBoundingClientRect()
      const elementPosition = rect.top + window.scrollY
     if ((window.pageYOffset >= elementPosition-50) && (window.pageYOffset <= elementPosition + rect.height - 400)) {
      setCurrentTab(i)
      break
     }
    }
  }


  React.useEffect(()=>{
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  },[])


  return (
    <Tabs 
      value={currentTab}
      textColor="primary"
      onChange={(e,value)=> setCurrentTab(value)}
      {...props}
    >
     {
       navLinks.map((navLink, index) => {
         return (
          <Tab key={index} label={navLink.name} href={navLink.link} />
         )
       })
     }
   </Tabs>
  )
}

export default NavLinks
