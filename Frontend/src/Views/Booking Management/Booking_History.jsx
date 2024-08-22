import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiPencilSquare } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import axiosInstance from '../../services/service';
import Layout from '../../components/molecules/Layout/Layout';

const Booking_History = () => {
  const [bookings, setBookings] = useState([]);
  const [filterbooking, setFilterBooking] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch data from the backend
  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get('/booking/booking_history'); // Adjust the URL to your backend endpoint
      if (response.data.Status) {
        setBookings(response.data.data); // Set the bookings data to state
        setFilterBooking(response.data.data); // Initialize filtered bookings with fetched data
      } else {
        setError('Failed to fetch bookings');
      }
    } catch (err) {
      setError('An error occurred while fetching bookings');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Search function
  const handleSearchchange = (em) => {
    const searchText = em.target.value.toLowerCase();
    const filteredBookings = bookings.filter((e) =>
      e.zone.toLowerCase().includes(searchText) ||
      e.schoolName.toLowerCase().includes(searchText) ||
      e.level.toLowerCase().includes(searchText) ||
      e.date.toLowerCase().includes(searchText) ||
      e.status.toLowerCase().includes(searchText)
    );
    setFilterBooking(filteredBookings);
  };


 //Delete Location
  
  const handleDelete = (id) => {
    axiosInstance.delete(`/booking/delete_booking/${id}`)
    .then(result => {
      if(result.data.Status) {
          // Remove the deleted item from state instead of reloading window
          setBookings(bookings.filter(item => item.id !== id));
          setFilterBooking(filterbooking.filter(item => item.id !== id));
      } else {
          alert(result.data.Error)            
      }
    }).catch(err => {
        console.error("Error deleting Booking:", err);
        alert("Error deleting Booking. Please try again."+err);
  });
}

  // // Function to get status color
  // const getStatusClass = (status) => {
  //   switch (status.toLowerCase()) {
  //     case 'completed':
  //       return 'status-completed';
  //     case 'upcoming':
  //       return 'status-upcoming';
  //     case 'ongoing':
  //       return 'status-ongoing';
  //     default:
  //       return 'status-default';
  //   }
  // };

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
                  <h4>Booking History</h4>
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
                            <button >
                            <Link to="/display/booking"> Booking </Link>
                            </button>
                          </div>
                          <div className="box_add">
                            <button>
                              <Link to="/display/check-availability">
                              Availability
                              </Link>
                            </button>
                          </div>
                          <div className="input-search">
                            <input type="search" placeholder="Search" onChange={handleSearchchange} />
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
                                {filterbooking.map((booking, index) => (
                                  <tr key={index}>
                                    <td>{booking.id}</td>
                                    <td>{booking.zone}</td>
                                    <td>{booking.schoolName}</td>
                                    <td>{new Date(booking.date).toLocaleDateString('en-GB')}</td>
                                    <td>{booking.timeStart}</td>
                                    <td>{booking.timeEnd}</td>
                                    <td>
                                      {/* <span className={`status ${getStatusClass(booking.status)}`}> */}
                                        {booking.status}
                                      {/* </span> */}
                                    </td>
                                    <td>
                                     <button
                                        title="Delete Booking"
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => {
                                          const isConfirmed = window.confirm("Are you sure you want to delete?");
                                          if (isConfirmed) {
                                            handleDelete(booking.id);
                                          }
                                        }}
                                      >
                                        <MdDelete />
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

export default Booking_History;
