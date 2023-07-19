import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Item = () => {
    const navigate = useNavigate()
    const { item } = useLocation().state
    const [ inventory, setInventory ] = useState()

    return (
        <>
            <div className="itemContainer">
                <div className="item">
                    <p><strong>{item?.item}</strong></p>
                    {item?.description.length > 100 ? <p>{item?.description.substring(0,100)}...</p> : <p>{item?.description}</p>}
                    <p>Quantity: {item?.quantity}</p>
                    <p>Owner: {`${item?.firstname} ${item?.lastname}`}</p>
                </div>
            <button onClick={() => navigate('/inv')} className="backBtn">Back</button>
            </div>
        </>
    )
}

export default Item