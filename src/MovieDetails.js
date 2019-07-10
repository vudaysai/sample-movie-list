import React from 'react';
import { taskTypes, movieDisplayInfo } from './MoviesList'

export default class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieDisplayInfo: props.location.state
        }

    }


    movieInformation() {
        return (


            <div className="container">
                <div className="row">
                    <div className="col-sm-3 mr-5 mt-5 ml-5">
                        <img src={this.state.movieDisplayInfo.img} width="300" alt="MovieImage" height="300" />
                    </div>
                    <div className="col   ml-5">
                        <div className="row-sm-3 offset-sm-3 ml-5 mt-5">
                            <div className="text-center"> <h3>{this.state.movieDisplayInfo.title}</h3></div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm-4">
                                <div>
                                    <i className="fa fa-star fa-2x">{this.state.movieDisplayInfo.rating}</i>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div>
                                    <i className="fa fa-heart fa-2x">{this.state.movieDisplayInfo.likes}</i>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div>
                                    <h3>{this.state.movieDisplayInfo.year} </h3>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm">
                                <h6>{this.state.movieDisplayInfo.content}</h6>
                            </div>
                        </div>
                        {/* <div className="row mt-3">
                            <div className="col-sm-2 offset-sm-2">
                                <button className="btn btn-primary myButton mb-3" onClick={() => this.removeMovieInfo(i)}  >Delete</button>
                            </div>
                            <div className="col-sm-2 offset-sm-2">
                                <button className="btn btn-primary myButton mb-3" onClick={() => { this.toggle(); this.editMovieInfo(i) }}  >Edit</button>
                            </div>
                            <div className="col-sm-2 offset-sm-2">
                                <button className="btn btn-primary myButton mb-3" onClick={() => this.closeMovieInfo(i)}>Close</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

        )



    }
    render() {
        return (
            <div>{this.movieInformation()}</div>
        )

    }

}