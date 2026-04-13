import { useState } from '@wordpress/element';
import useStore from '../../store/store.js';
import { HeadingTitle, HeadingContent } from '../dialog';
import Button from '../button';
import LoadingSpinner from '../loading-spinner';
import { cn, handleBack, handleNpsSurveyApi } from '../../utils/helper.js';
import { __, sprintf } from '@wordpress/i18n';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

const Comment = function ( props ) {
	const {
		message: {
			feedback_title,
			feedback_content,
			plugin_rating_title,
			plugin_rating_content,
		},
		plugin_slug,
		privacy_policy = {
			disable: false,
			url: null,
		},
		npsId,
	} = props;
	const [ feedback, setFeedback ] = useState( '' );
	const store = useStore( ( state ) => state );
	const { npsRating } = store[ npsId ];
	const [ processing, setProcessing ] = useState( false );
	const [ showError, setShowError ] = useState( false );

	const { dispatch } = useStore();

	const handleCommentChange = ( event ) => {
		setFeedback( event.target.value );
		if ( showError ) {
			setShowError( ! event.target.value );
		}
	};

	const handleCommentResponse = async function ( event ) {
		event.preventDefault();

		if ( processing ) {
			return;
		}

		// Validate that comment is required for ratings 6 or below
		// Must have at least 50 characters
		if ( npsRating <= 6 && feedback.trim().length < 50 ) {
			setShowError( true );
			return;
		}

		handleNpsSurveyApi(
			npsId,
			npsRating,
			feedback,
			'',
			dispatch,
			setProcessing,
			plugin_slug
		);
	};

	const isPositiveFeedback = npsRating >= 8;
	const privacyPolicyText = __( 'Privacy Policy', 'nps-survey' );
	const isCommentRequired = npsRating <= 6;
	const MIN_CHARS = 50;
	const currentCharCount = feedback.trim().length;

	return (
		<div>
			<div className="flex justify-between">
				<HeadingTitle>
					{ isPositiveFeedback
						? feedback_title
						: plugin_rating_title }
				</HeadingTitle>
			</div>
			<HeadingContent>
				{ isPositiveFeedback
					? feedback_content
					: plugin_rating_content }
			</HeadingContent>
			<div className="mt-5">
				<form onSubmit={ handleCommentResponse }>
					<div className="mt-2">
						<textarea
							rows={ 6 }
							cols={ 65 }
							name="comment"
							id="comment"
							className={ cn(
								'block w-full rounded-md py-1.5 text-zip-body-text shadow-sm border border-solid placeholder:text-nps-placeholder-text focus:ring-1 focus:ring-nps-button-background sm:text-sm sm:leading-6',
								showError
									? 'border-red-500 focus:ring-red-500'
									: 'border-border-nps-primary'
							) }
							value={ feedback }
							onChange={ handleCommentChange }
							aria-required={ isCommentRequired }
							aria-invalid={ showError }
						/>
						{ showError && isCommentRequired && (
							<p className="mt-1 text-sm text-red-600">
								{ __(
									'Please share at least 50 characters so we can better understand what needs improvement and make things better for you and other users.',
									'nps-survey'
								) }
							</p>
						) }
						{ isCommentRequired &&
							! showError &&
							currentCharCount > 0 &&
							currentCharCount < MIN_CHARS && (
								<p className="mt-1 text-sm text-gray-500">
									{ currentCharCount } / { MIN_CHARS }{ ' ' }
									{ __(
										'characters (minimum)',
										'nps-survey'
									) }
								</p>
							) }
					</div>

					<div className="mt-3 flex justify-between">
						<Button
							className="relative border-none py-2 px-4 pl-0 font-semibold bg-transparent text-nps-button-background"
							variant="primary"
							onClick={ ( event ) =>
								handleBack( npsId, event, dispatch, processing )
							}
							size="small"
						>
							<ArrowLeftIcon className="w-4" />
							{ __( 'Back', 'nps-survey' ) }
						</Button>
						<Button
							className="relative py-2 px-4 font-semibold hover:text-white"
							variant="primary"
							type="submit"
							size="small"
						>
							{ processing && (
								<span className="absolute inset-0 inline-flex items-center justify-center">
									<LoadingSpinner />
								</span>
							) }
							<span className={ cn( processing && 'invisible' ) }>
								{ __( 'Submit', 'nps-survey' ) }
							</span>
						</Button>
					</div>

					{ /* Privacy Policy Notice */ }
					{ ! privacy_policy?.disable && (
						<div
							className="mt-1 translate-y-2.5 text-[.625rem] leading-normal text-gray-400 text-right"
							dangerouslySetInnerHTML={ {
								__html:
									privacy_policy?.custom ||
									sprintf(
										// translators: %s: `Privacy Policy` text with link
										__(
											'By submitting, you agree to our %s',
											'nps-survey'
										),
										privacy_policy?.url
											? `<a href="${ privacy_policy?.url }" target="_blank" rel="noopener noreferrer" class="text-inherit underline focus:shadow-none">${ privacyPolicyText }</a>`
											: privacyPolicyText
									),
							} }
						/>
					) }
				</form>
			</div>
		</div>
	);
};

export default Comment;
