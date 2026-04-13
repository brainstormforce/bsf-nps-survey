import { NpsRating, Comment, PluginRating } from '../steps';
import useStore from '../../store/store.js';
import { XMarkIcon } from '@heroicons/react/20/solid';
import {
	cn,
	handleCloseNpsSurvey,
	handleNpsSurveyApi,
} from '../../utils/helper.js';
import { useEffect, useState } from 'react';

export const getScreenWidthBreakPoint = () => {
	const width = window.innerWidth;

	/** Tailwind CSS breakpoints */
	const breakpoints = {
		/** ExtraSmall */
		xs: 512,
		/** Small */
		sm: 640,
		/** Medium */
		md: 768,
		/** Large */
		lg: 1024,
		/** Extra Large */
		xl: 1280,
		/** 2x Extra Large */
		'2xl': 1536,
	};

	/**
	 *  Iterate through the breakpoints and return the first one
	 *  where the width is less than or equal to the breakpoint.
	 */
	for ( const breakpoint in breakpoints ) {
		if ( width <= breakpoints[ breakpoint ] ) {
			return breakpoint;
		}
	}
};

const NpsDialog = ( props ) => {
	const {
		plugin_slug,
		dismiss_timespan,
		npsId,
		popup = {
			placement: 'bottom-right',
		},
		show_overlay = false,
	} = props;

	const store = useStore( ( state ) => state );

	const { dispatch } = useStore();

	const { showNps, currentStep, npsRating } = store[ npsId ];

	const [ processing, setProcessing ] = useState( false );
	const [ breakpoint, setBreakpoint ] = useState(
		getScreenWidthBreakPoint()
	);

	useEffect( () => {
		const handleResize = () => {
			setBreakpoint( getScreenWidthBreakPoint() );
		};
		window.addEventListener( 'resize', handleResize );
		return () => {
			window.removeEventListener( 'resize', handleResize );
		};
	}, [] );

	const getPosition = () => {
		const spacing = 8; // common spacing for all sides
		let hSpace = spacing + 'px'; // setting extra spacing for higher screen sizes

		// removing spaces for smaller screens
		if ( 'xs' === breakpoint ) {
			hSpace = 4;
		}

		// position styling object.
		const position = {};

		// Parse popup placement to get vertical and horizontal positions
		const [ verticalPos, horizontalPos = 'center' ] = popup?.placement
			? popup?.placement.split( '-' )
			: [ 'bottom', 'right' ];

		// Set vertical position
		if ( verticalPos === 'top' ) {
			position.top = spacing + 'px';
		} else if ( verticalPos === 'center' ) {
			position.top = '50%';
			position.translate = '0 -50%';
		} else {
			// Default to bottom
			position.bottom = spacing + 'px';
		}

		// Set horizontal position with RTL compatibility
		const isRtl = document.documentElement.dir === 'rtl';

		// Position mapping with RTL support - no if statements needed
		const positions = {
			left: isRtl ? 'right' : 'left',
			right: isRtl ? 'left' : 'right',
			center: 'center',
		};

		const selectedPosition = positions[ horizontalPos ] || positions.right;

		if ( selectedPosition === 'center' ) {
			position.left = '50%';
			position.transform = 'translateX(-50%)';
		} else {
			position[ selectedPosition ] = hSpace;
		}

		return position;
	};

	const renderStep = () => {
		if ( 'nps-rating' === currentStep ) {
			return <NpsRating { ...props } />;
		}

		if ( 'comment' === currentStep ) {
			return <Comment { ...props } />;
		}

		if ( 'plugin-rating' === currentStep ) {
			return <PluginRating { ...props } />;
		}
	};

	const closeNpsSurvey = function () {
		if ( processing ) {
			return;
		}

		if ( npsRating && currentStep === 'plugin-rating' ) {
			handleNpsSurveyApi(
				npsId,
				npsRating,
				'',
				'plugin-rating',
				dispatch,
				setProcessing,
				plugin_slug
			);
		}

		handleCloseNpsSurvey(
			npsId,
			dispatch,
			currentStep,
			dismiss_timespan,
			plugin_slug
		);
	};

	if ( ! showNps ) {
		return;
	}

	return (
		<>
			{ /* Overlay for the dialog */ }
			{ show_overlay && (
				<div className="nps-survey-overlay fixed inset-0 bg-[#111827BF]/75 z-[999999999]"></div>
			) }

			<div
				className={ cn(
					currentStep === 'comment'
						? 'max-w-[36em]'
						: 'max-w-[30rem]',
					'xs:w-full w-[calc(100%-8px)] flex bg-white rounded-lg fixed z-[9999999999] right-2 p-4 sm:p-5 border border-solid border-border-tertiary shadow-lg box-border'
				) }
				style={ getPosition() }
			>
				<div
					className={ cn(
						'w-full',
						processing && 'opacity-50 cursor-progress'
					) }
				>
					{ renderStep() }
				</div>
				<span
					className="absolute top-3 right-3 left-auto cursor-pointer"
					onClick={ closeNpsSurvey }
				>
					<XMarkIcon
						className="h-5 w-5 text-zip-app-inactive-icon"
						aria-hidden="true"
					/>
				</span>
			</div>
		</>
	);
};

export default NpsDialog;
