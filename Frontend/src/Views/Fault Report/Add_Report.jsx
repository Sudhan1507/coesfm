import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/service";
import Layout from "../../components/molecules/Layout/Layout";

const Add_Report = () => {
  const [faultreport, setFaultreport] = useState({
    fault_type: "",
    priority: "",
    zone: "",
    school: "",
    block: "",
    level: "",
    room_number: "",
    room_name: "",
    droup_down: "",
    requestor_name: "",
    requestor_contact: "",
    description: "",
    image: '',
    created_at: new Date().toISOString(),
  });

  const imageRef = useRef(null);
  const [schoolOptions, setSchoolOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get School Table
    axiosInstance.get("/auth/school")
      .then((result) => {
        if (result.data.Status) {
          setSchoolOptions(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFaultreport((prevState) => ({
          ...prevState,
          image: reader.result
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setFaultreport((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

   //Submit Operation
   const handleSubmit = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fault_type", faultreport.fault_type);
    formData.append("priority", faultreport.priority);
    formData.append("zone", faultreport.zone);
    formData.append("school", faultreport.school);
    formData.append("block", faultreport.block);
    formData.append("level", faultreport.level);
    formData.append("room_number", faultreport.room_number);
    formData.append("room_name", faultreport.room_name);
    formData.append("droup_down", faultreport.droup_down);
    formData.append("requestor_name", faultreport.requestor_name);
    formData.append("requestor_contact", faultreport.requestor_contact);        
    formData.append("description", faultreport.description);
    formData.append("image", faultreport.image);
    formData.append("created_at", faultreport.created_at);

    axiosInstance.post("/report/add_request", formData)
        .then((result) => {
            if (result.data.Status) {
                
                navigate('/display/report');

            } else {
                alert(result.data.Error);
            }
        })
        .catch((err) => console.log(err));
};

  return (
    <Layout>
      <div id="page-wrapper">
        <div className="app-inner-layout app-inner-layout-page">
          <div className="app-inner-layout__wrapper">
            <div className="app-inner-layout__content pt-1">
              <div className="tab-content">
                <div className="container-fluid">
                  <section className="content-header">
                    <h4>Fault Report</h4>
                  </section>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="main-card mb-3 card">
                        <div className="box-body">
                          <div className="dataTables_wrapper">
                            <div className="container">
                              <div className="row justify-content-center">
                                <div className="col-md-9">
                                  <div className="p-3 rounded">
                                    <h3 className="text-secondary text-center mb-4">Add Request</h3>
                                    <form className="row g-3" onSubmit={handleSubmit}>
                                      <div className='form-control p-4'>
                                        <div className='mb-4 text-secondary'>
                                          What can we help you with?
                                        </div>

                                        <div className="col-12 mt-4 mb-4">
                                          <label htmlFor="fault_type" className="form-label">
                                            Fault Type :
                                          </label>
                                          <select
                                            required
                                            name="fault_type"
                                            id="fault_type"
                                            className="form-select"
                                            onChange={handleChange}
                                            value={faultreport.fault_type}
                                          >
                                            <option value="" disabled>Select Type</option>
                                            <option value="Fault Report">Fault Report</option>
                                            <option value="Service Request">Service Request</option>
                                          </select>
                                        </div>

                                        <div className="col-12">
                                          <label htmlFor="priority" className="form-label">
                                            Priority :
                                          </label>
                                          <select
                                            required
                                            name="priority"
                                            id="priority"
                                            className="form-select"
                                            onChange={handleChange}
                                            value={faultreport.priority}
                                          >
                                            <option value="" disabled>Select Priority</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                          </select>
                                        </div>
                                      </div>

                                      <div className='form-control p-4'>
                                        <div className='mb-4 text-secondary'>
                                          Where is the issue?
                                        </div>

                                        <div className="col-12 mb-4">
                                          <label htmlFor="zone" className="form-label">
                                            Zone :
                                          </label>
                                          <select
                                            name="zone"
                                            id="zone"
                                            className="form-select"
                                            required
                                            onChange={handleChange}
                                            value={faultreport.zone}
                                          >
                                            <option value="" disabled>Choose Zone</option>
                                            {schoolOptions.map((option) => (
                                              <option key={option.id} value={option.zone}>
                                                {option.zone}
                                              </option>
                                            ))}
                                          </select>
                                        </div>

                                        <div className="col-12 mb-4">
                                          <label htmlFor="school" className="form-label">
                                            School :
                                          </label>
                                          <select
                                            name="school"
                                            id="school"
                                            className="form-select"
                                            required
                                            onChange={handleChange}
                                            value={faultreport.school}
                                          >
                                            <option value="" disabled>Choose School</option>
                                            {schoolOptions.map((option) => (
                                              <option key={option.id} value={option.school_name}>
                                                {option.school_name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>

                                        <div className="col-12 mb-4">
                                          <label htmlFor="block" className="form-label">
                                            Block :
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="block"
                                            name="block"
                                            required
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={faultreport.block}
                                          />
                                        </div>

                                        <div className="col-12 mb-4">
                                          <label htmlFor="level" className="form-label">
                                            Level :
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="level"
                                            name="level"
                                            required
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={faultreport.level}
                                          />
                                        </div>

                                        <div className="col-12 mb-4">
                                          <label htmlFor="room_number" className="form-label">
                                            Room Number :
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="room_number"
                                            name="room_number"
                                            required
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={faultreport.room_number}
                                          />
                                        </div>

                                        <div className="col-12 mb-4">
                                          <label htmlFor="room_name" className="form-label">
                                            Room Name :
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="room_name"
                                            name="room_name"
                                            required
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={faultreport.room_name}
                                          />
                                        </div>

                                        <div className="col-12">
                                          <label htmlFor="droup_down" className="form-label">
                                            Which equipment from drop-down :
                                          </label>
                                          <select
                                            required
                                            name="droup_down"
                                            id="dropdown"
                                            className="form-select"
                                            onChange={handleChange}
                                            value={faultreport.droup_down}
                                          >
                                            <option value="" disabled>Select Equipment</option>
                                            <option value="Fan System">Fan System</option>
                                            <option value="Light fitting and accessories">Light fitting and accessories</option>
                                            <option value="Dryer system">Dryer system</option>
                                            <option value="Electrical installation (LOW)">Electrical installation (LOW)</option>
                                            <option value="Switchboard">Switchboard</option>
                                            <option value="LPS">LPS</option>
                                            <option value="ACMV System">ACMV System</option>
                                            <option value="Security system">Security system</option>
                                          </select>
                                        </div>

                                        <div className="col-12 mb-4">
                                          <label htmlFor="requestor_name" className="form-label">
                                            Requestor Name :
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="requestor_name"
                                            name="requestor_name"
                                            required
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={faultreport.requestor_name}
                                          />
                                        </div>

                                        <div className="col-12 mb-4">
                                          <label htmlFor="requestor_contact" className="form-label">
                                            Requestor Contact :
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="requestor_contact"
                                            name="requestor_contact"
                                            required
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={faultreport.requestor_contact}
                                          />
                                        </div>

                                        <div className="col-12 mb-4">
                                          <label htmlFor="description" className="form-label">
                                            Description :
                                          </label>
                                          <textarea
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            rows="3"
                                            required
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={faultreport.description}
                                          />
                                        </div>

                                        <div className="col-12 mb-4">
                                          <label htmlFor="image" className="form-label">
                                            Upload Image :
                                          </label>
                                          <input
                                            type="file"
                                            className="form-control"
                                            id="image"
                                            name="image"
                                            ref={imageRef}
                                            onChange={handleChange}
                                          />
                                        </div>

                                        <div className="col-12 mt-4 text-center">
                                          <button
                                            type="submit"
                                            className="btn btn-primary"
                                          >
                                            Submit
                                          </button>
                                        </div>
                                      </div>
                                    </form>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Add_Report;
