const fetchJsonData = () => {
  return fetch('http://172.16.0.140:3005/api/v3/users/faq')
    .then(response => response.json())
    .then(jsonMoviesData => {
      return jsonMoviesData;
    })
    .catch(error => console.log(error))
}
module.exports = { fetchJsonData }
