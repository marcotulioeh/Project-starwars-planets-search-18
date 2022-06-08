import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { resultsApi } = useContext(MyContext);

  return (
    <table>
      <thead>
        <tr>
          <th>climate</th>
          <th>created</th>
          <th>diameter</th>
          <th>edited</th>
          <th>films</th>
          <th>gravity</th>
          <th>name</th>
          <th>orbital_period</th>
          <th>population</th>
          <th>residents</th>
          <th>rotation_period</th>
          <th>surface_water</th>
          <th>terrain</th>
        </tr>
      </thead>
      <tbody>
        {resultsApi.map((result) => (
          <tr key={ result.name }>
            <td>{result.climate}</td>
            <td>{result.created}</td>
            <td>{result.diameter}</td>
            <td>{result.edited}</td>
            <td>{result.films}</td>
            <td>{result.gravity}</td>
            <td>{result.name}</td>
            <td>{result.orbital_period}</td>
            <td>{result.population}</td>
            <td>{result.residents}</td>
            <td>{result.rotation_period}</td>
            <td>{result.surface_water}</td>
            <td>{result.terrain}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
