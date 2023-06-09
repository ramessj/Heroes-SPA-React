import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks';
import { HeroCard } from '../components';
import { getHeroesByName } from '../helpers';
import { DataContext } from '../context/DataContext';

export const SearchPage = () => {
	
	const data = useContext(DataContext)


	const [heroes, setHeroes] = useState([]);

	const navigate = useNavigate();

	const location = useLocation();

	const { q = '' } = queryString.parse(location.search);

	useEffect(() => {
    function fetchHeroes() {
			const result = data?  getHeroesByName(data, q) : [];
			setHeroes(result);
		}
		fetchHeroes();
	}, [q]);

	const showSearch = q.length === 0;

	const showError = q.length > 0 && heroes.length === 0;

	const { searchText, onInputChange } = useForm({
		searchText: q,
	});

	const onSearchSubmit = (e) => {
		e.preventDefault();

		navigate(`?q=${searchText}`);
	};

	return (
		<>
			<h1 className="mt-3">Search</h1>
			<hr />

			<div className="col">
				<div className=" mb-3 animate__animated animate__fadeIn">
					<form onSubmit={onSearchSubmit}>
						<input
							required
							className="form-control"
							type="text"
							placeholder="Search a hero"
							name="searchText"
							autoComplete="off"
							value={searchText}
							onChange={onInputChange}
						/>

						<button className="btn btn-outline-primary mt-3">
							Search
						</button>
					</form>
				</div>

				<div>
					<h4>Results</h4>
					<hr />

					<div
						className="alert alert-primary animate__animated animate__flipInX"
						style={{ display: showSearch ? '' : 'none' }}>
						Search a hero
					</div>

					<div
						className="alert alert-danger animate__animated animate__lightSpeedInRight"
						style={{ display: showError ? '' : 'none' }}>
						No results for <b>{q}</b>
					</div>

					<div
						className="row row-cols-lg-3 mb-5 row-cols-md-2 row-cols-1 g-3 animate__animated animate__fadeInRight animate__faster justify-content-center"
						style={{ display: showSearch ? 'none' : '' }}>
						{heroes.map((heroe) => (
							<HeroCard key={heroe.id} {...heroe} />
						))}{' '}
						.
					</div>
				</div>
			</div>
		</>
	);
};
