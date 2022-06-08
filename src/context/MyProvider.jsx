import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [resultsApi, setResultsApi] = useState([]);

  useEffect(() => {
    const apiPlanetsSearch = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      console.log(results);
      setResultsApi(results);
    };
    apiPlanetsSearch();
  }, []);

  const headerTableContext = {
    resultsApi,
    setResultsApi,
  };

  return (
    <MyContext.Provider value={ headerTableContext }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
