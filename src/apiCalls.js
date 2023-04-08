const fetchData = (url) => {
    return fetch(url)
    .then(data => data.json())
    .catch(err => console.log('error: ', err))
  }
  
  const fetchAllData = () => {
    return Promise.all([
      fetchData('https://fitlit-api.herokuapp.com/api/v1/users'),
      fetchData('https://fitlit-api.herokuapp.com/api/v1/hydration'),
      fetchData('https://fitlit-api.herokuapp.com/api/v1/sleep'),
      fetchData('https://fitlit-api.herokuapp.com/api/v1/activity')
    ])
  }
  
  export { fetchAllData }
