import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import useStore from '../../store/store.js';
import {
	cn,
	handleBack,
	handleCloseNpsSurvey,
	handleNpsSurveyApi,
} from '../../utils/helper.js';
import Button from '../button';
import { HeadingContent, HeadingTitle } from '../dialog';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

const PluginRating = function ( props ) {
	const {
		message: {
			feedback_title,
			feedback_content,
			plugin_rating_link,
			plugin_rating_button_string,
		},
		dismiss_timespan,
		plugin_slug,
		npsId,
	} = props;

	const store = useStore( ( state ) => state );

	const { currentStep, npsRating } = store[ npsId ];

	const [ processing, setProcessing ] = useState( false );

	const { dispatch } = useStore();

	const handlePluginRating = async function ( openReview = true ) {
		handleNpsSurveyApi(
			npsId,
			npsRating,
			'',
			'plugin-rating',
			dispatch,
			setProcessing,
			plugin_slug
		);

		handleCloseNpsSurvey(
			npsId,
			dispatch,
			currentStep,
			dismiss_timespan,
			plugin_slug
		);

		if ( openReview ) {
			window.open( plugin_rating_link, '_blank' );
		}
	};

	return (
		<div className={ cn( processing && 'opacity-50 cursor-progress' ) }>
			<div className="flex justify-between">
				<HeadingTitle>{ feedback_title }</HeadingTitle>
			</div>
			<HeadingContent>{ feedback_content }</HeadingContent>
			<div className="flex justify-between mt-5">
				<Button
					className="relative border-none py-2 px-4 pl-0 font-semibold bg-transparent text-nps-button-background"
					variant="primary"
					onClick={ ( event ) =>
						handleBack( npsId, event, dispatch )
					}
					size="small"
				>
					<ArrowLeftIcon className="w-4" />
					{ __( 'Back', 'nps-survey' ) }
				</Button>
				<div className="flex justify-start">
					<Button
						variant="link"
						className="py-2 px-4 no-underline font-normal"
						type="button"
						onClick={ () => handlePluginRating( false ) }
						size="small"
					>
						{ __( 'I already did!', 'nps-survey' ) }
					</Button>
					<Button
						variant="primary"
						className="py-2 px-4 font-semibold hover:text-white"
						type="button"
						onClick={ handlePluginRating }
						size="small"
					>
						{ plugin_rating_button_string ||
							__( 'Rate the Plugin', 'nps-survey' ) }
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PluginRating;
