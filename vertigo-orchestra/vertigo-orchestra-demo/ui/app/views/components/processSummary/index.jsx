import React, {PropTypes} from 'react';

const propTypes = {
    errorsCount: PropTypes.number,
    successfulCount: PropTypes.number,
    misfiredCount: PropTypes.number,
    averageExecutionTime: PropTypes.number,
    health: PropTypes.string,
    handleErrorClick: PropTypes.func,
    handleSuccessClick: PropTypes.func
};


function getClassFromHealth(health){
  switch (health) {
    case 'SUCCESS':
        return 'health-success';
    case 'WARNING':
        return 'health-warning';
    case 'ERROR':
        return 'health-error';
    default:
        return '';

  }
};

function ProcessSummary({ errorsCount, successfulCount, misfiredCount, averageExecutionTime, health, handleErrorClick, handleSuccessClick}) {
    return (
          <div  data-orchestra='execution-summary'>
                <div data-orchestra='execution-summary-icon' className={getClassFromHealth(health)}>
                  <i className="material-icons">favorite</i>
                </div>
                <div data-orchestra='execution-summary-icon' className='errorsCount' onClick={handleErrorClick} >
                  <i className="material-icons">report_problem</i><br/>
                  <span>{errorsCount}</span>
                </div>
                <div data-orchestra='execution-summary-icon' className='successfulCount' onClick={handleSuccessClick} >
                  <i className="material-icons">verified_user</i><br/>
                  <span>{successfulCount}</span>
                </div>
                <div data-orchestra='execution-summary-icon' className='misfiredCount' >
                  <i className="material-icons">alarm_off</i><br/>
                  <span>{misfiredCount}</span>
                </div>
                <div data-orchestra='execution-summary-icon'>
                  <i className="material-icons">timer</i><br/>
                  <span>{averageExecutionTime}s</span>
                </div>
          </div>
    );
};

ProcessSummary.displayName = 'ProcessSummary';
ProcessSummary.propTypes = propTypes;
export default ProcessSummary;
