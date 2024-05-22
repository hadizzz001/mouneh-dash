"use client";

import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import Dropzone from './Dropzone'
import { useState, useEffect } from "react";

const Post = ({ post }) => {
  const router = useRouter();

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [postToEdit, setPostToEdit] = useState(post);
  const [active, setActive] = useState(false)
  const [active1, setActive1] = useState(false)
  const [firstSelectValue, setFirstSelectValue] = useState('');
  const [secondSelectValue, setSecondSelectValue] = useState('');
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [value1, setValue1] = useState('');
  const [imgs, setImgs] = useState([''])

  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault(); 

    setActive(true)
    axios
      .patch(`/api/posts/${post.id}`, postToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        setActive(false)
        window.location.replace("/dashboard");
      });

  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeletePost = (id) => {
    axios
      .delete(`/api/posts/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        window.location.replace("/dashboard");
      });
  }


  const handleImgChange = (url) => {
    if (url) {
      setImgs(url);
    }
  }


  const handleFirstSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFirstSelectValue(selectedValue);
    setActive1(true)
    const optionsForSecondSelect = getOptionsForSecondSelect(selectedValue);
    setSecondSelectOptions(optionsForSecondSelect); 
    setSecondSelectValue(optionsForSecondSelect[0]);
  };

 



  useEffect(() => { 
    if (firstSelectValue){ 
      setPostToEdit((prevState) => ({ ...prevState, category: "" + firstSelectValue }));
    } 
  }, [firstSelectValue])


 



  useEffect(() => { 
    if (!(imgs.includes(""))){ 
      setPostToEdit((prevState) => ({ ...prevState, img: imgs }));
    } 
  }, [imgs])


 
















  return (
    <div className="bg-slate-200 p-3 min-h-full min-w-full" key={post.id}>
      <h1 className="text-2xl font-bold">Title : {post.title}</h1>
      <b>Category : {post.category}</b><br /> 
      <b>Price($) : {post.price}</b><br />
      <p style={{ width: "150px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{post.description}</p><br />

      <img src={post.img[0]} width={50} />

      <div className="pt-5">
        <button
          className="text-blue-700 mr-3"
          onClick={() => setOpenModalEdit(true)}
        >
          Edit
        </button>


        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>



          <form className="w-full mt-3" onSubmit={handleEditSubmit}>

            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full p-2"
              value={postToEdit.title || ""}
              onChange={handleChange}
              required
            />

            <textarea
              placeholder="Description"
              name="description"
              className="w-full p-2 my-3"
              value={postToEdit.description || ""}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Price"
              name="price"
              className="w-full p-2 my-3"
              value={postToEdit.price || value1}
              onChange={handleChange}
              required
            />



            <select name="category" value={firstSelectValue} onChange={handleFirstSelectChange} style={{ width: "100%", height: "40px" }}  >
            
              <option value="Labne">Labne</option>
              <option value="Cheese">Cheese</option>
              <option value="Paste">Paste</option>
              <option value="Oil">Oil</option>
              <option value="Jam">Jam</option>
              <option value="Syrup">Syrup</option>
              <option value="Other">Other</option>
            </select>

            <br />


 

            <Dropzone HandleImagesChange={handleImgChange} className='mt-10 border border-neutral-200 p-16' />


            <button type="submit" className="px-5 py-2 mt-3" style={{ background: "#234012",color:"white" }} disabled={active}>
              Submit
            </button>
          </form>
        </Modal>

        <button onClick={() => setOpenModalDelete(true)} className="text-red-700 mr-3">Delete</button>

        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h1 className="text-2xl pb-3">
            Are you sure, You want to delete this post?
          </h1>

          <div>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="text-blue-700 font-bold mr-5"
            >
              YES
            </button>
            <button
              onClick={() => setOpenModalDelete(false)}
              className="text-red-700 font-bold mr-5"
            >
              No
            </button>
          </div>
        </Modal>


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




      </div>
    </div>
  );
};

export default Post;
