import React, { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

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

  const {
    mission_name,
    flight_number,
    launch_year,
    launch_success,
    rocket: { rocket_id, rocket_name, rocket_type },
  } = data.launch;

  return (
    <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">Mission:</span>
        {mission_name}
      </h1>
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Flight Number: {flight_number}</li>
        <li className="list-group-item">Launch Year: {launch_year}</li>
        <li className="list-group-item">
          Launch Successful:{" "}
          <span className={launch_success ? "text-success" : "text-danger"}>
            {launch_success ? "Yes" : "No"}
          </span>
        </li>
      </ul>
      <h4 className="my-3">Rocket Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Rocket ID: {rocket_id}</li>
        <li className="list-group-item">Rocket Name: {rocket_name}</li>
        <li className="list-group-item">Rocket Type: {rocket_type}</li>
      </ul>
      <hr />
      <Link to="/" className="btn btn-secondary">
        Back
      </Link>
    </div>
  );
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
