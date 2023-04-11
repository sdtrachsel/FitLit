const fetchData = (url) => {
    return fetch(url)
    .then(data => data.json())
    .catch(err => console.log('error: ', err))
  }
  
  const fetchAllData = () => {
    return Promise.all([
      fetchData('http://localhost:3001/api/v1/users'),
      fetchData('http://localhost:3001/api/v1/hydration'),
      fetchData('http://localhost:3001/api/v1/sleep'),
      fetchData('http://localhost:3001/api/v1/activity')
    ])
  }
  
  export { fetchAllData }
