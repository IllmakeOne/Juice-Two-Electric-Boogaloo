import { FiPlus } from "react-icons/fi"
import Button from 'react-bootstrap/Button';


const AddProdButt = ({props, onClick}) => {     

 
        return (
            <div className = 'addprodbutt'>
                
                {props.stock}
                <Button 
                    variant="outline-primary" 
                    onClick ={() => onClick(props.id)}
                    >
                    
                       <FiPlus />
                </Button>{' '}
                
            </div>
        );
}

export default AddProdButt 