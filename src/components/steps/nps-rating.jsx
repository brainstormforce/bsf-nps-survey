import useStore from '../../store/store.js';
import HeadingContent from '../dialog/heading-content.jsx';
import HeadingTitle from '../dialog/heading-title.jsx';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

const NpsRating = function ( props ) {
	const {
		allow_review = false,
		message: {
			logo,
			plugin_name,
			nps_rating_title,
			nps_rating_message,
			rating_min_label,
			rating_max_label,
		},
		npsId,
	} = props;

	const { dispatch } = useStore();
	const ratings = Array.from( { length: 10 }, ( _, i ) => i + 1 );
	const [ selectedRating, setSelectedRating ] = useState( null );

	const handleRatingResponse = async function ( number ) {
		if ( selectedRating !== null ) {
			return; // Prevent multiple submissions
		}
		setSelectedRating( number );

		dispatch( {
			npsId,
			type: 'SET_NPS_RATING',
			payload: number,
		} );

		if ( allow_review && number >= 8 ) {
			dispatch( {
				npsId,
				type: 'SET_CURRENT_STEP',
				payload: 'plugin-rating',
			} );
		} else {
			dispatch( {
				npsId,
				type: 'SET_CURRENT_STEP',
				payload: 'comment',
			} );
		}
	};

	return (
		<div>
			<div className="flex items-center justify-start gap-2">
				<img className="size-6" src={ logo } alt="Brand Logo" />
				<HeadingTitle>{ nps_rating_title || plugin_name }</HeadingTitle>
			</div>
			<HeadingContent>
				{ nps_rating_message.replaceAll( '#pluginname', plugin_name ) }
			</HeadingContent>
			<div className="mt-5">
				<span className="isolate inline-flex gap-2 w-full">
					{ ratings.map( ( number ) => (
						<button
							type="button"
							key={ number }
							onClick={ () => handleRatingResponse( number ) }
							className="relative flex-1 inline-flex items-center justify-center bg-white py-1.5 text-sm font-medium text-nps-button-text hover:bg-gray-50 focus:z-10 border border-solid border-button-disabled rounded-md transition-colors ease-in-out duration-150 hover:cursor-pointer"
						>
							{ number }
						</button>
					) ) }
				</span>
			</div>
			<div className="mt-3 flex items-center justify-between">
				<span className="text-secondary-text text-xs font-medium leading-5">
					{ rating_min_label || __( 'Very unlikely', 'nps-survey' ) }
				</span>
				<span className="text-secondary-text text-xs font-medium leading-5">
					{ rating_max_label || __( 'Very likely', 'nps-survey' ) }
				</span>
			</div>
		</div>
	);
};

export default NpsRating;
