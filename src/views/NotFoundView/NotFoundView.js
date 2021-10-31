import nothingFoundIcon from '../../images/NothingFoundIcon.png'
import PropTypes from 'prop-types'

export default function NotFoundView({ text = "WARNING" }) {
    return (
        <>
        <h1>
              {text}
        </h1>
            <img src={nothingFoundIcon} alt="" className="" />
        </>
    )
}

NotFoundView.propTypes = {
    text: PropTypes.string
}