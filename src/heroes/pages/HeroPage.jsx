import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { getHeroeById } from '../helpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const HeroPage = () => {
	const { id } = useParams();

	const data = useContext(DataContext);

	const [hero, setHero] = useState(null);

	const navigate = useNavigate();

	const onNavigateBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		const newHeroes = data ? getHeroeById(data, id) : [];
		setHero(newHeroes);
	}, [id]);

	if (!hero) {
		return null;
	}

	return (
		<>
			<div className="row mt-4 mb-2 gx-4">
				<div className="col col-sm-6 col-md-5 col-lg-4 d-flex">
					<button
						onClick={onNavigateBack}
						className="btn btn-secondary rounded-5 text-white fw-semibold mt-2 mb-sm-2">
						Go Back
					</button>
				</div>
				<div className="col col-sm-6 col-md-7 col-lg-8 d-flex" />
			</div>
			<div className="row mb-3 mt-0 ">
				<div className="col-sm-12 col-md-5 col-lg-4 d-flex flex-column align-items-center justify-content-center  animate__animated animate__fadeInLeft">
					<LazyLoadImage
						className="img-thumbnail border-3 "
						style={{ minHeight: '330px', borderColor: (hero.biography.alignment == 'bad' ? 'rgb(255, 109, 109)' : 'rgb(14, 149, 94)')}}
						effect="blur"
						src={hero.images.sm}
						alt={hero.name}
					/>
				</div>

				<div className=" px-3 px-md-4 px-md-5 col-sm-12 col-md-7 col-lg-8 animate__animated animate__fadeInRight d-flex flex-column justify-content-center pt-4 pb-4">
					<div className="d-flex justify-content-around align-items-center">
						<h2 className="animate__animated animate__slideInDown fw-bold m-0">
							{hero.name}
						</h2>
						<span>
							Combat Score: &nbsp;
							<strong className="fs-4">{hero.powerstats.combat}</strong>
						</span>
					</div>
					<hr className="border-2"
					style={{borderColor: (hero.biography.alignment == 'bad' ? 'RGB(209, 56, 56)' : 'green')}} />
					<ul className="list-group list-group-flush">
						{hero.biography.publisher == '' ? (
							''
						) : (
							<li className="list-group-item">
								Publisher: &nbsp;
								<strong>{hero.biography.publisher}</strong>
							</li>
						)}

						{hero.biography.firstAppearance == '-' ? (
							''
						) : (
							<li className="list-group-item">
								First Appearence: &nbsp;
								<strong>{hero.biography.firstAppearance}</strong>
							</li>
						)}
						<br />

						{hero.biography.fullName == '' ? (
							''
						) : (
							<li className="list-group-item">
								Full Name: &nbsp;
								<strong>{hero.biography.fullName}</strong>
							</li>
						)}

						{hero.biography.alignment == '-' ? (
							''
						) : (
							<li className="list-group-item">
								Alignment: &nbsp;
								<strong style={{color: (hero.biography.alignment == 'bad' ? 'rgb(209, 56, 56)' : 'green')}}>{hero.biography.alignment.toUpperCase()}</strong>
							</li>
						)}

						{hero.biography.alterEgos == 'No alter egos found.' ? (
							''
						) : (
							<li className="list-group-item">
								Alter Egos: &nbsp;
								<strong>{hero.biography.alterEgos}</strong>
							</li>
						)}

						{hero.biography.aliases == '-' ? (
							''
						) : (
							<li className="list-group-item">
								Aliases: &nbsp;
								<strong>{hero.biography.aliases.join(', ')}</strong>
							</li>
						)}
						<br />

						{hero.appearance.race == null &&
						hero.appearance.gender == '-' ? (
							''
						) : (
							<li className="list-group-item">
								{hero.appearance.race == null ? (
									''
								) : (
									<span>
										Race: &nbsp;
										<strong>{hero.appearance.race}</strong>
										&nbsp;&nbsp;&nbsp;
									</span>
								)}	

								{hero.appearance.gender == '-' ? (
									''
								) : (
									<span>
										Gender: &nbsp;
										<strong>{hero.appearance.gender}</strong>
									</span>
								)}
							</li>
						)}

						{hero.appearance.height[0] == '-' &&
						hero.appearance.weight[0] == '- lb' ? (
							''
						) : (
							<li className="list-group-item">
								{hero.appearance.height[0] == '-' ? (
									''
								) : (
									<span>
										Height: &nbsp;
										<strong>{hero.appearance.height[1]}</strong>
										&nbsp;&nbsp;&nbsp;
									</span>
									
								)}
								
								{hero.appearance.weight[0] == '- lb' ? (
									''
								) : (
									<span>
										Weight: &nbsp;
										<strong>{hero.appearance.weight[1]}</strong>
									</span>
								)}
							</li>
						)}

						<br />
					</ul>
				</div>
			</div>
		</>
	);
};
