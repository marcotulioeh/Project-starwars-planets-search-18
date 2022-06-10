import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function Filter() {
  const {
    searchFilter,
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
    columnOpitions,
    setColumnOpitions,
  } = useContext(MyContext);

  useEffect(() => {
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
  }, [filterByName, numericFilter, resultsApi, setSeachFilter]);

  const hendleSearchFilter = ({ target }) => {
    setFilterByName({ name: target.value.toLowerCase() });
  };

  const deleteColumnOptions = () => {
    // console.log('Primeira:', columnOpitions);
    const options = columnOpitions.filter((column) => column !== columnFilter);
    setColumnOpitions(options);
    // console.log('Segunda:', columnOpitions);
  };

  const handleFilter = () => {
    const newNumericFilter = {
      columnFilter,
      operatorFilter,
      valueFilter,
    };
    deleteColumnOptions();
    setNumericFilter([...numericFilter, newNumericFilter]);

    const remove = columnOpitions.filter((column) => column !== columnFilter);
    setColumnOpitions(remove);
  };

  // console.log('Fora:', columnOpitions);

  const handleRemovFilters = () => {
    setNumericFilter([]);
    setColumnFilter(columnOpitions);
    serOperatorFilter('maior que');
    setvalueFilter(0);
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
            {columnOpitions.map((columnOpition, index) => (
              <option key={ index }>{ columnOpition }</option>))}
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
          FILTRAR
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
          ORDENAR
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={ handleRemovFilters }
          data-testid="button-remove-filters"
        >
          REMOVER FILTROS
        </button>
      </div>
    </section>
  );
}

export default Filter;
