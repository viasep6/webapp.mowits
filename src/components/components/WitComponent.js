import React from 'react';
import moment from 'moment';

function WitComponent() {

    let style = {
        'max-width': '550px',
    };

    const likeIcon = require('../../assets/img/like-icon.png');

    let witText = 'Lorem ipsum dolor sit amet, haha';
    let profileImage = require('../../assets/img/menu_logo.png');
    let withUser = 'User1';
    let likeCount = 2306;
    const dateFormat = 'YYYY-MM-DD HH:mm';
    const date = new Date();
    let dateTime = moment(date).format(dateFormat);

    return (
        <>
            <div className="border-top border-bottom w-100 row" style={style}>
                <div className="col-md-2 p-2">
                    <img src={profileImage.default} className="rounded-circle img-fluid border" alt="default profile"
                         width="54" height="54"/>
                </div>
                <div className="col-md-10 p-2">
                    <div className="d-flex">
                        <div>
                            <p className="fw-bold" style={{'font-size': '14px'}}>{withUser}</p>
                        </div>
                        <div>
                            <p className="text-secondary ml-2 mt-1" style={{'font-size': '10px', 'white-space': 'nowrap'}}>{dateTime}</p>
                        </div>
                        <div className="w-100 flex-grow-0 ml-2">
                            <span className="badge badge-secondary ml-1">Movie name</span>
                            <span className="badge badge-secondary ml-1">Movie name</span>
                            <span className="badge badge-secondary ml-1">...</span>
                        </div>
                        <div className="ml-auto text-secondary">
                            <i className="fas fa-ellipsis-h"></i>
                        </div>
                    </div>

                    <div className="">
                        <div className="">
                            <p>{witText}</p>
                        </div>
                    </div>
                    <div className="d-flex text-secondary justify-content-between">
                        <i className="m-2 far fa-lg fa-comment" title="Reply"></i>
                        <i className="m-2 far fa-lg fa-retweet" title="Rewit"></i>
                        <i className="m-2 far fa-lg fa-share-square" title="Share"></i>
                        <span>
                            <img src={likeIcon.default} className="img-thumbnail" alt="default profile" width="32"
                                 height="32" title="Add roar to wit"/>
                            {likeCount}
                            </span>
                    </div>
                </div>
            </div>
        </>
    );

}

export default WitComponent;