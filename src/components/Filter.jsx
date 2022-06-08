import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function Filter() {
  const {
    // searchFilter,
    setSeachFilter,
    resultsApi,
    filterByName,
    setFilterByName,
  } = useContext(MyContext);

  useEffect(() => {
    const filterApi = resultsApi.filter((result) => (
      result.name.toLowerCase().includes(filterByName)
    ));
    setSeachFilter(filterApi);
  }, [filterByName]);

  const hendleSearchFilter = ({ target }) => {
    setFilterByName(target.value.toLowerCase());
  };

  return (
    <section>
      <div>
        <input
          type="text"
          onChange={ hendleSearchFilter }
          data-testid="name-filter"
        />
      </div>
      <div>
        <label htmlFor="column">
          Coluna:
          <select id="column" name="colum" data-testid="column-filter">
            <option value="population">Population</option>
            <option value="orbital_period">Orbital Period</option>
            <option value="diameter">Diameter</option>
            <option value="rotation_period">Rotation Period</option>
            <option value="surface_water">Surface Water</option>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="maior">
          Operador:
          <select id="maior" name="comparison" data-testid="comparison-filter">
            <option value="menor que">Menor que</option>
            <option value="maior que">Maior que</option>
            <option value="igual a">Igual à</option>
          </select>
        </label>
      </div>
      <div>
        <input name="value" type="number" data-testid="value-filter" value="0" />
        <button type="button" data-testid="button-filter">
          Filtrar
        </button>
      </div>
      <div>
        <label htmlFor="sort">
          Ordenar:
          <select id="sort" name="column" data-testid="column-sort">
            <option name="column" value="population">Population</option>
            <option name="column" value="orbital_period">Orbital Period</option>
            <option name="column" value="diameter">Diameter</option>
            <option name="column" value="rotation_period">Rotation Period</option>
            <option name="column" value="surface_water">Surface Water</option>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="ascendente">
          Ascendente
          <input type="radio" name="" id="ascendente" />
        </label>
        <label htmlFor="descendente">
          Descendente
          <input type="radio" name="" id="descendente" />
        </label>
      </div>
      <div>
        <button type="button" data-testid="column-sort-button">
          Ordenar
        </button>
      </div>
    </section>
  );
}

export default Filter;
