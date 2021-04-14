import React from 'react'
import DateChanger from '../DateChanger'
import FieldChanger from '../FieldChanger'
import { GridRow, GridColumn } from 'emotion-flex-grid'

function FieldAndDateChanger({changeField,weekMutiplier,changeDateMultiplier,today,changeToday}) {
    const auxchangefield=(field)=>{
        changeField(field)
    }
    const auxsetWeekMutiplier=(mlt)=>{
        changeDateMultiplier(mlt)
    }
    const auxchangeToday=(day)=>{
        changeToday(day)
    }
    return (
        <GridRow style={{margin: 20}}>
            <FieldChanger 
                changeField = {auxchangefield}
                />
                
            <GridColumn offset ={6}>
                <DateChanger 
                    weekMutiplier = {weekMutiplier}
                    changeDateMultiplier = {auxsetWeekMutiplier}
                    today = {today}
                    settoday = {auxchangeToday}
                    // settodaypicker = {settodaypicker}
                    />
            </GridColumn>
        </GridRow>
    )
}

export default FieldAndDateChanger
