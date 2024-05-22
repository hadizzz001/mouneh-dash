"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from 'next/navigation' 
import Dropzone from './Dropzone'



const AddPost = () => {

  const router = useRouter();
  const { push } = useRouter();
  const [modalOpen, setModalOpen] = useState(false); 
  const [inputs, setInputs] = useState({}); 
  const [active, setActive] = useState(false)
  const [firstSelectValue, setFirstSelectValue] = useState('');
  const [secondSelectValue, setSecondSelectValue] = useState('0');
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [value1, setValue1] = useState('');  
  const [imgs, setImgs] = useState([''])
 


 

 
 


 


  useEffect(() => {
    setInputs((prevState) => ({ ...prevState, category: "" + firstSelectValue, img: imgs }));
  }, [firstSelectValue, imgs ])


   
 

 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (e.target.category.value == "0") {
      alert("Please select a category");
    } 
    else if (imgs.includes("")) {
      alert("Please select item image");
    }
    else {
      setActive(true)
      axios
        .post("/api/posts", inputs)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
        })
        .finally(() => {
          setInputs({});
          setModalOpen(false); 
          setActive(false)
          window.location.replace("/dashboard");
        });
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "price") {
      let value = e.target.value;
      
      // Remove any non-numeric characters except for the first dot
      const numericValue = value.replace(/[^0-9.]/g, '');
      
      // Ensure only one dot is present in the string
      const parts = numericValue.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      } else {
        value = numericValue;
      }
    
      setValue1(value);
    }

    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value, img: localStorage.getItem("sharedValue") }));
  };






  const handleFirstSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFirstSelectValue(selectedValue);
    const optionsForSecondSelect = getOptionsForSecondSelect(selectedValue);
    setSecondSelectOptions(optionsForSecondSelect);
  };
 


  const handleImgChange = (url) => {
    if (url) { 
      setImgs(url); 
    }
  }



 





  return (
    <div>
     
      <button
        onClick={() => setModalOpen(true)}
        className="text-white p-3 cursor-pointer"
        style={{ background: "#234012" }}
      >
        Add New Item
      </button>

      <button
        onClick={() => push("/reservation")}
        className="text-white p-3 cursor-pointer"
        style={{ marginLeft: "1em", background: "#234012" }}
      >
        View Orders
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
 
          <form className="w-full mt-3" onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full p-2"
              value={inputs.title || ""}
              onChange={handleChange}
              required
            />

            <textarea
              placeholder="Description"
              name="description"
              className="w-full p-2 my-3"
              value={inputs.description || ""}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Price"
              name="price"
              className="w-full p-2 my-3"
              value={value1}
              onChange={handleChange}
              required
            />



            <select name="category" value={firstSelectValue} onChange={handleFirstSelectChange} style={{ width: "100%", height: "40px" }}  >
              <option value="0" selected>--Choose Category--</option>
              <option value="Labne">Labne</option>
              <option value="Cheese">Cheese</option>
              <option value="Paste">Paste</option>
              <option value="Oil">Oil</option>
              <option value="Jam">Jam</option>
              <option value="Syrup">Syrup</option>
              <option value="Other">Other</option>
            </select>

            <br />

 


            <Dropzone HandleImagesChange={handleImgChange} className='mt-10 border border-neutral-200 p-16' style={{ backgroundColor: "#234012"}} />
       
            <style
  dangerouslySetInnerHTML={{
    __html:
      "\n.uploadcare--widget__button_type_open { \n    background-color: #234012 !important;\n}\n"
  }}
/> 

<style
  dangerouslySetInnerHTML={{
    __html:
      "   \n\n.uploadcare--button_size_big { \n    background-color: #234012 !important;\n}\n"
  }}
/>







            <button type="submit" className="px-5 py-2 mt-3" style={{ background: "#234012", color:"white" }} disabled={active}>
              Submit
            </button>
          </form> 
      </Modal>
    </div>
  );
};

export default AddPost;
