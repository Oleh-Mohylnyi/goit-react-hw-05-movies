import nothingFoundIcon from '../../images/NothingFoundIcon.png'

export default function NotFoundView(text) {
    return (
        <>
        <h1>
              {text}
        </h1>
            <img src={nothingFoundIcon} alt="" className="" />
        </>
    )
}