import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import StoreIcon from "@mui/icons-material/Store";
import React from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { GiClothes } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./style.scss";

import styled from "styled-components";

const AdminLayout = ({ children }) => {
  const SidebarAdmin = styled.div`
    width: 250px;
  `;

  const AdminContainer = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
  `;
  const AdminContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
  `;
  return (
    <div>
      <div className="container">
        <div className="main">
          <AdminContainer>
            <SidebarAdmin className="admin-sidebar">
              <div className="sidebar">
                <div className="center">
                  <ul>
                    <li>
                      <DashboardIcon className="icon" />
                      <span>Dashboard</span>
                    </li>
                    <p className="title">LISTS</p>

                    <Link
                      to="/admin-account"
                      style={{ textDecoration: "none" }}
                    >
                      <li>
                        <MdOutlineAccountCircle className="icon" />
                        <span>Accounts</span>
                      </li>
                    </Link>
                    <Link
                      to="/admin-product"
                      style={{ textDecoration: "none" }}
                    >
                      <li>
                        <GiClothes className="icon" />
                        <span>Products</span>
                      </li>
                    </Link>
                    <Link
                      to="/admin-category"
                      style={{ textDecoration: "none" }}
                    >
                      <li>
                        <BiCategory className="icon" />
                        <span>Categories</span>
                      </li>
                    </Link>

                    <Link to="/order" style={{ textDecoration: "none" }}>
                      <li>
                        <CreditCardIcon className="icon" />
                        <span>Orders</span>
                      </li>
                    </Link>

                    <li>
                      <LocalShippingIcon className="icon" />
                      <span>Delivery</span>
                    </li>
                    <p className="title">USEFUL</p>
                    <li>
                      <InsertChartIcon className="icon" />
                      <span>Stats</span>
                    </li>
                    <li>
                      <NotificationsNoneIcon className="icon" />
                      <span>Notifications</span>
                    </li>
                    <p className="title">SERVICE</p>
                    <li>
                      <SettingsSystemDaydreamOutlinedIcon className="icon" />
                      <span>System Health</span>
                    </li>
                    <li>
                      <PsychologyOutlinedIcon className="icon" />
                      <span>Logs</span>
                    </li>
                    <li>
                      <SettingsApplicationsIcon className="icon" />
                      <span>Settings</span>
                    </li>
                    <p className="title">USER</p>
                    <li>
                      <AccountCircleOutlinedIcon className="icon" />
                      <span>Profile</span>
                    </li>
                    <li>
                      <ExitToAppIcon className="icon" />
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              </div>
            </SidebarAdmin>
            <AdminContent> {children}</AdminContent>
          </AdminContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
