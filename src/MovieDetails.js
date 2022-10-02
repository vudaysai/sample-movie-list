import React from 'react';
export default class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonMoviesData: {}, movieData: [],
            movieDisplayInfo: {}, i: props.location.state
        }
    }

    static getDerivedStateFromProps(props) {

        if (props.movieData.length) {
            const movieIndex = props.movieData.findIndex(movie => movie.id === props.location.state.id)
            if (movieIndex >= 0) {
                return {
                    movieDisplayInfo: props.movieData[movieIndex],
                }
            }
        }

        return null;
    }

    movieInformation() {
        const { id, img, title, rating, likes, year, content, i } = this.state.movieDisplayInfo
        return (
            <div className="container" key={i} >
                <div className="row">
                    <div className="col-sm-3 mr-5 mt-5 ml-5"  >
                        <img src={img} width="300" alt="MovieImage" height="300" />
                    </div>
                    <div className="col   ml-5">
                        <div className="row-sm-3 offset-sm-3 ml-5 mt-5">
                            <div className="text-center"> <h3>{title}</h3></div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm-4">
                                <div>
                                    <i className="fa fa-star fa-2x">{rating}</i>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div>
                                    <i className="fa fa-heart fa-2x">{likes}</i>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div>
                                    <h3>{year} </h3>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm">
                                <h6>{content}</h6>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-2 offset-sm-2">
                                <button className="btn btn-primary myButton mb-3" onClick={() => { this.props.remove(id) }}>Delete</button>
                            </div>
                            <div className="col-sm-2 offset-sm-2">
                                <button className="btn btn-primary myButton mb-3" onClick={() => { this.props.edit(id) }}>Edit</button>
                            </div>
                            <div className="col-sm-2 offset-sm-2">
                                <button className="btn btn-primary myButton mb-3" onClick={() => { this.props.close() }}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }


    render() {
        return (
            <div>
                {this.movieInformation()}
            </div >
        )
    }
} 