import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import Filter from './Filter';
import { INITIAL_COLUMN } from '../context/MyProvider';

function Table() {
  const { searchFilter,
    numericFilter,
    setNumericFilter,
    setColumnOpitions,
    // columnOpitions,
  } = useContext(MyContext);

  const handleDelete = (index) => {
    const delet = numericFilter.filter((numerc, filterIndex) => filterIndex !== index);
    console.log(numericFilter);
    setNumericFilter(delet);
    const filterDelet = delet.map((filter) => filter.columnFilter);
    const resetColumn = INITIAL_COLUMN.filter((column) => !filterDelet.includes(column));
    setColumnOpitions(resetColumn);
  };

  // console.log('Numeric aqui:', numericFilter);

  return (
    <>
      <Filter />
      {numericFilter.map((filter, index) => (
        <div key={ `${filter.columnFilter} - ${index}` } data-testid="filter">
          {`${filter.columnFilter} ${filter.operatorFilter} ${filter.valueFilter}`}
          <button type="button" onClick={ () => handleDelete(index) }>
            x
          </button>
        </div>
      ))}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {searchFilter.map((result) => (
            <tr key={ result.name }>
              <td>{result.name}</td>
              <td>{result.rotation_period}</td>
              <td>{result.orbital_period}</td>
              <td>{result.diameter}</td>
              <td>{result.climate}</td>
              <td>{result.gravity}</td>
              <td>{result.terrain}</td>
              <td>{result.surface_water}</td>
              <td>{result.population}</td>
              <td>{result.films}</td>
              <td>{result.created}</td>
              <td>{result.edited}</td>
              <td>{result.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
