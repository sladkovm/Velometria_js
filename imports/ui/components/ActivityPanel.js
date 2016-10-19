/**
* @file - React component for Activities list
*/

import { Link } from 'react-router';
import React from 'react';


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
      <p>{activity.name}</p>
    </Link>
  );
};


export default ActivityPanel;
