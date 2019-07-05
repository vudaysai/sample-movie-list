import React from 'react'
import jsonMoviesData from './data/data.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
export default class MoviesList extends React.Component {
  taskTypes = [];
  MovieDetails = jsonMoviesData;
  constructor(props) {
    super(props);
    this.state = {
      value: '', taskTypes: jsonMoviesData, modal: false,
      act: 0,
      index: '',
      datas: [],
      showComponent: false,
      movieDisplayInfo: ''
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showMovieInfo = this.showMovieInfo.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    this.taskTypes = jsonMoviesData.map(function (a) { return a });
    let suggestions = this.taskTypes.filter(function (tname) {
      return tname.title.toLowerCase().includes(event.target.value.toLowerCase());
    });
    this.setState({
      taskTypes: suggestions
    })
  }
  submitMovieInfo = (e) => {
    console.log(this.MovieDetails.length);
    e.preventDefault();
    let MovieDetails = this.state.MovieDetails;
    let img = this.refs.url.value;
    let title = this.refs.name.value;
    let rating = this.refs.ratings.value;
    let likes = this.refs.likes.value;
    let year = this.refs.year.value;
    let content = this.refs.content.value;
    if (this.state.act === 0) {
      let id = this.MovieDetails.length + 1;
      let data = {
        id, img, title, rating, likes, year, content
      }
      this.MovieDetails.push(data);
    }
    console.log(this.MovieDetails);
    this.refs.myform.reset();
    this.setState({
      MovieDetails: MovieDetails,
      taskTypes: this.MovieDetails, modal: !this.state.modal
    });
  }
  showMovieInfo(postdetails) {
    console.log(postdetails);
    this.setState({
      showComponent: true,
      movieDisplayInfo: postdetails
    });
  }
  fRemove = (index) => {
    let MovieDetails = this.state.MovieDetails;
    MovieDetails.splice(index, 1);
    console.log(this.MovieDetails);
    this.refs.myform.reset();
    this.setState({
      MovieDetails: MovieDetails,
      taskTypes: this.MovieDetails
    });
  }
  removeMovieInfo(postdetails) {
    console.log(postdetails);
    this.setState({
      showComponent: true,
      movieDisplayInfo: postdetails
    });
  }
  searchInfo() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-6 mt-5">
            <div className="from-group">
              <div className="input-group input-group-lg">
                <span className="input-group-addon  bg-warning text-light p-2">
                  <i className="fa fa-search fa-2x"></i>
                </span>
                <input type="text" className="form-control bg-light text-dark" placeholder="Search Here" value={this.state.value}
                  onChange={this.handleChange} />
                <div className="col-sm-1"></div>
                <div className="col-sm-2 mt-1">
                  <Button color="primary" onClick={this.toggle}>Add Movie</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  newMoviesInfo() {
    return (
      <div>
        <div className="col-sm-1"></div>
        <div className="col-sm-2 mt-5">
          <form ref="myform" className="myForm" >
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle} className="text-center">Add Movie</ModalHeader>
              <ModalBody>
                <div className="form-group">
                  <label>Image url*:</label>
                  <input type="text" id="name" placeholder="Enter movie image url..." ref="url" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Movie Name:*</label>
                  <input type="text" id="type" placeholder="Enter Movie name..." ref="name" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Ratings:*</label>
                  <input type="text" id="use" placeholder="Enter Movie ratings..." ref="ratings" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Likes*:</label>
                  <input type="text" id="company" placeholder="Enter Movie Likes..." ref="likes" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Year:*</label>
                  <input type="text" id="quantity" placeholder="Enter Year of Movie..." ref="year" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Movie Content:*</label>
                  <textarea type="text" id="price" rows="3" cols="3" placeholder="Enter Movie content..." ref="content" className="form-control"></textarea>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={(e) => this.submitMovieInfo(e)}>Add Detailes</Button>{' '}
                <Button color="danger" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </form>
        </div>
      </div>
    )
  }
  movieInfo() {
    return (
      this.state.taskTypes.map((movieData, index) => {
        return (
          <div className="row" key={index}>
            <div className="col-sm-10 offset-sm-1 mt-5">
              <div className="card-deck">
                <div className="col-sm-4 offset-sm-4">
                  <img src={movieData.img} width="300" className="ml-5 " alt="movieimage" onClick={() => this.showMovieInfo(movieData)} />
                </div>
                <div>
                  {
                    this.state.showComponent && this.state.movieDisplayInfo.id === movieData.id ?
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
                            <div className="row mt-3">
                              <div className="col-sm-2 offset-sm-4">
                                <button className="btn btn-primary myButton mb-3" onClick={() => this.removeMovieInfo(index)}  >Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      :
                      null
                  }
                </div>
              </div>
            </div>
          </div>
        )
      }
      )
    )
  }


  render() {
    return (
      <div>
        {this.searchInfo()}
        {this.newMoviesInfo()}
        {this.movieInfo()}
      </div>

    )
  }
}