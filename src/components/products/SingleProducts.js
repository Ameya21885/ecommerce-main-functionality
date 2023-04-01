import React from "react";
import { CartState } from "../../context/Context";
import Rating from "./Rating";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SingleProducts = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="products">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={prod.image} title={prod.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {prod.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            ₹ {prod.price.split(".")[0]}
          </Typography>
          {prod.fastDelivery ? (
            <div>Fast Delivery</div>
          ) : (
            <div>4 days delivery</div>
          )}
          <Rating rating={prod.ratings} />
        </CardContent>
        <CardActions>
          {cart.some((p) => p.id === prod.id) ? (
            <>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setOpen(true);
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: prod,
                    });
                  }}
                >
                  Remove from Cart
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Add to Cart
                  </Alert>
                </Snackbar>
              </Stack>
            </>
          ) : (
            <>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setOpen(true);
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: prod,
                    });
                  }}
                  disabled={!prod.inStock}
                >
                  {!prod.inStock ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    Remove from Cart
                  </Alert>
                </Snackbar>
              </Stack>
            </>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default SingleProducts;
