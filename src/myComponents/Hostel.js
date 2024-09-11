/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../mainComponents/Navbar";
import Store from "../mainComponents/Store";
export default function Hostel() {
  const [data, setData] = useState("");
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [hostelName, setHostelName] = useState("");
  const [hostelPrice, setHostelPrice] = useState("");
  const [hostelLocation, setHostelLocation] = useState("");
  const [hostelContact, setHostelContact] = useState("");
  const [hostelType, setHostelType] = useState("");
  const [hostelDescription, setHostelDescription] = useState("");
  const { owner } = useContext(Store);
  const [count] = useState(1);
  const handleDetail = (data) => {
    setSelectedHostel(data);
  };
  const handleUpdate = (data) => {
    setSelectedUpdate(data)
    setHostelName(data.hostelName);
    setHostelPrice(data.hostelPrice);
    setHostelLocation(data.hostelLocation);
    setHostelContact(data.hostelContact);
    setHostelDescription(data.hostelDescription);
  };

  const fetchHostelData = async () => {
    try {
      const response = await fetch("https://ait-bnb-apis.vercel.app/getHostel");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   alert(error);
    }
  };
  const handleUpdateSubmit = async () => {
    // if (!hostelName || !hostelPrice || !hostelContact || !hostelDescription || !hostelLocation) {
    //   toast.error("Please fill in all fields before updating.");
    //   return;
    // }
    if (hostelPrice >= 7000) {
      toast.error("Enter Rent Less than 7000");
      return;
    }
    if (hostelContact.length !== 13) {
      toast.error("Enter a valid contact number");
      return;
    }
    const updatedFormData = {
      hostelName,
      hostelPrice,
      hostelContact,
      hostelDescription,
      hostelLocation
    };
    console.log("Updated FormData:", updatedFormData);

    try {
      const response = await fetch(
        `http://localhost:8000/hostelUpdate/${selectedUpdate._id}`,
        {
          method: "PUT", // Use PUT for updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (response.ok) {
        alert("Item updated successfully!");
        fetchHostelData()// Refresh the data after the update
        setHostelName("");
        setHostelPrice("");
        setHostelType("");
        setHostelContact("");
        setHostelDescription("");
        setHostelLocation("");
      } else {
        console.error("Failed to update item:", response.statusText);
        alert(response.statusText);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const handleDelete = async (data) => {
    try {
      const response = await fetch(`https://ait-bnb-apis.vercel.app/getHostel/${data}`, {
        method: "DELETE",
      });

      const jsonData = await response.json();

      if (jsonData.error) {
        console.error("Error deleting item:", jsonData.error);
      } else {
        // Item deleted successfully, update state
        alert(jsonData.message);
        fetchHostelData();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  useEffect(() => {
    fetchHostelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar />

      <div className='container-fluid'>
        {" "}
        <div className='row'>
          <h1 className='text-primary fw-bold text-decoration-underline mb-3'>
            Manage Hostel
          </h1>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 mb-3'>
            <table className='table table-dark table-bordered border-light'>
              <thead>
                <tr>
                  {/* <th scope='col'>No.</th> */}
                  <th scope='col'>Hostel Name</th>
                  <th scope='col'>Hostel Type</th>
                  <th scope='col'>Detail</th>
                  <th scope='col'>Update</th>
                  <th scope='col'>Delete</th>
                </tr>
              </thead>
              {Array.isArray(data) ? (
                data
                  .filter((data) => data.owner === owner.ownerName)
                  .map((data, index) => (
                    <tbody className='table-group-divider'>
                      <tr key={data._id}>
                        {/* <th scope='row'>{count + index}</th> */}
                        <td> {data.hostelName}</td>
                        <td> {data.hostelType == "1" ? "Boys" : " Girls"}</td>
                        <td>
                          <button
                            className='btn btn-primary text-light fw-bold  btn-sm'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal'
                            onClick={() => handleDetail(data)}
                          >
                            Detail
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary text-light fw-bold disable btn-sm"
                            data-bs-toggle="modal"
                            onClick={() => handleUpdate(data)}
                            data-bs-target='#updateModel'
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            className='btn btn-danger text-light fw-bold btn-sm'
                            onClick={() => handleDelete(data._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))
              ) : (
                <tbody>
                  <tr>
                    <td colspan='5'>No Data Found</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      {/* <!-- Modal Update --> */}
      <div
        class='modal fade'
        id='updateModel'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h1 class='modal-title fs-5' id='exampleModalLabel'>
                Update
              </h1>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div class='modal-body'>
              {" "}
              <div className='CountryForm'>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Hostel Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='handleCountryName'
                    aria-describedby='emailHelp'
                    value={hostelName}
                    onChange={(event) => setHostelName(event.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Hostel Rent Per Month
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='handleCountryName'
                    aria-describedby='emailHelp'
                    value={hostelPrice}
                    onChange={(event) => setHostelPrice(event.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Hostel Location
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='handlelocation'
                    aria-describedby='emailHelp'
                    value={hostelLocation}
                    onChange={(event) => setHostelLocation(event.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Hostel Contact
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='handlelocation'
                    aria-describedby='emailHelp'
                    value={hostelContact}
                    onChange={(event) => setHostelContact(event.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Description
                  </label>
                  <textarea
                    class='form-control'
                    id='exampleFormControlTextarea1'
                    rows='3'
                    value={hostelDescription}
                    onChange={(event) =>
                      setHostelDescription(event.target.value)
                    }
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary d-flex justify-content-center align-content-center m-auto my-3"
                onClick={handleUpdateSubmit}
              >
                Update Hostel
              </button>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal Update--> */}
      {/* <!-- Modal Detail --> */}
      <div
        class='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h1 class='modal-title fs-5' id='exampleModalLabel'>
                Modal title
              </h1>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div class='modal-body'>
              {" "}
              <div className='CountryForm'>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Hostel Name
                  </label>
                  <p className="modalInformation">   {selectedHostel ? selectedHostel.hostelName : ""}</p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Hostel Rent Per Month
                  </label>
                  <p className="modalInformation">   {selectedHostel ? selectedHostel.hostelPrice : ""}</p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Hostel Location
                  </label>
                  <p className="modalInformation">   {selectedHostel ? selectedHostel.hostelLocation : ""}</p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Hostel Contact
                  </label>
                  <p className="modalInformation">   {selectedHostel ? selectedHostel.hostelContact : ""}</p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Description
                  </label>
                  <p className="modalInformation">   {selectedHostel ? selectedHostel.hostelDescription : ""}</p>
                </div>
                <label for='example' className='form-label'>
                  Select Hostel Type
                </label>
                <p className="modalInformation">   {selectedHostel ? selectedHostel.hostelType : ""}</p>
                <label for='exampleImage' className='form-label'>
                  Image
                </label>
                <div className='input-group mb-3'>
                  {" "}
                  <Link
                    className=' text-dark modalInformation'
                    to={selectedHostel ? selectedHostel.image : ""}
                    target='_blank'
                  >
                    Image
                  </Link>
                </div>
                <label for='exampleImage' className='form-label'>
                  3D Model
                </label>
                <div className='input-group mb-3'>
                  {" "}
                  <Link
                    className=' text-dark modalInformation'
                    to={selectedHostel ? selectedHostel.model : ""}
                    target='_blank'
                  >
                    Image
                  </Link>
                </div>

              </div>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal Detail --> */}
    </>
  );
}
