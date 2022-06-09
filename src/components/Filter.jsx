import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function Filter() {
  const {
    // searchFilter,
    setSeachFilter,
    resultsApi,
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
  } = useContext(MyContext);

  useEffect(() => {
    console.log(resultsApi);
    const filterApi = resultsApi.filter((result) => (
      result.name.toLowerCase().includes(filterByName.name)
    ));

    const resultFilterArray = numericFilter.reduce((acc, currValue) => acc
      .filter((planet) => {
        switch (currValue.operatorFilter) {
        case 'maior que':
          return Number(planet[currValue.columnFilter]) > Number(currValue.valueFilter);
        case 'menor que':
          console.log('Ele Aqui:', Number(planet[currValue.columnFilter]));
          return Number(planet[currValue.columnFilter]) < Number(currValue.valueFilter);
        case 'igual a':
          return Number(planet[currValue.columnFilter]) === Number(currValue.valueFilter);
        default:
          return true;
        }
      }), filterApi);

    setSeachFilter(resultFilterArray);
  }, [filterByName, numericFilter]);

  const hendleSearchFilter = ({ target }) => {
    setFilterByName({ name: target.value.toLowerCase() });
  };

  const handleFilter = () => {
    const newNumericFilter = {
      columnFilter,
      operatorFilter,
      valueFilter,
    };
    setNumericFilter([...numericFilter, newNumericFilter]);
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
          <select
            onChange={ ({ target }) => setColumnFilter(target.value) }
            data-testid="column-filter"
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="maior">
          Operador:
          <select
            onChange={ ({ target }) => serOperatorFilter(target.value) }
            data-testid="comparison-filter"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <input
          type="number"
          value={ valueFilter }
          placeholder="0"
          onChange={ ({ target }) => setvalueFilter(target.value) }
          data-testid="value-filter"
        />
        <button
          type="button"
          onClick={ handleFilter }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </div>

      <div>
        <label htmlFor="sort">
          Ordenar:
          <select data-testid="column-sort">
            <option>Population</option>
            <option>Orbital Period</option>
            <option>Diameter</option>
            <option>Rotation Period</option>
            <option>Surface Water</option>
          </select>
        </label>
        <label htmlFor="ascendente">
          Ascendente
          <input type="radio" name="" id="ascendente" />
        </label>
        <label htmlFor="descendente">
          Descendente
          <input type="radio" name="" id="descendente" />
        </label>
        <button type="button" data-testid="column-sort-button">
          Ordenar
        </button>
      </div>
    </section>
  );
}

export default Filter;
