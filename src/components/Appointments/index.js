// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    nameInput: '',
    dateInput: '',
    appointmentList: [],
    isFilterActive: false,
  }

  onClickButtonStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onBookAppointment = event => {
    event.preventDefault()
    console.log('working')
    const {nameInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      name: nameInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      nameInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  toGetAllStarredAppointments = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  render() {
    const {nameInput, dateInput, isFilterActive} = this.state
    const filterStarImage = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()
    return (
      <div className="main-container">
        <div className="app-white-container">
          <h1 className="main-heading">Add Appointment</h1>
          <div className="form-and-image-container">
            <form className="form-container" onSubmit={this.onBookAppointment}>
              <label className="label-text" htmlFor="Title">
                TITLE
              </label>
              <input
                type="text"
                className="input-element"
                value={nameInput}
                id="Title"
                onChange={this.onChangeNameInput}
              />
              <label className="label-text" htmlFor="Date">
                DATE
              </label>
              <input
                type="date"
                className="input-element"
                value={dateInput}
                id="Date"
                onChange={this.onChangeDateInput}
              />
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image-appointment"
              alt="appointments"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="appointments-container">
            <div className="appointments-starred-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`starred-button ${filterStarImage}`}
                onClick={this.toGetAllStarredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="unOrdered-appointments">
              {filteredAppointmentList.map(each => (
                <AppointmentItem
                  appointmentDetails={each}
                  key={each.id}
                  onClickButtonStar={this.onClickButtonStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
