import React, {Component} from 'react';
import connect from 'focus-components/behaviours/store/connect';
import testStore from '../../../stores/test';
import {error} from '../../../action/test';

const TestViewDumpComponent = (props) => {
    return (
        <div>
            <button onClick={() => error.load() }>load</button>
            {JSON.stringify(props)}
        </div>
    );
};

const connector = connect([{store: testStore, properties: ['customServerError']}], (props) => {
    return {
        error: testStore.getErrorCustomServerError(),
        value: testStore.getCustomServerError()
    };
});
const ConnectedTestView = connector(TestViewDumpComponent);


export default ConnectedTestView;
