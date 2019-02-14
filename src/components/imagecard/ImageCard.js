import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ImageCard = props => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom>{props.city}</Typography>
        <Typography variant="h5" component="h2">
          {props.location}
        </Typography>
        <Typography color="textSecondary">{props.location}</Typography>
        <Typography component="p">
          Parameter: {props.parameter}
          Unit: {props.unit}
          <br />
          Value: {props.value}
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
};

//Grid with 2 Cards Spread evenly below filtered results

export default ImageCard;
