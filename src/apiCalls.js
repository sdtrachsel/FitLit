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

const postHydrationInfo = (log, update, display, formReset) => {
  fetch('http://localhost:3001/api/v1/hydration', {
    method: 'POST',
    body: JSON.stringify(log),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json();
      }
    })
    .then(json => {
      update(log);
      display('success');
      formReset();
    })
    .catch(err => {
      if (err === 422) {
        display('allFields');
      } else {
        display('other');
      }
      formReset();
    });
};

export { fetchAllData, postHydrationInfo };