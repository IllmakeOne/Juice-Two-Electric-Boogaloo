

function ShowAppointment({app}) {
    // console.log(app)

    return (
        <div>
            {app.date}<br/>
            {app.status}<br/>
            {app.field}<br/>
            {app.time}<br/>
            {durations[app.duration]}<br/>
            {app.name}<br/>
            {app.phone}<br/>
        </div>
    )
}


const durations = [
    '30 min',
    '60 min 1 ora',
    '90 min',
    '120 min 2 ore',
    '150 min',
    '180 min 3 ore',
    '210 min',
    '240 min 4 ore',
    '270 min',
    '300 min 5 ore',
    '330 min',
    '360 min 6 ore',
    '390 min',
    '420 min 7 ore',
]

export default ShowAppointment
