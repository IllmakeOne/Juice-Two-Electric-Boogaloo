import axios from 'axios'
import {getNumberOfWeek} from './rec/schedules/pieces/DatesMethods'

///////////////////////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------Get ALL-------------------------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////////////////////

export  const fetchProds = async () => {
    return axios.get(`http://localhost:5000/prods`)
         .then(function (response) {
            // console.log(response.data.map(el => {return {...el.data, id: el.id}}))
            return response.data.map(el => {return {...el.data, id: el.id}})
      })
}


export  const fetchCartProdLists = async () => {
    return axios.get(`http://localhost:5000/cart_lists`)
    .then(function (response) {
       console.log(response.data)
       return response.data.map(el => {return {...el.data, id: el.id}})
 })
}


export const getNameAndPhones = async () => {
    // console.log(date + ' ' + field)
    return axios.get(`http://localhost:5000/phones`)
         .then(function (response) {
            // console.log(response.data.map(el => {return el.data}))
            return response.data.map(el => {return el.data})
      })
}

export const getApps = async (field) => {
    return axios({
        method: 'get',
        url: `http://localhost:5000/apps/${field}`
      }).then(response => {
        //   console.log(response.data.map(el => {return el.data}))
        // return []
        return response.data.map(el => {return el.data})
    })
}

export const getWeeklyApps = async (field) => {
    return axios({
        method: 'get',
        url: `http://localhost:5000/apps/weekly/${field}`
      }).then(response => {
        //   console.log(response.data.map(el => {return el.data}))
        // return []
        return response.data.map(el => {return el.data})
    })
}

export const getSuppliers = async () => {
    return axios({
        method: 'get',
        url: 'http://localhost:5000/restock/supps'
      }).then(response => {
        //   console.log(response.data)
        // return []
        return response.data.map(el => {return {...el.data, id: el.id}})
    })
}


///////////////////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------  Add One   ----------------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////////////////

export const addCartList = async (newprod) => {
    // console.log(newprod.fav)
    axios({
        method: 'post',
        url: `http://localhost:5000/cart_lists`,
        data: newprod
      }).then(response => {
        return response.data
    })
}

export const addItem = (newprod) =>{
     // console.log({items, cash, card})
     axios({
        method: 'post',
        url: `http://localhost:5000/prods`,
        data: newprod
      }).then(response => {
          console.log(response.data)
        return response.data
    })    
}

export const addBill = async (bill) => {
    // console.log({items, cash, card})
    axios({
        method: 'post',
        url: `http://localhost:5000/bill/bar`,
        data: {bill: bill}
      }).then(response => {
          console.log(response.data)
        return response.data
    })
}

export const addAppointment = async (app) => {
    // console.log(app)
    axios({
        method: 'post',
        url: `http://localhost:5000/apps/add`,
        data: app
      }).then(response => {    
        // console.log(response.data)
        return response.data.data
    })
}


export const addOneSupplier = async (newSup) => {
    axios({
        method: 'post',
        url: `http://localhost:5000/restock/supps`,
        data: newSup
      }).then(response => {    
        // console.log(response.data)
        return response.data
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------Modify One--------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////

export const switchFavoriteItem =  async (newprod) => {
    axios({
        method: 'put',
        url: `http://localhost:5000/prods/${newprod.id}`,
        data: {...newprod, fav: !newprod.fav}
      }).then(response => {
        // console.log(response.data)
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------Delete One--------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteCartList = async (id) => {
    // console.log(newprod.fav)
    axios({
        method: 'delete',
        url: `http://localhost:5000/cart_lists/${id}`
      }).then(response => {
        return response.data
    })
}

export const deleteSupplier = async (id) => {
    // console.log(newprod.fav)
    axios({
        method: 'delete',
        url: `http://localhost:5000/restock/supps/${id}`
      }).then(response => {
        return response.data
    })
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////////////////////




export const switchKeyAssignment = async (newKey) => {
    return axios({
        method: 'put',
        url: `http://localhost:3001/keys/${newKey.id}`,
        data: {...newKey, assigned: !newKey.assigned}
      }).then(response => {
          console.log(response.data)
          return response.data
      })
}

export const putClient = async (newClient) => {
    return axios({
        method: 'put',
        url: `http://localhost:30f01/keys/${newClient.id}`,
        data: newClient
      }).then(response => {
        //   console.log(response.data)
          return response.data
      })
}

export const putKey = async (newKey) => {
    return axios({
        method: 'put',
        url: `http://localhost:3001/keys/${newKey.id}`,
        data: newKey
      }).then(response => {
        //   console.log(response.data)
          return response.data
      })
}

export const unlockKey = async (key) => {
    return axios({
        method: 'put',
        url: `http://localhost:3001/keys/${key.id}`,
        data: {...key, assigned: false}
      }).then(response => {
        //   console.log(response.data)
          return response.data
      })

      //TODO!!
      //in the server this should also release the key from the cient
      //and check out the client from the 
}

export const putOneSupplier = async (newSup) => {
    axios({
        method: 'put',
        url: `http://localhost:5000/restock/supps/${newSup.id}`,
        data: newSup
      }).then(response => {    
        // console.log(response.data)
        return {...response.data[0].data,id: response.data[0].id }
    })
}

export const getSpecificKey =  async (keyId) => {
    return axios.get(`http://localhost:3001/keys?id=${keyId}`)
         .then(function (response) {
            // console.log(response.data)
            return response.data
      })
}


export const getSpecificClient = (clientId) => {
    return axios.get(`http://localhost:3001/clients?id=${clientId}`)
         .then(function (response) {
            // console.log(response.data)
            return response.data
      })
}

export const getTennisCourts = async ({date}) => {
    var res=[]
    const t1 = await axios.get(`http://localhost:3001/apps?date=${date}&field=T1`)
         .then(function (response) {
        return response.data
    })
    
    const t2 = await axios.get(`http://localhost:3001/apps?date=${date}&field=T2`)
        .then(function (response) {
        return response.data
    })
   
    const t3 = await axios.get(`http://localhost:3001/apps?date=${date}&field=T3`)
        .then(function (response) {
            // console.log(response.data)
        return response.data
    })
    
    // console.log('t1')
    // console.log(t1)
    // console.log('t2')
    // console.log(t2)
    // console.log('t3')
    // console.log(t3)
    res.push(t1)
    res.push(t2)
    res.push(t3)
    // console.log(res)
        return await res
}

export const updateClient = async (client) => {
    return axios({
        method: 'put',
        url: `http://localhost:3001/clients/${client.id}`,
        data: client
      }).then(response => {
          console.log(response.data)
          return response.data
      })
}
//------------Ghostsss---------------//appointments that await confimation or are in waiting for a postion


export const getGhosttennis = async ({date}) => {
    // console.log(date + ' ' + field)
    return axios.get(`http://localhost:3001/apps?date=${date}&field=tennis&status=cw`)
         .then(function (response) {
            // console.log(response.data)
            return response.data
      })
}


//--------------------------Deletes----------------------

export const DeleteAppointment = async ({app}) => {
    // return axios.delete(`http://localhost:3001/apps/${app.id}`)
    //      .then(function (response) {
    //         // console.log(response.data)
    //         return response.data
    //   })
}


const API = 'http://localhost:3001/'


export  const fetchKeys = async () => {
    const res = await fetch('http://localhost:3001/keys')
    const data = await res.json()
    // console.log(data)
    return data
}



export  const fetchApprow = async () => {
    const res = await fetch('http://localhost:3001/apps')
    const data = await res.json()
    // console.log(data)
    return data
}

export  const fetchAppoitments = async () => {
    const res = await fetch('http://localhost:3001/appointments')
    const data = await res.json()
    // console.log(data)
    return data
}

export  const fetchClients = async () => {
    const res = await fetch('http://localhost:3001/clients')
    const data = await res.json()
    // console.log(data)
    return data
}



//-----------------------------Setters--------------




export default function DBconn() {
    return (
        <div>
            
        </div>
    )
}
