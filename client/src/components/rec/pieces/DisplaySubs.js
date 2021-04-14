import React from 'react'
import InfoTabs from '../../resources/clients/InfoTabs'

function DisplaySubs({subs}) {
    return (
        <div><br/> <br/><br/>
            <InfoTabs subH = { basicSubscribtionHistory }  
                      entryH = {dummyEntryHistory}
                      client ={dummyClinet}/>
        </div>
    )
}

const dummyEntryHistory = [
    {
        entry: '10-10-2010',
        duration: 90,
    },
    {
        entry: '10-10-2013',
        duration: 45,
    },
    {
        entry: '10-10-2014',
        duration: 120,
    }
]

const dummyClinet = {
    "id": 1,
    "name": "Decretann Ioana",
    "email": null,
    "phone": "0720440760",
    "crtsub": {
      "type": "ffull",
      "left": 0,
      "end": "02-05-2021"
    },
    "comment": "i tired this"
  }
const basicSubscribtionHistory=[
  {
    "type": "F10",
    "left": 10,
    'start': '10-3-2021',
    "end": "10-4-2021"
  },
  {
    "type": "FF",
    "left": -1,
    'start': '15-4-2021',
    "end": "15-5-2021"
  },{
    "type": "F10",
    "left": 10,
    'start': '2-3-2021',
    "end": "2-4-2021"
  },
  {
    "type": "FF",
    "left": -1,
    'start': '15-04-2021',
    "end": "15-05-2021"
  },{
    "type": "F10",
    "left": 0,
    'start': '02-04-2021',
    "end": "02-05-2021"
  },
  {
    "type": "FF",
    "left": -1,
    'start': '15-04-2021',
    "end": "15-05-2021"
  },
  {
    "type": "FF",
    "left": -1,
    'start': '15-04-2021',
    "end": "15-05-2021"
  },
  {
    "type": "FF",
    "left": -1,
    'start': '15-04-2021',
    "end": "15-05-2021"
  },
  {
    "type": "FF",
    "left": -1,
    'start': '15-04-2021',
    "end": "15-05-2021"
  },
  {
    "type": "FF",
    "left": -1,
    'start': '15-04-2021',
    "end": "15-05-2021"
  },
  {
    "type": "FF",
    "left": -1,
    'start': '15-04-2021',
    "end": "15-05-2021"
  },
  {
    "type": "FF",
    "left": -1,
    'start': '15-04-2021',
    "end": "15-05-2021"
  },
  ]

export default DisplaySubs
