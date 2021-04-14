import axios from 'axios'


export const switchFavoriteItem = (newprod) => {
    // console.log(newprod.fav)
    axios({
        method: 'put',
        url: `http://localhost:5000/prods/${newprod.id}`,
        data: {...newprod, fav: !newprod.fav}
      }).then(response => {
        return response.data
    })
}

export const addItem = (newprod) => {
    // console.log(newprod.fav)
    axios({
        method: 'post',
        url: `http://localhost:3001/prods`,
        data: newprod
      }).then(response => {
        return response.data
    })
}

export const addAppointment = (app) => {
    // console.log(newprod.fav)
    axios({
        method: 'put',
        url: `http://localhost:3001/prods/${app.id}`,
        data: app
      }).then(response => {
        return response.data
    })
}

export const switchKeyAssignment = (newKey) => {
    return axios({
        method: 'put',
        url: `http://localhost:3001/keys/${newKey.id}`,
        data: {...newKey, assigned: !newKey.assigned}
      }).then(response => {
          console.log(response.data)
          return response.data
      })
}

export const putClient = (newClient) => {
    return axios({
        method: 'put',
        url: `http://localhost:30f01/keys/${newClient.id}`,
        data: newClient
      }).then(response => {
        //   console.log(response.data)
          return response.data
      })
}

export const putKey = (newKey) => {
    return axios({
        method: 'put',
        url: `http://localhost:3001/keys/${newKey.id}`,
        data: newKey
      }).then(response => {
        //   console.log(response.data)
          return response.data
      })
}

export const unlockKey = (key) => {
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

export const getSpecificKey = (keyId) => {
    return axios.get(`http://localhost:3001/keys?id=${keyId}`)
         .then(function (response) {
            // console.log(response.data)
            return response.data
      })
}

export const getappsClients = () => {
    return axios.get(`http://localhost:3001/phones`)
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

export const getAppsByDateandField = async ({date, field}) => {
    // console.log(date + ' ' + field)
    return axios.get(`http://localhost:3001/apps?date=${date}&field=${field}`)
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
export const getAppsByDateandFieldGhost=async ({date, field}) => {
    // console.log(date + ' ' + field)
    return axios.get(`http://localhost:3001/apps?date=${date}&field=${field}&status=cw`)
         .then(function (response) {
            // console.log(response.data)
            return response.data
      })

}

export const getGhosttennis = async ({date}) => {
    // console.log(date + ' ' + field)
    return axios.get(`http://localhost:3001/apps?date=${date}&field=tennis&status=cw`)
         .then(function (response) {
            // console.log(response.data)
            return response.data
      })
}

export const getNameAndPhones = async () => {
    // console.log(date + ' ' + field)
    return axios.get(`http://localhost:3001/phones`)
         .then(function (response) {
            console.log(response.data)
            return response.data
      })
}


export const addCartList = async (list)=>{
    console.log(list)
    //send to db new cartlist
    // console.log(list)
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

export  const fetchProds = async () => {
    return axios.get(`http://localhost:5000/prods`)
         .then(function (response) {
            console.log(response.data)
            return response.data
      })
}

export  const fetchKeys = async () => {
    const res = await fetch('http://localhost:3001/keys')
    const data = await res.json()
    // console.log(data)
    return data
}

export const fetchSuppliers = async () => {
    const res = await fetch('http://localhost:3001/suppliers')
    const data = await res.json()
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

export  const fetchCartProdLists = async () => {
    const res = await fetch('http://localhost:3001/cartlists')
    const data = await res.json()
    // console.log(data)
    return data
}



export default function DBconn() {
    return (
        <div>
            
        </div>
    )
}
