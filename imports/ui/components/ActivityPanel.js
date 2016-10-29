import { Link } from 'react-router';
import React from 'react';
import { ListGroupItem } from 'react-bootstrap';


const ActivityPanel = ({ activity }) => {
  // console.log(activity.name)
  return (
    <Link
      to={`/activity/${activity.id}`}
      activeStyle={{
        textDecoration: 'none',
        color: 'red',
      }}
    >
      <ListGroupItem>
        <p>{activity.name}</p>

      </ListGroupItem>
    </Link>
  );
};


export default ActivityPanel;
