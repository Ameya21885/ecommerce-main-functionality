import React from "react";
import { CartState } from "../../context/Context";
import Rating from "./Rating";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

const Filters = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
    productState: { byStock, byFastDelivery, sort, byRating },
  } = CartState();

  // make state for rating

  return (
    <Box style={{ width: "50%", margin: "1rem auto 1rem auto" }}>
      <h1>Filters</h1>
      <div className="filters">
        <span className="title">Filter Products</span>

        {useLocation().pathname.split("/")[1] !== "cart" && (
          <>
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                label="search"
                id="fullWidth"
                onChange={(e) => {
                  productDispatch({
                    type: "FILTER_BY_SEARCH",
                    payload: e.target.value,
                  });
                }}
              />
            </Box>
          </>
        )}

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Order</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="ascending"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="ascending"
              control={<Radio />}
              label="Ascending"
              onChange={() =>
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "lowToHigh",
                })
              }
              checked={sort === "lowToHigh" ? true : false}
            />
            <FormControlLabel
              value="descending"
              control={<Radio />}
              label="Descending"
              onChange={() =>
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "highToLow",
                })
              }
              checked={sort === "highToLow" ? true : false}
            />
          </RadioGroup>
        </FormControl>

        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Include Out of Stock"
            onChange={() =>
              productDispatch({
                type: "FILTER_BY_STOCK",
              })
            }
            checked={byStock}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Fast Delivery Only"
            onChange={() =>
              productDispatch({
                type: "FILTER_BY_DELIVERY",
              })
            }
            checked={byFastDelivery}
          />
        </FormGroup>
      </div>
    </Box>
  );
};

export default Filters;
