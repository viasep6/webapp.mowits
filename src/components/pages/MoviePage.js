import React from 'react';
import WitComponent from '../components/wits/WitComponent';
import {withRouter} from 'react-router-dom';

function MoviePage(props) {

    const movieId = props.match.params.id;


    const notFound = require('../../assets/img/poster_not_found.jpg');

    return (
        <div className="mb-5">
            <div className="m-4">
                <h1 className="text-center">{movieId.toUpperCase()}</h1>
            </div>
            <hr/>
            <div className="row">
                <div className="col-md-8">
                    <img src={notFound.default} className="shadow" width={'100%'} alt="movie poster"/>
                </div>
                <div className="col-md-4">
                    <div className="border">
                        <p className="p-2 fw-bold">Movie Score</p>
                        <ul className="p-2">
                            <li className="list-unstyled">Imdb score: 8.1</li>
                            <li className="list-unstyled">Rotten score: 3.2</li>
                            <li className="list-unstyled">Wits: 513</li>
                            <li className="list-unstyled">Genre: Drame, Crime</li>
                            <li className="list-unstyled">Your prediction: 4/5</li>
                            <li className="list-unstyled">Languages: English</li>
                            <li className="list-unstyled">Directors: Lorem ipsum</li>
                            <li className="list-unstyled">Cast: Lorem ipsum, dolor sit amet, consectetur elit ...
                                [MORE]
                            </li>
                            <li className="list-unstyled">Links: IMDB, TMDB</li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="m-5"/>

            <div className="row m-0">
                <div className="shadow-sm">
                    <p className="text-center">Summary</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                        ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium,
                        totam rem aperiam.
                    </p>
                </div>
            </div>

            <hr/>

            <div className="row m-0 text-center">
                <h1>Reviews</h1>
                ReviewComponent here
            </div>
            <hr/>
            <div className="row m-0">
                <div className="text-center mb-5">
                    <h1>Movie Wits</h1>
                </div>

                <div className="">
                    <div className="d-flex align-items-center flex-column bd-highlight mb-3">
                        <WitComponent/>
                        <WitComponent/>
                        <WitComponent/>
                        <WitComponent/>
                        <WitComponent/>
                        <WitComponent/>
                        <div className="mt-5">
                            <button className="btn btn-outline-dark ">Load more</button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default withRouter(MoviePage);