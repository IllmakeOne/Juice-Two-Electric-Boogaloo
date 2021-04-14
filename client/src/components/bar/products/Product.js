import PropTypes from 'prop-types'
import Button from '../pieces/Button'
import { FiPlus } from "react-icons/fi";
import { FiMusic } from "react-icons/fi";

const Product = ({prod}) => {
    return (
        <div className='product' >
            <h3>{prod.name}</h3><FiMusic />


            <Button color='green' ><h3>{prod.price}</h3><FiPlus /></Button>
        </div>
    )
}

// Product.PropTypes = {
//     name: PropTypes.string,
//     price: PropTypes.number,
//     stock: PropTypes.number
// }

export default Product
