import Button from 'react-bootstrap/Button'
import { FiEdit } from "react-icons/fi"
import { Panel, PanelGroup } from 'rsuite'
import Popup from './CartSet'

function ChangePriceB({item, changePrice}) {

    // var pp = item.price


    const bruh =()=>{
        return(
            console.log('bruhhh')
        )
        
    }

    const clickEdit = () =>{

        return (
            <div>  
                {console.log('reeeee')}
                kills meeee
               <Button 
                    className ='changeprice'
                    variant="outline-primary" 
                    onClick ={() => changePrice(item.id, 1000)}
                    > Oh my god
                </Button>{' '} 
            </div>
        )
    }


    return (
        <div>
                {console.log('reeeee')}
                kills meeee
               <Button 
                    className ='changeprice'
                    variant="outline-primary" 
                    onClick ={() => changePrice(item.id, 2)}
                    > 
                    <FiEdit/>
                </Button>{' '} 

                {/* <Panel header="Panel title" bordered>
                <Paragraph />
                     burh
                </Panel> */}

            </div>
        );
}

export default ChangePriceB
