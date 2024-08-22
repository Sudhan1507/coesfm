import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiPencilSquare } from "react-icons/hi2";
import { MdCancel } from "react-icons/md";
import axiosInstance from '../../services/service';
import Layout from '../../components/molecules/Layout/Layout';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filterBooking, setFilterBooking] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch data from the backend
  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get('/booking/booking'); // Adjust the URL to your backend endpoint
      if (response.data.Status) {
        setBookings(response.data.data); // Set the bookings data to state
        setFilterBooking(response.data.data); // Initialize filtered bookings with fetched data
      } else {
        alert('Failed to fetch bookings');
      }
    } catch (err) {
      alert('An error occurred while fetching bookings');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Search function
  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredBookings = bookings.filter((e) =>
      e.zone.toLowerCase().includes(searchText) ||
      e.schoolName.toLowerCase().includes(searchText) ||
      e.level.toLowerCase().includes(searchText) ||
      e.date.toLowerCase().includes(searchText) ||
      e.status.toLowerCase().includes(searchText)
    );
    setFilterBooking(filteredBookings);
  };

  // Function to get status color
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'upcoming':
        return 'status-upcoming';
      case 'ongoing':
        return 'status-ongoing';
      case 'cancelled':
        return 'status-cancelled'; // Added canccancelledeled status
      default:
        return 'status-default';
    }
  };

  // Function to handle booking cancellation
const handleCancel = async (id) => {
  try {
    const response = await axiosInstance.put(`/booking/cancel_booking/${id}`);
    if (response.data.Status) {
      // Update local state to reflect cancellation
      const updatedBookings = bookings.map((booking) =>
        booking.id === id ? { ...booking, status: 'cancelled' } : booking // Use 'cancelled' here
      );
      setBookings(updatedBookings);
      setFilterBooking(updatedBookings);
      alert('Booking cancelled successfully');
    } else {
      alert(response.data.Message || 'Failed to cancel booking');
    }
  } catch (err) {
    console.error('Error occurred during cancel operation:', err); // Debugging: log the error
    alert('An error occurred while canceling the booking');
  }
};

  return (
    <>
    <Layout>

    <div id="page-wrapper">
      <div className="app-inner-layout app-inner-layout-page">
        <div className="app-inner-layout__wrapper">
          <div className="app-inner-layout__content pt-1">
            <div className="tab-content">
              <div className="container-fluid">
                <section className="content-header">
                  <h4>Booking</h4>
                </section>
                <div className="row">
                  <div className="col-md-12">
                    <div className="main-card mb-3 card">
                      <div className="card-body">
                        <div className="box-header with-border">
                          <div className="box_add">
                            <button>
                              <Link to="/display/add_booking">
                                Room Booking
                              </Link>
                            </button>
                          </div>
                          <div className="box_add">
                            <button>
                              <Link to="/display/booking_history">Booking History</Link>
                            </button>
                          </div>
                          <div className="box_add">
                            <button>
                              <Link to='/display/check-availability'>
                                Availability
                              </Link>
                            </button>
                          </div>
                          <div className="input-search">
                            <input type="search" placeholder="Search" onChange={handleSearchChange} />
                          </div>
                        </div>
                        <div className="box-body">
                          <div className="dataTables_wrapper">
                            <table className="meter_table">
                              <thead>
                                <tr>
                                  <th>SI NO</th>
                                  <th>Zone</th>
                                  <th>School Name</th>
                                  <th>Date</th>
                                  <th>Time Start</th>
                                  <th>Time End</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filterBooking.map((booking, index) => (
                                  <tr key={booking.id}>
                                    <td>{index + 1}</td>
                                    <td>{booking.zone}</td>
                                    <td>{booking.schoolName}</td>
                                    <td>{new Date(booking.date).toLocaleDateString('en-GB')}</td>
                                    <td>{booking.timeStart}</td>
                                    <td>{booking.timeEnd}</td>
                                    <td>
                                      <span className={`status ${getStatusClass(booking.status)}`}>
                                        {booking.status}
                                      </span>
                                    </td>
                                    <td>
                                      <Link
                                        to={`/display/edit_booking/${booking.id}`}
                                        title="Edit"
                                        className="btn btn-success btn-sm me-2"
                                      >
                                        <HiPencilSquare />
                                      </Link>
                                      <button
                                        title="Cancel Booking"
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => {
                                          const isConfirmed = window.confirm("Are you sure you want to cancel?");
                                          if (isConfirmed) {
                                            handleCancel(booking.id);
                                          }
                                        }}
                                      >
                                        <MdCancel />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
    </>
  );
};

export default Booking;
