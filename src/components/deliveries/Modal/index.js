import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { vehicleTypes, uom } from "./config";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const AddEvent = ({ open, handleClose, onHandleFormSubmit, data, isEdit }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [error, setError] = useState("");
  const [state, setState] = useState(
    data || {
      vehicleType: "",
      amount: 0,
      grace: 0,
      amountUom: "",
      graceUom: "",
    }
  );

  const { vehicleType, amount, grace, amountUom, graceUom } = state;

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (!vehicleType || !amount || !grace || !graceUom || !amountUom) {
      setError("Please fill all the fields");
    } else {
      onHandleFormSubmit(state);
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    setIsOpen(open);
    setState(data);
    return () => {
      setIsOpen(false);
    };
  }, [open, data]);

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={isOpen}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}>
        <Fade in={isOpen}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              {isEdit ? "Edit Event" : "Add Event"}
            </Typography>
            {error ? <p>{error}</p> : ""}
            <form noValidate autoComplete="off" onSubmit={onHandleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormControl variant="standard">
                    <TextField
                      style={{ width: "165px" }}
                      id="vehicleType"
                      name="vehicleType"
                      select
                      label="Vehicle Type"
                      value={vehicleType}
                      helperText="Please select your vehicle type"
                      onChange={handleInputChange}
                      variant="standard">
                      {vehicleTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl variant="standard">
                    <TextField
                      id="grace"
                      label="Grace"
                      name="grace"
                      value={grace}
                      onChange={handleInputChange}
                      variant="standard"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl variant="standard">
                    <TextField
                    style={{ width: "165px" }}
                      id="graceUom"
                      select
                      name="graceUom"
                      label="UOM"
                      value={graceUom}
                      helperText="Please select your UOM"
                      onChange={handleInputChange}
                      variant="standard">
                      {uom.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl variant="standard">
                    <TextField
                      id="grace"
                      label="Amount"
                      name="amount"
                      value={amount}
                      onChange={handleInputChange}
                      variant="standard"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl
                    variant="standard"
                    style={{ width: "165px" }}>
                    <TextField
                      id="amountUom"
                      select
                      name="amountUom"
                      label="UOM"
                      value={amountUom}
                      helperText="Please select your UOM"
                      onChange={handleInputChange}
                      variant="standard">
                      {uom.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
              </Grid>
              <Box>
                <Button
                  sx={{ borderRadius: "50px", margin: "10px" }}
                  variant="outlined"
                  onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  sx={{ borderRadius: "50px", margin: "10px" }}
                  variant="outlined"
                  onClick={onHandleSubmit}>
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default AddEvent;
