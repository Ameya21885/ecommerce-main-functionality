import React, { useEffect, useState } from "react";
// import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { CartState } from "../../context/Context";
import Rating from "../products/Rating";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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

const AddToCart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();
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

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div>
      AddToCart
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <h2>Total Amount</h2>
            <p> ₹ {total}</p>
          </Grid>
          <Grid item xs={4}>
            <h2>Total No. of Products</h2>
            <p>{cart.length}</p>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {cart.map((prod) => (
            <>
              <Grid item xs={2} sm={4} md={4} key={prod.id}>
                <Card sx={{ maxWidth: 345 }} key={prod.id}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={prod.image}
                    title={prod.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {prod.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
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
                              severity="error"
                              sx={{ width: "100%" }}
                            >
                              Remove from cart
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
                              severity="success"
                              sx={{ width: "100%" }}
                            >
                              Add to Cart
                            </Alert>
                          </Snackbar>
                        </Stack>
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default AddToCart;
