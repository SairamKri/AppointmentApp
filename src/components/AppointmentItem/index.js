// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onClickButtonStar} = props
  const {id, name, date, isStarred} = appointmentDetails
  const toSelectStartImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarButton = () => {
    onClickButtonStar(id)
  }

  return (
    <li className="list-name-appointment">
      <div className="name-star-container">
        <h1 className="input-name">{name}</h1>
        <button
          className="star-button"
          type="button"
          data-testid="star"
          onClick={onClickStarButton}
        >
          <img src={toSelectStartImage} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date-paragraph">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
