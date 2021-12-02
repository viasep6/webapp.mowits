// import React, {useEffect, useState} from 'react';

import {withRouter} from 'react-router-dom';

function TestPage(props) {

    console.log(props);

    return (
        <div>
            <h2>Test</h2>

        </div>
    );
}

export default withRouter(TestPage);