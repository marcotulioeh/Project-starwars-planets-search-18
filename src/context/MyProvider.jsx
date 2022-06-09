import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [resultsApi, setResultsApi] = useState([]);
  const [searchFilter, setSeachFilter] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [columnFilter, setColumnFilter] = useState('population');
  const [operatorFilter, serOperatorFilter] = useState('maior que');
  const [valueFilter, setvalueFilter] = useState(0);
  const [numericFilter, setNumericFilter] = useState([]);

  useEffect(() => {
    const apiPlanetsSearch = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      // console.log('results aqui:', results);
      setResultsApi(results);
      setSeachFilter(results);
    };
    apiPlanetsSearch();
  }, []);

  const headerTableContext = {
    resultsApi,
    setResultsApi,
    searchFilter,
    setSeachFilter,
    filterByName,
    setFilterByName,
    columnFilter,
    setColumnFilter,
    operatorFilter,
    serOperatorFilter,
    valueFilter,
    setvalueFilter,
    numericFilter,
    setNumericFilter,
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
