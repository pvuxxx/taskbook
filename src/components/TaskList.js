import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';
import { connect } from 'react-redux';
import { archiveTask, pinTask } from '../lib/redux';

export function PureTaskList({ loading, tasks, pinTask, archiveTask }) {
    const events = {
        archiveTask,
        pinTask
    };
    const loadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text" >
                <span>Loading</span>
                <span>cool</span>
                <span>state</span>
            </span>
        </div>
    );


    if (loading) {
        return <div className="list-items">
            {loadingRow}
            {loadingRow}
            {loadingRow}
            {loadingRow}
            {loadingRow}
            {loadingRow}
        </div>;
    }
    if (tasks.length === 0) {
        return (<div className="list-items">
            <div className="wrapper-message">
                <span className="icon-check" />
                <div className="title-message"> You have no tasks</div>
                <div classname="subtitle-message">Sit back and relax</div>
            </div>
        </div>
        );
    }
    const tasksInOrder = [
        ...tasks.filter(t => t.state === 'TASK_PINNED'),
        ...tasks.filter(t => t.state !== 'TASK_PINNED'),
      ];

    return (
        <div className="list-items">
            {tasksInOrder.map(task => (
                <Task key={task.id} task={task} {...events} />
            ))}
        </div>
    )
}
PureTaskList.propTypes = {
    loading: PropTypes.bool,
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
    onPinTask: PropTypes.func.isRequired,
    onArchiveTask: PropTypes.func.isRequired,
  };
  
  PureTaskList.defaultProps = {
    loading: false,
  };
  
  export default connect(
    ({ tasks }) => ({
      tasks: tasks.filter(t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'),
    }),
    dispatch => ({
      onArchiveTask: id => dispatch(archiveTask(id)),
      onPinTask: id => dispatch(pinTask(id)),
    })
  )(PureTaskList);