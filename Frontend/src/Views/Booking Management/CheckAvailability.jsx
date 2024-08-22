import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/service';
import Layout from '../../components/molecules/Layout/Layout';

const CheckAvailability = () => {
    const [formData, setFormData] = useState({ zone: '', schoolName: '', date: '' });
    const [zones, setZones] = useState([]);
    const [schools, setSchools] = useState([]);
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch zones
        axiosInstance.get('/booking/get_zones')
            .then((result) => setZones(result.data.zones || []))
            .catch((err) => console.error("Error fetching zones:", err));
    }, []);

    useEffect(() => {
        if (formData.zone) {
            // Fetch schools when zone changes
            axiosInstance.post('/booking/get_schools_by_zone', { zone: formData.zone })
                .then((result) => setSchools(result.data.schools || []))
                .catch((err) => console.error("Error fetching schools:", err));
        } else {
            setSchools([]);
        }
    }, [formData.zone]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLocations([]);

        try {
            const response = await axiosInstance.post('/booking/check_availability', formData);
            if (response.data.success) {
                setLocations(response.data.locations);
            } else {
                setError(response.data.message || 'No locations found for the selected criteria.');
            }
        } catch (error) {
            console.error("Error fetching availability:", error.response ? error.response.data : error.message);
            setError('Failed to fetch availability. Please try again.');
        }
    };

    const handleAddBooking = (roomNo) => {
        navigate(`/display/add_booking?roomNo=${roomNo}`);
    };

    return (

        <>
        <Layout>

        <div className="container mt-5">
            <h2 className="mb-4">Check Room Availability</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label htmlFor="zone" className="form-label">Zone</label>
                        <select
                            id="zone"
                            name="zone"
                            className="form-select"
                            value={formData.zone}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Choose Zone</option>
                            {zones.map((zone) => (
                                <option key={zone} value={zone}>
                                    {zone}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="schoolName" className="form-label">School</label>
                        <select
                            id="schoolName"
                            name="schoolName"
                            className="form-select"
                            value={formData.schoolName}
                            onChange={handleChange}
                            required
                            disabled={!formData.zone} // Disable if no zone is selected
                        >
                            <option value="" disabled>Choose School</option>
                            {schools.map((school) => (
                                <option key={school.id} value={school.school_name}>
                                    {school.school_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="form-control"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Check Availability</button>
            </form>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            {locations.length > 0 && (
                <div>
                    <h3 className="mb-4">Available Rooms for {formData.date}:</h3>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Block</th>
                                    <th>Level</th>
                                    <th>Room No</th>
                                    <th>Room Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locations.map((location) => (
                                    <tr key={location.room_no}>
                                        <td>{location.block}</td>
                                        <td>{location.level}</td>
                                        <td>{location.room_no}</td>
                                        <td>{location.room_name}</td>
                                        <td>{location.timeStart ? 'Booked' : 'Available'}</td>
                                        <td>
                                            {!location.timeStart && (
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => handleAddBooking(location.room_no)}
                                                >
                                                    <i className="bi bi-plus-circle"></i> Add Booking
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>

        </Layout>
        </>
    );
};

export default CheckAvailability;
