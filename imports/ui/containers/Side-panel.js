/** @file - Component to define the App level right side pannel */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import ActivityPanelItem from '../components/activity-panel-item.js';
import { Loading } from '../components/Loading';
import { getAllActivities } from '../../reducers/activities';
import { setCurrentPage } from '../../actions/page';


class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

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

  handlePageClick(page) {
    const { dispatch } = this.props;
    dispatch(setCurrentPage(page.selected));
  }

  render() {
    return (
      // <Panel>
      <div>
        {this.renderActivities()}
        <ReactPaginate
          pageNum={6}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          containerClassName={"pagination"}
          clickCallback={this.handlePageClick}
        />
      </div>
      // </Panel>
    );
  }
}


const mapStateToProps = (state) => ({
  activities: getAllActivities(state),
});
export default connect(mapStateToProps)(SidePanel);
