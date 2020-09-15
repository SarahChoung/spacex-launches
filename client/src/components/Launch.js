import React, { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import classNames from "classnames";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flightNumber: Int!) {
    launch(flight_number: $flightNumber) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

function LaunchQuery(props) {
  let { flightNumber } = props;
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flightNumber },
  });
  if (loading) return <h4>Loading...</h4>;
  if (error) console.log(error);
  console.log(data);

  return <h1>Launch</h1>;
}

export default class Launch extends React.Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <Fragment>
        <LaunchQuery flightNumber={flight_number} />
      </Fragment>
    );
  }
}
