import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import spinner from '../public/Spinner.svg'

export const HeroCard = ({ id, name, images }) => {
	

	return (
		<div className="col" style={{ maxWidth: '10rem' }}>
			<Link to={`/heroe/${id}`} className="text-decoration-none">
				<div className="card cardhover">
					<div className="col no-gutters d-flex flex-column justify-content-center">
						<LazyLoadImage
							className="card-img-top"
							style={{ height: '220px', width: '142px' }}
							threshold={500}
							effect="opacity"
							placeholderSrc={spinner}
							src={images.sm}
							alt={name}
						/>

						<p
							className="card-title fw-bolder text-nowrap d-flex justify-content-center my-2 p-1"
							style={{ fontSize: '0.9rem' }}>
							{name}
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};
