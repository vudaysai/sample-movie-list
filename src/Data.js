import React from 'react';
import { fetchJsonData } from './data/http.js';
import { Router, navigate } from "@reach/router";
import MoviesList from './MoviesList';
import MovieDetails from './MovieDetails';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const data = [
	{ id: 'img', placeholder: 'Enter movie image url...', label: 'Image url*' }, { id: 'title', placeholder: 'Enter Movie name...', label: 'Move Name*' },
	{ id: 'likes', placeholder: 'Enter Movie Likes...', label: 'Likes' }, { id: 'year', placeholder: 'Enter Year of Movie...', label: 'Year Of Movie' },
	{ id: 'rating', placeholder: 'Enter Movie ratings...', label: 'Movie Ratings' }]

export default class Data extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			jsonMoviesData: [], movieDetails: '', modal: false, act: 0, showComponent: false, taskTypes: [], suggestions: [],
			newMovie: { id: 1, img: '', title: '', rating: '', likes: '', content: '', year: '', movie: [] }
		}
		this.removeMovieInfo = this.removeMovieInfo.bind(this);
		this.editMovieInfo = this.editMovieInfo.bind(this);
		this.closeMovieInfo = this.closeMovieInfo.bind(this);
		this.toggle = this.toggle.bind(this);
		this.dataChange = this.dataChange.bind(this);
		this.submitMovieInfo = this.submitMovieInfo.bind(this);
	}

	componentDidMount() {
		fetchJsonData().then(data => {
			console.log(data)
			this.setState({
				jsonMoviesData: data, movieDetails: data
			})
		})
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	submitMovieInfo = (e) => {
		e.preventDefault();
		const { movieDetails, newMovie, modal } = this.state


		if (this.state.act === 0) {
			movieDetails.push(newMovie);
		}
		else {
			let newmovieIndex = movieDetails.findIndex(movie => movie.id === newMovie.id)
			movieDetails.splice(newmovieIndex, 1, newMovie)
		}

		this.setState({
			movieDetails: movieDetails,
			taskTypes: movieDetails, modal: !modal,
			newMovie: { id: 2, img: '', title: '', rating: '', likes: '', content: '', year: '' },
		})

	}

	dataChange(e) {
		const { newMovie } = this.state
		this.setState({
			newMovie: { ...newMovie, [e.target.id]: e.target.value }
		});
	}

	componentWillReceiveProps() {
		let jsonMoviesData = this.state.jsonMoviesData
		this.setState({
			jsonMoviesData: jsonMoviesData
		})
	}

	removeMovieInfo = (id) => {
		let movieDetails = [...this.state.jsonMoviesData];
		debugger
		let movieIndex = movieDetails.findIndex(movie => movie.id === id)
		if (movieIndex !== -1) {
			movieDetails.splice(movieIndex, 1);
			this.setState({
				jsonMoviesData: movieDetails
			}, () => { navigate('/') });
		}
	}

	editMovieInfo = (id) => {
		let movieIndex = this.state.movieDetails.findIndex(movie => movie.id === id);
		this.setState({ act: 1, newMovie: this.state.movieDetails[movieIndex], modal: !this.state.modal });
	}

	closeMovieInfo = () => {
		this.setState({
			showComponent: false,
		}, () => { navigate('/') });
	}

	newMoviesInfo() {
		const { newMovie } = this.state
		return (
			<div>
				<div className="col-sm-1"></div>
				<div className="col-sm-2 mt-5">
					<form ref="myform" className="myForm" >
						<Modal isOpen={this.state.modal} toggle={this.toggle}>
							<ModalHeader toggle={this.toggle} className="text-center">Add Movie</ModalHeader>
							<ModalBody>
								{
									data.map(({ id, label, placeholder }, i) => {
										return (
											<div className="form-group" key={i}>
												<label> {label}</label>
												<input type="text" id={id} placeholder={placeholder} className="form-control" onChange={this.dataChange} value={newMovie[id]} />
											</div>
										)
									})
								}
								<div className="form-group">
									<label>Movie Content:*</label>
									<textarea type="text" id="content" rows="3" cols="3" placeholder="Enter Movie content..." className="form-control" onChange={this.dataChange} value={newMovie.content}></textarea>
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

	render() {
		return (
			<div>
				{this.newMoviesInfo()}
				<Router>
					<MoviesList path="/" movieData={this.state.jsonMoviesData} addData={this.toggle} openModal={this.state.modal} />
					<MovieDetails path="MovieDetails" remove={this.removeMovieInfo} edit={this.editMovieInfo} close={this.closeMovieInfo} movieData={this.state.jsonMoviesData} />
				</Router>
			</div>
		)
	}
}