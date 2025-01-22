import React, { useState, useEffect, useCallback } from "react";
import Body from "../../../../molecules/Body/Body.jsx";
import Button from "../../../../atoms/Button/Button.jsx";
import "./NewProcurement.css";
import Form from "../../../../molecules/Form/Form.jsx";
import { getUserData } from "../../../../../utils/utils.jsx";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import axiosInstance from "../../../../../services/service.jsx";
import FormFooter from "../../../../atoms/FormFooter/FormFooter.jsx";
import { useNavigate } from "react-router-dom";

const breadcrumbItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Procurement", path: "/procurement" },
  { label: "New Request For Quotation", path: "/new-procurement" },
];

const NewProcurement = () => {
  const [formFields, setFormFields] = useState({
    purchasing_entity: "",
    title: "",
    quotation_description: "",
    closing_date: "",
    contact_email: "",
    supporting_documents: [],
    vendor_data: [],
    designate_manager: [],
  });

  const userData = getUserData();
  const [validationError, setValidationError] = useState({});
  const [vendors, setVendors] = useState([]);
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  const fieldLabels = {
    purchasing_entity: "Purchasing Entity",
    title: "Title",
    quotation_description: "Description",
    closing_date: "Closing Date",
    contact_email: "Contact Email",
    supporting_documents: "Support Documents",
    vendor_data: "Vendor",
    designate_manager: "Designate Manager",
  };

  const fetchVendorData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/vendor/index`);
      if (response.data.status === "success") {
        setVendors(response.data.data || []);
      } else {
        console.error("Failed to fetch vendor data.");
      }
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  }, []);

  const fetchManagerData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/account/names`);
      setManagers(response.data || []);
    } catch (error) {
      console.error("Error fetching manager data:", error);
    }
  }, []);

  useEffect(() => {
    fetchVendorData();
    fetchManagerData();
  }, [fetchVendorData, fetchManagerData]);

  const handleFileDelete = (index) => {
    setFormFields((prevFields) => {
      const updatedFiles = [...prevFields.supporting_documents];
      updatedFiles.splice(index, 1);
      return { ...prevFields, supporting_documents: updatedFiles };
    });
  };

  const handleClear = () => {
    setFormFields({
      purchasing_entity: "",
      title: "",
      quotation_description: "",
      closing_date: "",
      contact_email: "",
      supporting_documents: [],
      vendor_data: [],
      designate_manager: [],
    });
    setValidationError({});
  };

  const validate = () => {
    const errors = {};
    Object.keys(formFields).forEach((field) => {
      if (!formFields[field] && field !== "supporting_documents") {
        errors[field] = `${fieldLabels[field]} is required!`;
      }
    });
    setValidationError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();

      formData.append("purchasing_entity", formFields.purchasing_entity);
      formData.append("status_name", "Open");
      formData.append("title", formFields.title);
      formData.append(
        "quotation_description",
        formFields.quotation_description
      );
      formData.append("closing_date", formFields.closing_date);
      formData.append("contact_email", formFields.contact_email);
      formData.append("created_by", userData.user.userId);

      // Append supporting documents as files
      formFields.supporting_documents.forEach((file, index) => {
        formData.append(`supporting_documents[${index}]`, file);
      });

      // vendor_data: formFields.vendor_data,
      //         designate_manager: formFields.designate_manager

      try {
        const response = await axiosInstance.post(
          `/api/procurement/create-procurement`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.status === "success") {
          handleClear();
          navigate("/procurement");
          showAlert({
            type: "success",
            message: "Request sent successfully.",
            duration: 3000,
            icon: <CheckCircleOutlineIcon />,
          });
        } else {
          showAlert({
            type: "error",
            message: "Failed to send request.",
            duration: 3000,
            icon: <ErrorOutlineOutlinedIcon />,
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        showAlert({
          type: "error",
          message: "Failed to send request.",
          duration: 3000,
          icon: <ErrorOutlineOutlinedIcon />,
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files, selectedOptions } = e.target;

    if (type === "file") {
      setFormFields((prevFields) => ({
        ...prevFields,
        supporting_documents: [
          ...prevFields.supporting_documents,
          ...Array.from(files),
        ],
      }));
    } else if (name === "vendor_data" || name === "designate_manager") {
      const selectedItems = Array.from(selectedOptions).map(
        (option) => option.value
      );
      setFormFields((prevFields) => ({
        ...prevFields,
        [name]: selectedItems,
      }));
    } else {
      setFormFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  return (
    <Body header="Procurement" breadcrumbItems={breadcrumbItems}>
      <div className="form-group-wrapper">
        <Form
          label="Purchasing Entity"
          type="text"
          name="purchasing_entity"
          value={formFields.purchasing_entity}
          onChange={handleChange}
          required={true}
          error={validationError.purchasing_entity}
        />
        <Form
          label="Title"
          type="text"
          name="title"
          value={formFields.title}
          onChange={handleChange}
          required={true}
          error={validationError.title}
        />
        <Form
          label="Description"
          type="textarea"
          name="quotation_description"
          value={formFields.quotation_description}
          onChange={handleChange}
          required={true}
          error={validationError.quotation_description}
        />
        <Form
          label="Closing Date"
          type="date"
          name="closing_date"
          value={formFields.closing_date}
          onChange={handleChange}
          required={true}
          error={validationError.closing_date}
        />
        <Form
          label="Supporting Documents (Optional)"
          type="file"
          name="supporting_documents"
          onChange={handleChange}
          multiple={true}
          required={false}
        />
        <div className="file-preview">
          {formFields.supporting_documents.length > 0 &&
            formFields.supporting_documents.map((file, index) => (
              <div key={index} className="file-item">
                <span>{file.name}</span>
                <button type="button" onClick={() => handleFileDelete(index)}>
                  Delete
                </button>
              </div>
            ))}
        </div>

        <Form
          label="Contact Email"
          type="email"
          name="contact_email"
          value={formFields.contact_email}
          onChange={handleChange}
          required={true}
          error={validationError.contact_email}
        />

        {/* <Form 
                    label="Vendor"
                    type="select"
                    options={vendors.map(vendor => ({ value: vendor, label: vendor.company_name }))}
                    name="vendor_data"
                    value={formFields.vendor_data}
                    onChange={handleChange}
                    required={true}
                    error={validationError.vendor_data}
                    multiple={true} 
                />
                <Form
                    label='Manager'
                    type='select'
                    options={managers.map(manager => ({ value: manager, label: manager.displayName }))}
                    name='designate_manager'
                    value={formFields.designate_manager}
                    onChange={handleChange}
                    required={true}
                    error={validationError.designate_manager}
                    multiple={true}
                />  */}
      </div>
      <FormFooter
        saveLabel="Send RFQ"
        cancelLabel="Save as Draft"
        onSave={handleSubmit}
      />
    </Body>
  );
};

export default NewProcurement;
