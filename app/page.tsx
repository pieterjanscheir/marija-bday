'use client'

import { Calendar, MapPin, MessageCircle, Clock, Gift, Sparkles, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function BirthdayParty() {
	const partyDetails = {
		name: 'Marija',
		date: 'Friday, August 15th',
		time: '7:00 PM',
		address: 'Professor Dahls gate 7B, 0355 Oslo',
		phone: '+47 939 40 056',
	}

	const handleGoogleCalendar = () => {
		const startDate = '20250815T190000'
		const endDate = '20250815T230000'
		const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Marija's Birthday Party&dates=${startDate}/${endDate}&details=Join us for Marija's birthday celebration! It's going to be a casual and fun party.&location=Professor Dahls gate 7B, 0355 Oslo`
		window.open(url, '_blank')
	}

	const handleAppleCalendar = () => {
		const startDate = '20250815T190000'
		const endDate = '20250815T230000'
		const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Birthday Party//Birthday Party//EN
BEGIN:VEVENT
UID:${Date.now()}@birthdayparty.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:Marija's Birthday Party
DESCRIPTION:Join us for Marija's birthday celebration! It's going to be a casual and fun party.
LOCATION:Professor Dahls gate 7B, 0355 Oslo
END:VEVENT
END:VCALENDAR`

		const blob = new Blob([icsContent], { type: 'text/calendar' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.download = 'marija-birthday-party.ics'
		link.click()
		URL.revokeObjectURL(url)
	}

	const handleWhatsApp = () => {
		const message = `Hi! I'm interested in attending Marija's birthday party on ${partyDetails.date} at ${partyDetails.time}. Could you share more details?`
		const url = `https://wa.me/4793940056?text=${encodeURIComponent(message)}`
		window.open(url, '_blank')
	}

	return (
		<div className='min-h-screen p-4 flex items-center justify-center'>
			<div className='w-full max-w-4xl'>
				{/* Header */}
				<div className='text-center mb-8'>
					<div className='inline-flex items-center gap-2 mb-4'>
						<Sparkles className='h-8 w-8 text-pink-500' />
						<h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent'>
							Birthday Party!
						</h1>
						<Sparkles className='h-8 w-8 text-pink-500' />
					</div>
					<p className='text-xl md:text-2xl text-gray-700 font-medium'>
						You&apos;re invited to celebrate{' '}
						<span className='text-pink-600 font-bold'>{partyDetails.name}&apos;s</span> special day!
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-6'>
					{/* Party Details Card */}
					<Card className='backdrop-blur-md bg-white/30 border border-white/40 shadow-xl'>
						<CardHeader className='text-center'>
							<CardTitle className='flex items-center justify-center gap-2 text-2xl text-pink-700'>
								<Gift className='h-6 w-6' />
								Party Details
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							{/* Date & Time */}
							<div className='flex items-start gap-3 p-4 rounded-lg backdrop-blur-sm bg-pink-100/50'>
								<Calendar className='h-5 w-5 text-pink-600 mt-1' />
								<div>
									<p className='font-semibold text-gray-800'>{partyDetails.date}</p>
									<div className='flex items-center gap-2 mt-1'>
										<Clock className='h-4 w-4 text-pink-500' />
										<p className='text-gray-700'>{partyDetails.time}</p>
									</div>
								</div>
							</div>

							{/* Location */}
							<div className='flex items-start gap-3 p-4 rounded-lg backdrop-blur-sm bg-purple-100/50'>
								<MapPin className='h-5 w-5 text-purple-600 mt-1' />
								<div>
									<p className='font-semibold text-gray-800'>Location</p>
									<p className='text-gray-700'>{partyDetails.address}</p>
								</div>
							</div>

							{/* Party Type */}
							<div className='flex justify-center'>
								<Badge
									variant='secondary'
									className='bg-gradient-to-r from-pink-400/20 to-purple-400/20 text-pink-700 border-pink-300 px-4 py-2'
								>
									🎉 Casual Party 🎉
								</Badge>
							</div>

							{/* Action Buttons */}
							<div className='space-y-3'>
								<div className='grid grid-cols-2 gap-3'>
									<Button
										onClick={handleGoogleCalendar}
										className='bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0'
									>
										<Calendar className='h-4 w-4 mr-2' />
										Google Cal
									</Button>
									<Button
										onClick={handleAppleCalendar}
										variant='outline'
										className='border-pink-300 text-pink-700 hover:bg-pink-50 backdrop-blur-sm'
									>
										<Calendar className='h-4 w-4 mr-2' />
										Apple Cal
									</Button>
								</div>

								<Button
									onClick={handleWhatsApp}
									className='w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0'
								>
									<MessageCircle className='h-4 w-4 mr-2' />
									Message Host on WhatsApp
								</Button>

								<div className='flex items-center justify-center gap-2 text-sm text-gray-600'>
									<Phone className='h-4 w-4' />
									<span>{partyDetails.phone}</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Map Card */}
					<Card className='backdrop-blur-md bg-white/30 border border-white/40 shadow-xl'>
						<CardHeader className='text-center'>
							<CardTitle className='flex items-center justify-center gap-2 text-2xl text-pink-700'>
								<MapPin className='h-6 w-6' />
								Find Us Here
							</CardTitle>
						</CardHeader>
						<CardContent className='p-0'>
							<div className='relative rounded-b-lg overflow-hidden'>
								<iframe
									src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.123456789!2d10.7522!3d59.9139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e61f267f039%3A0x7e92b6a1c1b8a8a8!2sProfessor%20Dahls%20gate%207B%2C%200355%20Oslo%2C%20Norway!5e0!3m2!1sen!2sno!4v1234567890123'
									width='100%'
									height='300'
									style={{ border: 0 }}
									allowFullScreen
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
									className='w-full h-[300px]'
								/>
								<div className='absolute top-4 left-4 backdrop-blur-sm bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-gray-700'>
									📍 Oslo, Norway
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Footer */}
				<div className='text-center mt-8 p-6 backdrop-blur-md bg-white/20 rounded-lg border border-white/40'>
					<p className='text-lg text-gray-700 mb-2'>Can&apos;t wait to celebrate with you! 🎂✨</p>
					<p className='text-sm text-gray-600'>Let&apos;s make this birthday unforgettable! 💖</p>
				</div>
			</div>
		</div>
	)
}
