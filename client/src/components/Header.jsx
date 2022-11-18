import React, { useRef, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import logo from "../assets/images/Logo-2.png";
import styled from "styled-components";
import { logOut } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
  {
    display: "Tin tức",
    path: "/news",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const [showDropdown, setShowDropdown] = useState(false);

  const headerRef = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.auth?.currentUser?.token);
  const isAdmin = useSelector((state) =>
    state.auth?.currentUser?.roles.find((item) => item.includes("admin"))
  );
  console.log("Is admin header", isAdmin);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      // window.removeEventListener("scroll");
    };
  }, []);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  const Dropdown = styled.div`
    position: relative;
    line-height: 50px;
    margin-left: 20px;
    z-index: 120;
  `;
  const DropdownTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const DropdownContent = styled.div`
    position: absolute;
    width: 150px;

    border-radius: 10px;
    background-color: #fff;
    top: 40px;
    right: -18px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  `;

  const DropdownLink = styled.a`
    font-size: 20px;

    display: block;
    line-height: normal;
    padding: 5px 10px;
    font-size: 16px;
  `;

  const handleToggleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logOut(dispatch, history);
  };

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
            <div className="header__menu__item header__menu__left__item">
              {user && isAdmin ? <Link to="/admin">Admin</Link> : ""}
            </div>
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-search"></i>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
              </Link>
            </div>

            <Dropdown>
              <DropdownTitle onClick={handleToggleShowDropdown} to="#">
                <i
                  className="bx bx-user"
                  onClick={handleToggleShowDropdown}
                ></i>
              </DropdownTitle>
              {showDropdown && (
                <DropdownContent>
                  {!user ? (
                    <>
                      <DropdownLink>
                        {" "}
                        <Link to="/login">Login</Link>
                      </DropdownLink>
                      <DropdownLink>
                        <Link to="/register">Register</Link>
                      </DropdownLink>
                    </>
                  ) : (
                    <>
                      <DropdownLink onClick={handleLogout}>Logout</DropdownLink>
                      <DropdownLink>
                        {!isAdmin ? (
                          <Link to="/history-order"> History order</Link>
                        ) : (
                          ""
                        )}
                      </DropdownLink>
                    </>
                  )}
                </DropdownContent>
              )}
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
