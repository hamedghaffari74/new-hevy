import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Typography, Menu, MenuItem } from "@mui/material";
import {
  deleteExercise,
  createSuperSet,
} from "../../../store/slice/exerciseSlice";
import { useDispatch } from "react-redux";
import { grey } from "@mui/material/colors";
import Divider from "@mui/material/Divider";

export default function LongMenuExercise({
  Id,
  getReplace,
  getSuperSet,
  getSuperSetId,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteExercise(Id));
  };

  const handleReplace = () => {
    getReplace(true);
    dispatch(deleteExercise(Id));
  };

  const handleSuperSet = () => {
    dispatch(createSuperSet(Id));
    getSuperSet(true);
    getSuperSetId(Id);
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
