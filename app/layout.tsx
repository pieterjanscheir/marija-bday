import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: "Marija's Birthday Party 🎉",
	description: "Join us for Marija's birthday celebration on Friday, August 15th at 7pm in Oslo!",
	openGraph: {
		title: "Marija's Birthday Party 🎉",
		description: "Join us for Marija's birthday celebration on Friday, August 15th at 7pm in Oslo!",
		type: 'website',
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className='min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100'>
				<div className='min-h-screen bg-gradient-to-br from-pink-400/20 via-purple-300/10 to-indigo-300/20'>
					{children}
				</div>
			</body>
		</html>
	)
}
