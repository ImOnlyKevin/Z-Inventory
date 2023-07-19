import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Inv = () => {
    const navigate = useNavigate()

    const [ inventory, setInventory ] = useState()

    useEffect(() => {
        //fetch inventory
        fetch(`http://localhost:3001/inv`)
            .then(res => res.json())
            .then(data => {
                setInventory(data)
            })
    }, [])

    return (
        <div className="invContainer">
            {inventory?.map(item => {
                return (
                    <div key={item.id} className="item">
                        <p onClick={() => {navigate('/inv/item', {state: {item: item}})}}><strong>{item.item}</strong></p>
                        {item.description.length > 100 ? <p>{item.description.substring(0,100)}...</p> : <p>{item.description}</p>}
                        <p>Quantity: {item.quantity}</p>
                        <p>Owner: {`${item.firstname} ${item.lastname}`}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Inv