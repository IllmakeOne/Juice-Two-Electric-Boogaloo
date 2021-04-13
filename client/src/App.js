import logo from './logo.svg';
import './App.css'
import Button from '@material-ui/core/Button'

import axios from 'axios'

import { useState, useEffect} from 'react'


const getProds = async () => {
  axios({
      method: 'get',
      url: `http://localhost:5000/prods`
  }).then(response => {
      console.log('started')
      console.log(response)
      // console.log(response.data)
      return response.data
  })
}
// console.log('started')

function App() {

  const [aux, setAux] = useState('aaaa')

  useEffect(()=>{
    const Anon = async ()=>{
      const dab = await getProds()
      setAux(dab)

    }
    Anon()
  },[])

  return (
    <div className="redbagkround">
      {/* <h2>{aux}</h2> */}
      <Button onClick={getProds} >AAaq</Button>
    </div>
  );
}

export default App;
