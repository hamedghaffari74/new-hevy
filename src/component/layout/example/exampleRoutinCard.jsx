import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  updateDeleteExercise,
  updatecreateSuperSet,
} from "../../../store/slice/routinesdaySlice";
import { useDispatch } from "react-redux";
import Divider from "@mui/material/Divider";
import { grey } from "@mui/material/colors";
import { Typography } from "@mui/material";

const ITEM_HEIGHT = 48;

export default function LongMenu({
  Id,
  getReplace,
  getSuperSet,
  getSuperSetRoutin,
}) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(updateDeleteExercise(Id));
  };
  const handleReplace = () => {
    getReplace(true);
    dispatch(updateDeleteExercise(Id));
  };
  const handleSuperSet = () => {
    dispatch(updatecreateSuperSet(Id));
    getSuperSet(true);
    getSuperSetRoutin(Id);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            border: "2px solid",
            borderColor: grey[200],
            borderRadius: "12px",
            alignItems: "flex-start",
            gap: "10px",
          },
        }}
      >
        <MenuItem className="" onClick={handleDelete}>
          <Typography className="text-lg"> حذف کردن</Typography>
        </MenuItem>
        <Divider />
        <MenuItem className="" onClick={handleReplace}>
          جایگزین کردن
        </MenuItem>
        <Divider />
        <MenuItem className="" onClick={handleSuperSet}>
          سوپرست
        </MenuItem>
      </Menu>
    </div>
  );
}
