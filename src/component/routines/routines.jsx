import React, { useState, useEffect } from "react";
import Navbar from "../layout/navbar/navbar";
import "../../App.css";
import { useDispatch } from "react-redux";
import { Button, Box, Typography } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Link, NavLink } from "react-router-dom";
import { removeRoutineDay } from "../../store/slice/routinesdaySlice";
import { removeExercise } from "../../store/slice/exerciseSlice";
import { removeRoutine } from "../../store/slice/routineSlice";
import { createList, deleteRouteRedux } from "../../store/slice/titleRoutin";
import ExampleRoutines from "../layout/example/exampleRoutines";
import useSWR from "swr";
import routineApi from "../axiosApi/axiosRoutin";
import axios from "axios";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
function Routines() {
  const dispatch = useDispatch();
  const routeTitle = useSelector((state) => state.titleRoutin?.list);
  useEffect(() => {
    dispatch(removeRoutineDay())
    dispatch(removeRoutine())
    dispatch(removeExercise())
  }, [])
  
  axios.defaults.headers.get["Authorization"] = `Bearer ${localStorage.getItem(
    "token"
  )}`;

  const getRoutine = (url) => {
    axios
      .get(url)
      .then((res) => dispatch(createList(res.data.data)))
      .catch((err) => "");
  };

  const { route } = useSWR(["https://api.ddem.ir/api/v1/routine"], getRoutine);

  const deleteRoutes = (Id) => {
    routineApi.delete(`/routine/${Id}`);
    dispatch(deleteRouteRedux({ Id }));
  };

  return (
    <div className="routin-style min-h-[80vh]">
      <Navbar />
      <div className="hidden sm:block md:min-h-[35rem] mb-10">
        <div className="routin-box md:flex mt-14">
          <div className=" max-md:w-full  mb-5 md:ml-3 lg:mr-8 lg:w-1/5 ">
            <Button
              className="m-2 "
              variant="outlined"
              startIcon={<ContentPasteIcon />}
            >
              <Link className="p-2 fontB" to="newroutin">
                <Typography> روتین جدید</Typography>
              </Link>
            </Button>
          </div>

          <div className="routin-right min:h-14 md:w-full lg:w-4/6  ">
            <div className="displayStyle">
              <Typography className="pt-4 length-route">
                روتین های من ({routeTitle?.length})
              </Typography>
            </div>
            {routeTitle ? (
              routeTitle.map((item, index) => (
                <div className="displayStyle listBox ">
                  <NavLink className="w-4/6 " to={`routinesDay/${item.id}`}>
                    <Box key={index}>
                      <Typography className="fontB"> {item.title}</Typography>
                    </Box>
                  </NavLink>
                  <ExampleRoutines Id={item.id} deleteRoutes={deleteRoutes} />
                </div>
              ))
            ) : (
              <Skeleton
                animation="wave"
                height={30}
                width="100%"
                style={{ marginTop: 7, marginBottom: 8 }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="block sm:hidden ">
        <div className="routinBoxMobile  mt-7">
          <div className=" max-md:w-full mb-5 ">
            <Button
              className="m-2 "
              variant="outlined"
              startIcon={<ContentPasteIcon />}
            >
              <Link className="p-2 fontB" to="newroutin">
                <Typography> روتین جدید</Typography>
              </Link>
            </Button>
          </div>
          <div className="routin-right min:h-14">
            <div className="displayStyle">
              <Typography className="pt-4 length-route">
                روتین های من({routeTitle?.length})
              </Typography>
            </div>
            {routeTitle ? (
              routeTitle.map((item, index) => (
                <div key={index} className="displayStyle listBox ">
                  <NavLink className="w-4/6 " to={`routinesDay/${item.id}`}>
                    <Box className="">
                      <Typography className="fontB"> {item.title}</Typography>
                    </Box>
                  </NavLink>
                  <ExampleRoutines Id={item.id} deleteRoutes={deleteRoutes} />
                </div>
              ))
            ) : (
              <Skeleton
                animation="wave"
                height={30}
                width="100%"
                style={{ marginTop: 7, marginBottom: 8 }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Routines;
