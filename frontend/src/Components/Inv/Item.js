import { useLocation, useNavigate } from "react-router-dom"

const Item = () => {
    const navigate = useNavigate()
    const { item } = useLocation().state

    return (
        <>
            <div className="itemContainer">
                <div className="item">
                    <p><strong>{item?.item}</strong></p>
                    {<p>{item?.description}</p>}
                    <p>Quantity: {item?.quantity}</p>
                    <p>Owner: {`${item?.firstname} ${item?.lastname}`}</p>
                </div>
            <button onClick={() => navigate('/inv')} className="backBtn">Back</button>
            </div>
        </>
    )
}

export default Item