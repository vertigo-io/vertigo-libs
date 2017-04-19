import React from 'react';
import moment from 'moment';

// web components
import history from 'focus-core/history';
import {cartridgeBehaviour} from 'focus-components/page/mixin';
import {storeBehaviour} from 'focus-components/page/mixin';
import OrchestraTitle from '../components/orchestra-title';
import OrchestraLogout from '../components/orchestra-logout';
import SummaryCardList from './components/summary-card-list'
import {component as Button} from 'focus-components/common/button/action';
import {translate} from 'focus-core/translation';

//stores & actions
import summaryListStore from '../../stores/summary-list';
import {loadSummaryList} from '../../action/process-executions';

//cartridge configuration


export default React.createClass({
    displayName: 'HomeView',
    mixins: [cartridgeBehaviour],

    /**
    * Related to the CartridgeBehaviour.
    * Define the cartridge configuration.
    * @return {[type]} [description]
    */
    cartridgeConfiguration() {
        return {
            summary: {
                component: OrchestraTitle
            },
            barRight: {
              component: OrchestraLogout
            },
            canDeploy: false
        };
    },

    getInitialState () {
        return {
            status: null,
            offset: 0
        };
    },

    _onErrorClick(d) {
        this.setState({status:'ERROR'});
    },
    _onAllClick(d) {
        this.setState({status:null});
    },

    _onSuccessClick(d) {
        this.setState({status:'DONE'});
    },
    _onMisfiredClick(d) {
        this.setState({status:'MISFIRED'});
    },

    _onPreviousClick(d) {
        const {offset} = this.state;
        this.setState({offset:offset-1});
    },
    _onNextClick(d) {
        const {offset} = this.state;
        this.setState({offset:offset+1});
    },
    _onCurrentClick(d) {
        this.setState({offset:0});
    },

    componentWillUpdate(nextProps,nextState){
      const {status, offset} = nextState;
      loadSummaryList.updateProperties({criteria : {status:status, offset:offset}});
    },

    _formatTitleDate(date){
      return moment(date).format('DD/MM/YYYY');
    },

    _navigateToDetail(data) {
      history.navigate(`#definitions/${data.processName}`, true);
      window.scrollTo(0, 0);
    },

    /** @inheritDoc */
    render() {
      let {offset} =  this.state
      let curr = new Date; // get current date
      let first = curr.getDate() - curr.getDay() +1 +7*offset; // First day is the day of the month - the day of the week
      let last = first + 6; // last day is the first day + 6

      let firstday = new Date(curr.setDate(first)).toUTCString();
      let lastday = new Date(curr.setDate(last)).toUTCString();

        return (
            <div data-demo='homepage'>
              <div data-orchestra='header' >
                <div>
                  <h1>{translate('view.home.timetitlefrom')}{this._formatTitleDate(firstday)}{translate('view.home.timetitleto')}{this._formatTitleDate(lastday)}</h1>
                </div>

                <div data-orchestra='filter'>
                  <Button label='Tout' type='button' shape='fab' icon='done_all' color='accent' handleOnClick={this._onAllClick} />
                  <Button label='Err' type='button' shape='fab' icon='report_problem' color='accent' handleOnClick={this._onErrorClick} />
                  <Button label='Succ' type='button'  shape='fab' icon='verified_user' color='accent' handleOnClick={this._onSuccessClick} />
                  <Button label='Succ' type='button'  shape='fab' icon='alarm_off' color='accent' handleOnClick={this._onMisfiredClick} />
                </div>
                <div data-orchestra='time-filter'>
                  <Button label={translate('view.home.previousWeek')} type='button' handleOnClick={this._onPreviousClick}  color='accent' data-orchestra='previous' />
                  <Button type='button' shape='fab' icon='today' color='accent' handleOnClick={this._onCurrentClick} />
                  <Button label={translate('view.home.nextWeek')} type='button' handleOnClick={this._onNextClick} color='accent' data-orchestra='next' />
                </div>
              </div>
              <SummaryCardList
                  action={loadSummaryList.load}
                  columns={[]}
                  store={summaryListStore}
                  handleLineClick={this._navigateToDetail}
               />
            </div>
        );
    }
});
