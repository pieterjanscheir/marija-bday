import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: "Marija's Birthday Party 🎉",
	description: "Join us for Marija's magical birthday celebration on Friday, August 15th at 7pm in Oslo! 💖✨",
	openGraph: {
		title: "Marija's Birthday Party 🎉",
		description: "Join us for Marija's magical birthday celebration on Friday, August 15th at 7pm in Oslo! 💖✨",
		type: 'website',
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className='min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 antialiased'>
				{children}
			</body>
		</html>
	)
}
