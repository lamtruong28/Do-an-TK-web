import './headerAdmin.css';
import { Link } from 'react-router-dom';
export default function () {
    return (
        <div className="topnav-wrapper ps-16 pe-16">
            <div className="topnav">
                <a className="active" href="#home">Home</a>

            </div>
            <Link to='/sign-in' className='btn btn-outline-primary'>
                <i className="fa-solid fa-right-from-bracket"></i>
            </Link>
        </div >
    )
}