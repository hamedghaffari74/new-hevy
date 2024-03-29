import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import Navbar from "../../layout/navbar/navbar";
import {
  Button,
  Grid,
  Typography,
  Paper,
  Hidden,
  Modal,
  Box,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CardSelect from "../../layout/card/cardSelect";
import { useSelector } from "react-redux";
import { createRoutes, setRoutes } from "../../../store/slice/routineSlice";
import MenuExercise from "../menuExercise";
import routinApi from "../../axiosApi/axiosRoutin";
import { Navigate } from "react-router-dom";

// css
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  marginTop: 7,
};

function Newroutin() {
  const list = useSelector((state) => state.exercise.list);
  const title = useSelector((state) => state.exercise?.title);
  const setList = useSelector((state) => state.routine.list);
  const dispatch = useDispatch();
  // save

  useEffect(() => {
    dispatch(createRoutes({ title }));
  }, [title]);

  const [server, setServer] = useState(false);
  const [Successfull, setSuccessfull] = useState(false);
  const [navi, setNavi] = useState(false);
  const handleSetList = () => {
    list.map((item) => dispatch(setRoutes({ item })));
    setServer(true);
  };

  useEffect(() => {
    if (server == true) {
      if (title) {
        routinApi
          .post(`/routine`, setList)
          .then((res) => "")
          .catch((err) => "");
        setSuccessfull(true);
      } else {
        setServer(false);
        alert("لطفا یک نام وارد کنید");
      }
    }
  }, [server]);

  // response mobile hiden button
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (Successfull) {
    return (
      <div>
        <Navigate to="../routines" />
      </div>
    );
  }
  return (
    <div className="newRoutin-style  md:direction:rtl  min-h-[80vh]">
      <Navbar />
      <div className="lg:container mx-auto">
        <div className="exercise-box md:pt-5 md:px-8 md:flex lg:flex sm:w-full lg:mr-21 ">
          <div className="exercise-left hidden  max-md:w-full mb-5  lg:ml-7 md:inline ">
            <MenuExercise separator={1} />
          </div>
          <div className="exercise-right max-md:w-full mb-5 w-full md:w-4/6 md:ml-14 mt-8 md:mr-1">
            <div className="mt-1">
              <Grid item xs={3} md={3}>
                <Button
                  onClick={handleSetList}
                  className="float-end md:h-11"
                  color="primary"
                  variant="contained"
                >
                  <h2 className="buttonRoute"> ذخیره روتین</h2>{" "}
                </Button>
              </Grid>
              <Paper elevation={3} className="mt-4">
                <div className="w-full ">
                  {list.length > 0 ? (
                    <CardSelect />
                  ) : (
                    <div className="emptyRight ">
                      <FitnessCenterIcon
                        color="primary"
                        className="fitnessIcon"
                        sx={{ fontSize: 80 }}
                      />
                      <Typography> لطفا یک ورزش انتخاب کنید</Typography>
                    </div>
                  )}
                </div>
              </Paper>
              <div className="mt-5">
                <Hidden mdUp>
                  <Button
                    onClick={handleOpen}
                    className="float-end h-10 button "
                    color="primary"
                    variant="contained"
                  >
                    <Typography> اضافه کردن ورزش</Typography>
                  </Button>
                </Hidden>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} className="exercise-left">
                  <MenuExercise separator={1} />
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newroutin;
