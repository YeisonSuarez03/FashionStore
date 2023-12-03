import React, { useCallback, useMemo } from "react";
import useAuth from "../../hooks/useAuth";
import { Avatar, Dropdown, Image } from "antd";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { logout } from "../../helpers/logout";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/public/logo.png";

export default () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const items = useMemo(() => [
    {
      label: <span>{auth?.userName}</span>,
      key: 1,
    },
    {
      label: (
        <span className="flex justify-start items-center gap-2 cursor-pointer">
          <AiOutlineLogout /> Salir
        </span>
      ),
      key: 2,
      onClick: () => handleLogout(),
    },
  ]);

  const handleLogout = useCallback(() => {
    logout(setAuth);
    navigate("/");
  });

  return (
    <header className="static bg-gray-200 top-0 w-full">
      <div className="flex justify-between items-center gap-3 px-6 py-3">
        <div>
          <Image
            src={Logo}
            preview={false}
            style={{
              maxHeight: 60,
            }}
          />
        </div>
        <div>
          <Dropdown
            className="cursor-pointer"
            trigger={"click"}
            menu={{ items }}
          >
            <Avatar
              className="flex justify-center items-center"
              size={"large"}
              icon={<AiOutlineUser className="text-2xl" />}
            />
          </Dropdown>
        </div>
      </div>
    </header>
  );
};
