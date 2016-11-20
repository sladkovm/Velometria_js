/** @file - Component to define the App level right side pannel */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Counts } from 'meteor/tmeasday:publish-counts';

import ActivityPanelItem from '../components/activity-panel-item.js';
import { Loading } from '../components/Loading';
import { getAllActivities } from '../../reducers/activities';
import { setCurrentPage } from '../../actions/page';

const ACTIVITIES_PER_PAGE = 10;

class SidePanel extends Component {
  renderActivities() {
    const { activities } = this.props;
    return !activities ?
      <Loading /> :
      <ListGroup>
        {activities.map((activity) => (
          <ActivityPanelItem
            key={activity.id}
            activity={activity}
          />
        ))}
      </ListGroup>;
  }

  render() {
    const pageNum = this.props.activitiesCount / ACTIVITIES_PER_PAGE;
    return (
      // <Panel>
      <div>
        {this.renderActivities()}
        <ReactPaginate
          pageNum={pageNum}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          containerClassName={"pagination"}
          clickCallback={(page) => this.props.selectPage(page.selected)}
        />
      </div>
      // </Panel>
    );
  }
}


const mapStateToProps = (state) => ({
  activities: getAllActivities(state),
  activitiesCount: Counts.get('ActivitiesCount'),
});
const mapDispatchToProps = (dispatch) => ({
  selectPage: (page) => dispatch(setCurrentPage(page)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
