import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";

import AdminLayout from "../../layouts/AdminLayout";
import "./account.css";

const Account = () => {
  const [accounts, setAccounts] = useState({});
  useEffect(() => {
    async function fetchAccount() {
      const res = await axios.get("https://yoloshopapi.herokuapp.com/User");
      setAccounts(res.data);
    }
    fetchAccount();
  }, []);

  console.log(accounts);

  return (
    <AdminLayout>
      <table>
        <thead>
          <tr>
            <th className="th-heading">Name</th>
            <th className="th-heading">Username</th>
            <th className="th-heading">Email</th>
            <th className="th-heading">Status </th>
            <th className="th-heading">Roles </th>
            <th className="th-heading">Action </th>
          </tr>
        </thead>
        {accounts.length > 0 &&
          accounts?.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.status ? <p>Active</p> : <p> Unactive </p>} </td>
                <td>
                  {item.roles?.map((role) => (
                    <p>{role}</p>
                  ))}
                </td>
                <td className="td-action">
                  <div className="action">
                    <p>
                      <GrView />
                    </p>
                    <p>
                      <BiEdit />
                    </p>
                    <p>
                      <AiOutlineDelete />
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </AdminLayout>
  );
};

export default Account;
