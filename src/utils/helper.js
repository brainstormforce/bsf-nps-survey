import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import apiFetch from '@wordpress/api-fetch';

export const cn = ( ...classNames ) => twMerge( clsx( classNames ) );

export const handleCloseNpsSurvey = async function (
	npsId,
	dispatch,
	step,
	dismiss_timespan,
	pluginSlug
) {
	try {
		const response = await apiFetch( {
			path: '/nps-survey/v1/dismiss-nps-survey',
			method: 'POST',
			headers: {
				'X-WP-Nonce': nps_survey_data.rest_api_nonce,
				'Content-Type': 'application/json',
			},
			data: {
				nps_id: npsId,
				plugin_slug: pluginSlug,
				current_step: step,
				dismiss_timespan,
			},
		} );

		if ( response.success ) {
			console.info( 'NPS Survey dismissed!' );
			dispatch( {
				npsId,
				type: 'SET_SHOW_NPS',
				payload: false,
			} );
		}
	} catch ( error ) {
		console.error( error );
	}
};

export const handleNpsSurveyApi = async function (
	npsId,
	npsRating,
	feedback,
	step,
	dispatch,
	setProcessing,
	pluginSlug
) {
	try {
		setProcessing( true );
		const response = await apiFetch( {
			path: 'nps-survey/v1/rating',
			method: 'POST',
			headers: {
				'X-WP-Nonce': nps_survey_data.rest_api_nonce,
				'Content-Type': 'application/json',
			},
			data: {
				nps_id: npsId,
				plugin_slug: pluginSlug,
				rating: npsRating,
				comment: feedback,
			},
		} );

		if ( response.success ) {
			if ( '' === step ) {
				dispatch( {
					npsId,
					type: 'SET_SHOW_NPS',
					payload: false,
				} );
			}
			dispatch( {
				npsId,
				type: 'SET_CURRENT_STEP',
				payload: step,
			} );
		}
		setProcessing( false );
	} catch ( error ) {
		console.error( error );
	}
};

export const handleBack = ( npsId, event, dispatch, processing ) => {
	event.preventDefault();

	if ( processing ) {
		return;
	}

	dispatch( {
		npsId,
		type: 'SET_CURRENT_STEP',
		payload: 'nps-rating',
	} );
};
