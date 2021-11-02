import nothingFoundIcon from '../../images/NothingFoundIcon.png';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useState } from "react";



export default function NotFoundView({ text = "WARNING" }) {
    const [redirectNow, setRedirectNow] = useState(false);

    setTimeout(() => setRedirectNow(true), 2000);

    return (
        <>
            {redirectNow
                ? <Redirect to="/" />
                : <div>
                    <h1>{text}</h1>
                    <img src={nothingFoundIcon} alt="" className="" />
                </div>
            }
        </>
    );
}

NotFoundView.propTypes = {
    text: PropTypes.string
}