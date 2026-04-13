module.exports = {
	content: [ './src/**/*.{jsx,js}' ],
	theme: {
		extend: {
			colors: {
				'accent-st': 'rgb(var(--accent-st) / <alpha-value>)',
				'accent-hover-st':
					'rgb(var(--accent-hover-st) / <alpha-value>)',
				'accent-st-secondary': '#2563EB',
				'ecommerce-badge': '#D1FAE5',
				'ecommerce-text': '#064E3B',
				'ecommerce-border': '#A7F3D0',
				'accent-wp-primary': '#0073AA',
				'accent-wp-primary-alt': '#70CFFF',
				'accent-wp-secondary': '#00A0D2',
				'border-line-inactive': '#C2CAD6',
				'heading-text': '#030712',
				'body-text': '#374151',
				'secondary-text': '#9CA3AF',
				'disabled-text': '#D1D5DB',
				'nav-active': '#111827',
				'nav-inactive': '#374151',
				'background-primary': '#FFFFFF',
				'background-secondary': '#F3F4F6',
				'background-tertiary': '#F0F0FF',
				'border-primary': '#D1D5DB',
				'border-secondary': '#6B7280',
				'border-tertiary': '#D8DFE9',
				'step-connector': '#E2E8F0',
				'icon-primary': '#5A03EF',
				'icon-secondary': '#374151',
				'alert-info': '#3B82F6',
				'alert-info-bg': '#EFF6FF',
				'alert-info-text': '#3D4592',
				'alert-success': '#22C55E',
				'alert-success-bg': '#F0FDF4',
				'alert-success-text': '#16a34a',
				'alert-warning': '#FACC15',
				'alert-warning-bg': '#FEFCE8',
				'alert-warning-text': '#ca8a04',
				'alert-error': 'rgb(var(--zip-alert-error) / <alpha-value>)', //#EF4444
				'alert-error-bg': '#FEF2F2',
				'alert-error-text': '#dc2626',
				favorite: '#FD3997',
				tooltip: '#334155',
				'credit-warning': '#FB7E0A',
				'credit-danger': '#EA1522',
				'button-disabled': '#E5E7EB',
				'blue-crayola': 'rgb(var(--zip-blue-crayola) / <alpha-value>)', // '#3D4592,
				'zip-body-text': 'rgb(var(--zip-body-text) / <alpha-value>)',
				'zip-app-highlight-bg':
					'rgb(var(--zip-app-highlight-bg) / <alpha-value>)',
				'zip-app-heading':
					'rgb(var(--zip-app-heading) / <alpha-value>)',
				'zip-dark-theme-heading':
					'rgb(var(--zip-dark-theme-heading) / <alpha-value>)',
				'zip-dark-theme-content-background':
					'rgb(var(--zip-dark-theme-content-background) / <alpha-value>)',
				'zip-dark-theme-body':
					'rgb(var(--zip-dark-theme-body) / <alpha-value>)',
				'zip-dark-theme-border':
					'rgb(var(--zip-dark-theme-border) / <alpha-value>)',
				'zip-dark-theme-icon-active':
					'rgb(var(--zip-dark-theme-icon-active) / <alpha-value>)',
				'zip-dark-theme-bg':
					'rgb(var(--zip-dark-theme-bg) / <alpha-value>)',
				'zip-light-border-primary':
					'rgb(var(--zip-light-border-primary) / <alpha-value>)',
				'zip-app-border-hover':
					'rgb(var(--zip-app-border-hover) / <alpha-value>)',
				'gradient-color-1': '#B809A7',
				'gradient-color-2': '#E90B76',
				'gradient-color-3': '#FC8536',
				'gradient-2':
					'linear-gradient(180deg, #B809A7 0%, #E90B76 46.88%, #FC8536 100%)',
				'step-gradient':
					'linear-gradient(to bottom, #FFF 0%, #0000FF 100%)',
				'zip-app-inactive-icon':
					'rgb(var(--zip-app-inactive-icon) / <alpha-value>)',
				'zip-app-light-bg':
					'rgb(var(--zip-app-light-bg) / <alpha-value>)',
				'st-background-secondary': '#f7f7f9',
				'outline-color':
					'rgb(var( --accent-st-tertiary ) / <alpha-value>)', //#FF580E
				'preview-background': '#F2F4F7',
				'nps-button-background': '#2271B1',
			},
			backgroundImage: {
				'gradient-1':
					'linear-gradient(90deg, #B809A7 0%, #E90B76 46.88%, #FC8536 100%)',
				'gradient-2':
					'linear-gradient(180deg, #B809A7 0%, #E90B76 46.88%, #FC8536 100%)',
			},
			animation: {
				rotate: 'rotation 7s linear infinite',
			},
			fontFamily: {
				sans: [ 'Figtree', 'sans-serif' ],
			},
			maxWidth: {
				container: '48rem',
			},
			boxShadow: {
				small: '0px 2px 4px -2px rgba(0, 0, 0, 0.06), 0px 4px 8px -2px rgba(0, 0, 0, 0.10)',
				medium: '0px 4px 6px -2px rgba(0, 0, 0, 0.03), 0px 12px 16px -4px rgba(0, 0, 0, 0.08)',
				xlarge: '0px 24px 48px -12px rgba(0, 0, 0, 0.10)',
				'action-buttons': '0px 0px 40px -8px rgba(0, 0, 0, 0.20)',
				card: '0px 24px 64px -16px rgba(0, 0, 0, 0.16)',
				error: '0px 1px 1px 0px #EF4444, 0px 0px 0px 1px #EF4444',
				sm: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
				'template-preview': '0px 40px 120px -16px rgba(0, 0, 0, 0.30)',
				'template-info': '0px -20px 25px -5px rgba(0, 0, 0, 0.10)',
			},
			gradientColorStopPositions: {
				0: '0%',
				46.88: '46.88%',
				100: '100%',
			},
			screens: {
				xs: '512px',
			},
		},
	},
	corePlugins: {
		preflight: false,
	},
	important: '.nps-survey-root',
	plugins: [
		require( '@tailwindcss/forms' ),
		require( '@tailwindcss/typography' ),
	],
};
