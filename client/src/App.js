import SideBarAndHeader from './components/SideBarAndHeader'
import { useState, useContext, createContext} from 'react'


export const MyContext = createContext()

function App() {

  const [global, setGlobal] = useState({lg: 'en'})

  const changeGlobal = (monde) => {
    console.log(monde)
    setGlobal(monde)
  }


  return (
    <MyContext.Provider value={global}>
      <SideBarAndHeader changeGlobal={changeGlobal} />
    </MyContext.Provider> 
  )
}

export default App;

