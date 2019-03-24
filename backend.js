function connectToServer(nameAndScore){
  axios.post('http://localhost:3001/notes', nameAndScore)
    .then(response => {
      console.log(response)
    })
}
