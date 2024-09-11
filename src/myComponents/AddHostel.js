import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../mainComponents/Navbar";
import Store from "../mainComponents/Store";
export default function AddHostel() {
  const [hostelName, setHostelName] = useState("");
  const [hostelPrice, setHostelPrice] = useState("");
  const [hostelLocation, setHostelLocation] = useState("");
  const [hostelContact, setHostelContact] = useState("");
  const [hostelType, setHostelType] = useState("");
  const [hostelDescription, setHostelDescription] = useState("");
  const [image, setImage] = useState("");
  const [model, setModel] = useState("");
  const { owner } = useContext(Store);
  const handleImage = (event) => {
    // const files = Array.from(event.target.files[0]);
    const file = event.target.files[0];
    setImage(file);
  };
  const handleModel = (event) => {
    const file = event.target.files[0];
    setModel(file);
  };

  const handlePostData = async () => {
    // console.log(image);
    if (hostelPrice >= 7000) {
      toast.error("Enter Rent Less than 7000");
      return;
    }
    if (hostelContact.length !== 13) {
      toast.error("Enter Valid Contact Number");
      return;
    }
    try {
      //  console.log(imagePage);
      const formData = new FormData();
      formData.append("owner", owner.ownerName);
      formData.append("image", image);
      formData.append("hostelName", hostelName);
      formData.append("hostelPrice", hostelPrice);
      formData.append("hostelDescription", hostelDescription);
      formData.append("hostelLocation", hostelLocation);
      formData.append("hostelContact", hostelContact);
      formData.append("hostelType", hostelType);
      formData.append("model", model);

      const response = await fetch(
        `https://ait-bnb-apis.vercel.app/hostelData`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error(response.message);
      } else {
        const json = await response.json();
        console.log(json);
        toast.success("Hostel Add SuccessFully");
        setHostelName("");
        setHostelPrice("");
        setHostelType("");
        setHostelContact("");
        setHostelDescription("");
        setHostelLocation("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // fetchRoutesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Navbar />
      <div className='container-fluid bodySetting'>
        <div className='row'>
          <h1 className='text-primary fw-bold text-decoration-underline mt-2 mb-3'>
            Add Hostel
          </h1>
          <main className='col-md-12 col-lg-12 px-md-4'>
            <div className='container '>
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
                    // value={countryName}
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
                    // value={countryName}
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
                    // value={countryName}
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
                    // value={countryName}
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
                    onChange={(event) =>
                      setHostelDescription(event.target.value)
                    }
                  ></textarea>
                </div>
                <label for='example' className='form-label'>
                  Select Hostel Type
                </label>
                <select
                  className='form-select mb-3'
                  aria-label='Default select example'
                  onChange={(event) => setHostelType(event.target.value)}
                >
                  <option selected>Select Hostel Type</option>
                  <option value='1'>Boys</option>
                  <option value='2'>Girls</option>
                </select>
                <label for='exampleImage' className='form-label'>
                  Image
                </label>
                <div className='input-group mb-3'>
                  <input
                    type='file'
                    className='form-control'
                    id='inputGroupFile02'
                    onChange={handleImage}
                    multiple
                    required
                  />
                  <label className='input-group-text' for='inputGroupFile02'>
                    Upload
                  </label>
                </div>
                <label for='exampleImage' className='form-label'>
                  3D Model
                </label>
                <div className='input-group mb-3'>
                  <input
                    type='file'
                    className='form-control'
                    id='inputGroupFile02'
                    onChange={handleModel}
                  />
                  <label className='input-group-text' for='inputGroupFile02'>
                    Upload
                  </label>
                </div>
                <button
                  type='submit'
                  className='btn btn-primary d-flex justify-content-center align-content-center m-auto mb-3 px-5 py-3'
                  onClick={handlePostData}
                >
                  Add Hostel
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
