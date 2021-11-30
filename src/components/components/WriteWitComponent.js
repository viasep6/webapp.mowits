import React from 'react';

function WriteWitComponent() {
    let profileImage = require('../../assets/img/menu_logo.png');

    const [count, setCount] = React.useState(0);
    const [value, setValue] = React.useState('');
    const maxCount = 300;

    const countStyle = {
        'position': 'absolute',
        'bottom': '10px',
        'right': '20px',
        'fontSize': '10px',
    };

    const onChange = (e) => {
        setCount(e.target.value.length);

        if (e.target.value.length < maxCount) {
            setValue(e.target.value);
        }
    };

    return (
        <div className="d-flex">
            <div className="my-auto m-2">
                <img className="img-fluid" src={profileImage.default} alt="profile" height={50} width={50}/>
            </div>
            <div className="col-md-6">
                <div className="input-group">
                    <textarea className="form-control"
                              placeholder="Share your wits and receive roars"
                              style={{'resize': 'none',}}
                              onChange={onChange}
                              value={value}/>
                    <span style={countStyle}>{count}/{maxCount}</span>
                </div>
            </div>
            <div className="my-auto m-2">
                <button className="btn btn-success pl-4 pr-4">Post</button>
            </div>
        </div>
    );
}

export default WriteWitComponent;