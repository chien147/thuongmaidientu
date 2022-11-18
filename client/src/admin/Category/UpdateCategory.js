import * as React from "react";
import { BiEdit } from "react-icons/bi";

import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import FormUpdate from "./FormUpdate";

const UpdateCategory = ({ id, name, status, fetchData }) => {
  const [show, setShow] = React.useState(false);
  const handleShow = () => {
    document.querySelector("body").classList.toggle("add-modal");

    setShow(true);
  };
  return (
    <div>
      <div onClick={handleShow}>
        <BiEdit />
      </div>
      {show && (
        <FormUpdate
          fetchData={fetchData}
          name={name}
          status={status}
          id={id}
          setShow={setShow}
        />
      )}
    </div>
  );
};

export default UpdateCategory;
