import "../components/navbarFarmer.css";
import { GiPig } from "react-icons/gi";

function navbarConsumer() {
    return (
        <div className="navbar">

            <div className="logo">
                <GiPig style={{ color: '#074cb3', fontSize: '2rem', paddingRight: '3px' }} />
                <p> PorkChain</p>
            </div>
            <div className="item">
                <ul className="item-1">
                    <li>
                        <h3>Consumer</h3>
                    </li>
                </ul>
            </div>

        </div>

    )
}

export default navbarConsumer;