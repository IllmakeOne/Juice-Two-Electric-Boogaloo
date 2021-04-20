
import { GridRow, GridColumn } from 'emotion-flex-grid'
import { AiFillStar } from 'react-icons/ai'
import { IconContext } from 'react-icons'

import { switchFavoriteItem } from '../../DBconn'
import Fab from '@material-ui/core/Fab'

import Button from '@material-ui/core/Button'

const ProdButton = ({prod, onClick, className, changeFav}) => {  

        const starColor = prod.fav? 'orange': 'lightblue'

        const addToFav = async () => {
            //change item's fav to the oposite
            var aux = await switchFavoriteItem(prod)
            // console.log(aux) 
            changeFav(prod.id)//triggeres rerender in parent
        }


 
        return (
            <div className = {className} >
            {/* <GridColumn width = {4}> */}
            <GridRow direction='column'>
                <GridColumn> 
                    <div onClick ={()=>onClick(prod)} >
                        <GridRow>
                            <GridColumn>
                                <img width = {80} height={80} src={prod.image}></img>
                            </GridColumn>
                            {prod.id}
                            <GridColumn>
                                <h6 style={{fontSize: 24}}>{prod.name}   </h6> <br/>
                                
                                <h6 style={{fontSize: 20}}>Price: {prod.price}</h6> <br/>
                                <h6 style={{fontSize: 20}}>Stock: {prod.stock}</h6>
                            </GridColumn>
                        </GridRow>           
                    </div>
                </GridColumn>
                <GridColumn width = {1.5} 
                    // style={{ background: starColor}} onClick={()=>addToFav(prod.id)}
                    >
                    <div className = '' 
                                >
                        <IconContext.Provider
                            value={{ color: starColor }}
                            >
                            <Fab 
                                size = 'small'
                                onClick = {()=>addToFav()} >
                                <AiFillStar size = {25}/>
                            </Fab>
                        </IconContext.Provider>
                    </div>
                </GridColumn>
            </GridRow>
            </div>

            
        );
}

export default ProdButton