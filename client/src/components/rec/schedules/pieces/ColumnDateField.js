import {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'      

import { getAppsByDateandField, getTennisCourts, getAppsByDateandFieldGhost, getGhosttennis }  from '../../../DBconn'
import { GridRow, GridColumn } from 'emotion-flex-grid'

      
import FullCell from '../cells/FullCell'    
import EmptyCell from '../cells/EmptyCell'
import { Paper } from '@material-ui/core'

import  {getCrtWeek, getNextWeek } from '../pieces/DatesMethods'
import { red } from '@material-ui/core/colors'




const dayLenght = 38

function ColumnDateField({date,name, field, _mouseMove, onDubClick, 
                        rowLight, openShowApp, variant}) {
    const C = useStyles()
    const [apps, setApps] = useState([])
    // console.log(date)

    const getallQ = variant=='all'

    const getmaxappLengh = (timestart, court) => {
        var res = 0
        var i 
        for(i = timestart ; i < (38-timestart);i++){
            const nextone=apps.filter(el => el.field == court).filter(el => el.time==i)
            if (nextone.length != 0){
                return res
            }
            res++
        }
        return res
    }

    const fullcellDB = app =>{
        openShowApp(app)
    }

    const handleMouseMove = (time) => {
        _mouseMove(time)
    }

    const makeApp = (time, fieldd, maxL) => {
        onDubClick(time, date, fieldd,maxL)
    }    

    useEffect(() =>{
        const getApps = async () => {
            if(getallQ){
                if(field == 'Tennis' || field =='Tenis') {
                    var serverApps = await getTennisCourts({date})
                    // console.log(serverApps)
                    setApps(serverApps)
                } else if(field == 'OutDoor' || field =='Fotbal') {
                    const serverApps = await getAppsByDateandField({date: date,field: 'OutDoor'})
                    // console.log(serverApps)
                    setApps(serverApps)
                } else if(field == 'Sala Polivalenta' || field =='Hall') {
                    const serverApps = await getAppsByDateandField({date:date,field: 'Hall'})
                    setApps(serverApps)
                } else if(field == 'Aerobic') {
                    const serverApps = await getAppsByDateandField({date,field})
                    setApps(serverApps)                    
                } 
            } else {
                if(field == 'Tennis' || field =='Tenis') {
                    var serverApps = await getGhosttennis({date})
                    // console.log(serverApps)
                    setApps(serverApps)
                } else if(field == 'OutDoor' || field =='Fotbal') {
                    const serverApps = await getAppsByDateandFieldGhost({date: date,field: 'OutDoor'})
                    // console.log(serverApps)
                    setApps(serverApps)
                } else if(field == 'Sala Polivalenta' || field =='Hall') {
                    const serverApps = await getAppsByDateandFieldGhost({date:date,field: 'Hall'})
                    setApps(serverApps)
                } else if(field == 'Aerobic') {
                    const serverApps = await getAppsByDateandFieldGhost({date,field})
                    setApps(serverApps)                    
                } 
            }
        }
        getApps()
    }, [date, field])


    const generateLine = () => {
        var ret = []
        var i
        if(field ==  'Tennis'|| field == 'Tenis') { 
            ret.push([])
            ret.push([])
            ret.push([])                
            tennisCourts.map((court) => {
                const crtField = parseInt(court.substring(1)) - 1
                const t1 = apps[crtField]

                for ( i = 0;i < dayLenght ; i++) {
                    var aux =[]
                    if(t1!=undefined) 
                        if(t1.length == 1 ){
                            aux = t1
                        } else if(t1.length > 1 ){
                            aux = t1.filter(el=>el.time==i)
                        }
                    if (aux.length != 0){
                        const app = aux[0]
                        i+= app.duration - 1
                        const height = app.duration * 25

                        ret[crtField].push(
                            <Paper 
                                elevation={3} style={{height:height }} 
                                onClick={()=>handleMouseMove(app.time)}
                                onDoubleClick={()=>(fullcellDB(app))}
                                >
                                <FullCell app={app}/>
                            </Paper>)
                    } else {
                        const auxi = i
                        const Auxfield = 'T' + (crtField+1)
                        const hilit = auxi==rowLight?'lit':''
                        ret[crtField].push(
                            <Paper 
                                elevation={2} 
                                onDoubleClick = {()=>makeApp(auxi,Auxfield,getmaxappLengh(auxi, Auxfield))}
                                onClick={()=>handleMouseMove(auxi)}
                                className={hilit}
                                >
                                <EmptyCell i={i}/> 
                            </Paper>
                        )
                    }
                }
            })
                return (
                    <div>
                        <GridRow wrap='wrap' >
                            <GridColumn width={4}>
                                {ret[0]}
                            </GridColumn>
                            <GridColumn width={4}>
                                {ret[1]}
                            </GridColumn>
                            <GridColumn width={4}>
                                {ret[2]}
                            </GridColumn>
                        </GridRow>
                    </div>
                )

        } else if(field== 'Aerobic') { 
            ret.push([])
            ret.push([])
            ret.push([])                
            aerobicRooms.map((court) => {
                const crtField = parseInt(court.substring(1)) - 1

                for ( i = 0;i < dayLenght ; i++) {

                    const aux = apps.filter(el => el.field == court).filter(el => el.time==i).filter(el => el.date===date )

                    if (aux.length != 0){
                        const el = aux[0]
                        i+= el.duration - 1
                        const height = el.duration * 25

                        ret[crtField].push(
                            <Paper 
                                elevation={3} style={{height:height }} 
                                onClick={()=>handleMouseMove(el.time)}
                                onDoubleClick={()=>(fullcellDB(el))}
                                >
                                <FullCell app={el}/>
                            </Paper>)
                    } else {
                        const auxi = i
                        const Auxfield = 'A' + (crtField+1)
                        const hilit = auxi==rowLight?'lit':''
                        ret[crtField].push(
                            <Paper 
                                elevation={2} 
                                onDoubleClick = {()=>makeApp(auxi,Auxfield,getmaxappLengh(auxi, Auxfield))}
                                onClick={()=>handleMouseMove(auxi)}
                                className={hilit}
                                >
                                <EmptyCell i={i}/> 
                            </Paper>
                        )
                    }
                }
            })
                return (
                    <div>
                        <GridRow wrap='wrap' >
                            <GridColumn width={4}>
                                {ret[0]}
                            </GridColumn>
                            <GridColumn width={4}>
                                {ret[1]}
                            </GridColumn>
                            <GridColumn width={4}>
                                {ret[2]}
                            </GridColumn>
                        </GridRow>
                    </div>
                )
        } else { // if it not tennis(or aerobic) fill it normally, with one column for each day
            for ( i = 0;i < dayLenght ; i++){
                const aux = apps.filter(el => el.time==i).filter(el => el.date === date)
                if (aux.length != 0){
                    const el = aux[0]
                    
                    i+= el.duration - 1

                    const height = el.duration * 25
                    ret.push(
                        <Paper elevation={3} style={{height:height }} 
                            onClick={()=>handleMouseMove(el.time)}
                            onDoubleClick={()=>(fullcellDB(el))}
                            >
                            <FullCell app={el} />
                        </Paper>)

                } else {//if there is nothing scheudle for this hour
                    const auxi = i
                    const hilit = auxi==rowLight?'solid ':''
                    ret.push(
                        <Paper 
                            elevation={2} 
                            onDoubleClick = {()=>makeApp(auxi, field,getmaxappLengh(auxi, field))}
                            onClick={()=>handleMouseMove(auxi)}
                            style={{border: `2px ${hilit}#FFB231`, 
                                    margin: 0}}
                            >
                                <EmptyCell i={i}/> 
                        </Paper>
                        )
                }
            }
        }
            return ret
    }



    return (
        <GridColumn width={12/7} className = {C.column}> 
            
                <Paper elevation={3} className={C.daynameCell}>
                    {name}<br/>{date}
                </Paper> 
            {/* {console.log(getNextWeek(new Date))} */}
            {generateLine()}
            
            <Paper elevation={3} className={C.daynameBottom}>
                    {date}
            </Paper>  

        </GridColumn> 
    )
}

const useStyles = makeStyles({
    lit:{
        border: 5,
        borderColor: 'yellow',
        background: 'red',
    },
    column:{
        margin: 3,
    },
    daynameCell:{
        background: '#0cbff5',    
        height: 60,   
        textAlign: 'center',
        fontSize: 23,

        position: 'sticky',
        top: 73,
    },

    daynameBottom:{
        background: '#0cbff5',    
        height: 30,   
        textAlign: 'center',
        fontSize: 23,
        position: 'sticky',
        bottom: 5,
    },
});


const columns = [
    'Hall',
    'OutDoor',
    'Aerobic',
]
const aerobicRooms =[
    'A1',
    'A2',
    'A3'    
]
const tennisCourts = [
    'T1',
    'T2',
    'T3'
]

export default ColumnDateField
