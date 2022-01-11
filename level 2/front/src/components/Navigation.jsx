import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import { Outlet, useNavigate } from "react-router-dom";

export default function Navigation() {
  const [value, setValue] = React.useState("report");

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {

    setValue(newValue);
    if (newValue === "report") {
      navigate("/");
    } else if (newValue === "police") {
      navigate("/police");
    }
  };

  return (
    <>
      <BottomNavigation
        sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}
        value={value}
        onChange={handleChange}
      >

        <BottomNavigationAction
          label="Signalement"
          value="report"
          icon={<PedalBikeIcon />}
        />

          <BottomNavigationAction
            label="Police"
            value="police"
            icon={<LocalPoliceIcon />}
          />

      </BottomNavigation>
      <Outlet />
    </>
  );
}
