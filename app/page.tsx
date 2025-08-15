'use client'

import { Calendar, MapPin, MessageCircle, Clock, ArrowUpRight, Navigation, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

export default function BirthdayParty() {
	const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	useEffect(() => {
		const updateWindowDimensions = () => {
			setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
		}

		updateWindowDimensions()
		window.addEventListener('resize', updateWindowDimensions)

		// Countdown timer
		const partyDate = new Date('2025-08-15T19:00:00').getTime()

		const updateCountdown = () => {
			const now = new Date().getTime()
			const distance = partyDate - now

			if (distance > 0) {
				setTimeLeft({
					days: Math.floor(distance / (1000 * 60 * 60 * 24)),
					hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
					minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
					seconds: Math.floor((distance % (1000 * 60)) / 1000),
				})
			}
		}

		updateCountdown()
		const countdownInterval = setInterval(updateCountdown, 1000)

		return () => {
			window.removeEventListener('resize', updateWindowDimensions)
			clearInterval(countdownInterval)
		}
	}, [])

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
		const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Marija's Birthday Party 🎉&dates=${startDate}/${endDate}&details=Join us for Marija's birthday celebration! It's going to be a casual and fun party. 💖&location=Professor Dahls gate 7B, 0355 Oslo`
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
SUMMARY:Marija's Birthday Party 🎉
DESCRIPTION:Join us for Marija's birthday celebration! It's going to be a casual and fun party. 💖
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
		const message = `Hi! 💕 I'm interested in attending Marija's birthday party on ${partyDetails.date} at ${partyDetails.time}. Could you share more details? 🎉`
		const url = `https://wa.me/4793940056?text=${encodeURIComponent(message)}`
		window.open(url, '_blank')
	}

	const handleGoogleMaps = () => {
		const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(partyDetails.address)}`
		window.open(url, '_blank')
	}

	const handleWaze = () => {
		const url = `https://waze.com/ul?q=${encodeURIComponent(partyDetails.address)}&navigate=yes`
		window.open(url, '_blank')
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	}

	const itemVariants = {
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: 'easeOut',
			},
		},
	}

	const floatingVariants = {
		animate: {
			y: [-3, 3, -3],
			transition: {
				duration: 2.5,
				repeat: Infinity,
				ease: 'easeInOut',
			},
		},
	}

	const pulseVariants = {
		animate: {
			scale: [1, 1.05, 1],
			transition: {
				duration: 2,
				repeat: Infinity,
				ease: 'easeInOut',
			},
		},
	}

	return (
		<div className='min-h-screen relative'>
			{/* Gradient Background */}
			<div className='fixed inset-0 bg-gradient-to-br from-pink-300/20 via-rose-200/30 to-pink-400/20' />
			<div className='fixed inset-0 bg-gradient-to-tl from-pink-200/10 via-transparent to-rose-300/10' />

			{/* Continuous Confetti */}
			<Confetti
				width={windowDimensions.width}
				height={windowDimensions.height}
				recycle={true}
				numberOfPieces={80}
				wind={0.02}
				gravity={0.1}
				colors={['#fce7f3', '#fda4af', '#f472b6', '#ec4899', '#db2777', '#be185d']}
			/>

			<motion.div
				className='relative z-10 container mx-auto px-4 py-16 max-w-5xl'
				variants={containerVariants}
				initial='hidden'
				animate='visible'
			>
				{/* Hero Section */}
				<motion.div
					className='text-center mb-20'
					variants={itemVariants}
				>
					<motion.div
						className='inline-block mb-8'
						variants={floatingVariants}
						transition={{
							duration: 2.5,
							repeat: Infinity,
							ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeInOut
						}}
						animate='animate'
					>
						<Badge className='border-pink-300 bg-white/80 backdrop-blur-sm text-pink-700 px-6 py-3 text-sm font-semibold rounded-full shadow-lg'>
							✨ You're Invited ✨
						</Badge>
					</motion.div>

					<motion.h1
						className='text-6xl md:text-8xl font-bold tracking-tight mb-8'
						variants={itemVariants}
					>
						<span className='bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 bg-clip-text text-transparent'>
							Marija&apos;s
						</span>
						<br />
						<span className='text-slate-700 flex items-center justify-center gap-6'>
							<Heart className='h-16 w-16 md:h-20 md:w-20 text-pink-500 fill-pink-500' />
							Birthday
							<Heart className='h-16 w-16 md:h-20 md:w-20 text-pink-500 fill-pink-500' />
						</span>
					</motion.h1>

					<motion.p
						className='text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto'
						variants={itemVariants}
					>
						Join us for a magical evening of celebration 🎂💖
					</motion.p>
				</motion.div>

				{/* Countdown Timer */}
				<motion.div
					className='mb-16'
					variants={itemVariants}
				>
					<Card className='border-0 bg-white/85 backdrop-blur-xl shadow-2xl shadow-pink-200/30 rounded-3xl overflow-hidden'>
						<CardContent className='p-8 text-center'>
							<h2 className='text-2xl font-bold text-slate-700 mb-6 flex items-center justify-center gap-3'>
								<Clock className='h-6 w-6 text-pink-500' />
								Party Countdown
								<Clock className='h-6 w-6 text-pink-500' />
							</h2>

							<div className='grid grid-cols-4 gap-4 max-w-2xl mx-auto'>
								<motion.div
									className='bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6 shadow-lg'
									variants={pulseVariants}
									animate='animate'
								>
									<div className='text-3xl md:text-4xl font-bold text-pink-600 mb-2'>
										{timeLeft.days}
									</div>
									<div className='text-sm font-semibold text-slate-600 uppercase tracking-wider'>
										Days
									</div>
								</motion.div>

								<motion.div
									className='bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-6 shadow-lg'
									variants={pulseVariants}
									animate='animate'
									transition={{ delay: 0.1 }}
								>
									<div className='text-3xl md:text-4xl font-bold text-rose-600 mb-2'>
										{timeLeft.hours}
									</div>
									<div className='text-sm font-semibold text-slate-600 uppercase tracking-wider'>
										Hours
									</div>
								</motion.div>

								<motion.div
									className='bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6 shadow-lg'
									variants={pulseVariants}
									animate='animate'
									transition={{ delay: 0.2 }}
								>
									<div className='text-3xl md:text-4xl font-bold text-pink-600 mb-2'>
										{timeLeft.minutes}
									</div>
									<div className='text-sm font-semibold text-slate-600 uppercase tracking-wider'>
										Minutes
									</div>
								</motion.div>

								<motion.div
									className='bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-6 shadow-lg'
									variants={pulseVariants}
									animate='animate'
									transition={{ delay: 0.3 }}
								>
									<div className='text-3xl md:text-4xl font-bold text-rose-600 mb-2'>
										{timeLeft.seconds}
									</div>
									<div className='text-sm font-semibold text-slate-600 uppercase tracking-wider'>
										Seconds
									</div>
								</motion.div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Event Details Card */}
				<motion.div
					className='mb-16'
					variants={itemVariants}
				>
					<Card className='border-0 bg-white/85 backdrop-blur-xl shadow-2xl shadow-pink-200/30 rounded-3xl overflow-hidden'>
						<CardContent className='p-12'>
							<div className='grid md:grid-cols-2 gap-12'>
								{/* Date & Time */}
								<motion.div
									className='text-center md:text-left'
									whileHover={{ scale: 1.02 }}
									transition={{ duration: 0.2 }}
								>
									<div className='flex items-center justify-center md:justify-start gap-4 mb-6'>
										<div className='p-4 rounded-2xl bg-gradient-to-br from-pink-200 to-pink-300 shadow-lg'>
											<Calendar className='h-6 w-6 text-pink-700' />
										</div>
										<h3 className='text-lg font-bold text-pink-600 uppercase tracking-wider'>
											When
										</h3>
									</div>
									<p className='text-3xl font-bold text-slate-800 mb-3'>{partyDetails.date}</p>
									<div className='flex items-center justify-center md:justify-start gap-3'>
										<Clock className='h-5 w-5 text-pink-500' />
										<p className='text-xl text-slate-600 font-semibold'>{partyDetails.time}</p>
									</div>
								</motion.div>

								{/* Location */}
								<motion.div
									className='text-center md:text-left'
									whileHover={{ scale: 1.02 }}
									transition={{ duration: 0.2 }}
								>
									<div className='flex items-center justify-center md:justify-start gap-4 mb-6'>
										<div className='p-4 rounded-2xl bg-gradient-to-br from-rose-200 to-rose-300 shadow-lg'>
											<MapPin className='h-6 w-6 text-rose-700' />
										</div>
										<h3 className='text-lg font-bold text-rose-600 uppercase tracking-wider'>
											Where
										</h3>
									</div>
									<p className='text-xl text-slate-800 leading-relaxed font-semibold'>
										{partyDetails.address}
									</p>
								</motion.div>
							</div>

							{/* Style Badge */}
							<motion.div
								className='flex justify-center mt-12 pt-8 border-t border-pink-200'
								variants={floatingVariants}
								animate='animate'
							>
								<div className='inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 shadow-lg border border-pink-200'>
									<div className='w-3 h-3 rounded-full bg-pink-500 animate-pulse' />
									<span className='text-lg font-bold text-slate-700'>Casual & Cute Party 🎀</span>
									<div className='w-3 h-3 rounded-full bg-pink-500 animate-pulse' />
								</div>
							</motion.div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Map Section - Now comes before Action Buttons */}
				<motion.div
					className='mb-16'
					variants={itemVariants}
				>
					<Card className='border-0 bg-white/85 backdrop-blur-xl shadow-xl shadow-pink-200/20 rounded-3xl overflow-hidden'>
						<CardContent className='p-0'>
							{/* Map Header */}
							<div className='p-8 text-center bg-gradient-to-r from-pink-50 to-rose-50'>
								<h2 className='text-3xl font-bold text-slate-700 mb-4 flex items-center justify-center gap-4'>
									<MapPin className='h-8 w-8 text-pink-500' />
									Find Your Way Here
									<MapPin className='h-8 w-8 text-pink-500' />
								</h2>
								<p className='text-lg text-slate-600 font-medium'>Get directions to the party!</p>
							</div>

							{/* Navigation Buttons */}
							<div className='p-8 pt-4 grid grid-cols-2 gap-4'>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										onClick={handleGoogleMaps}
										className='w-full h-14 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg border-0 group rounded-xl font-bold text-lg'
									>
										<Navigation className='h-5 w-5 mr-3' />
										<span>Google Maps</span>
										<ArrowUpRight className='h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
									</Button>
								</motion.div>

								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										onClick={handleWaze}
										className='w-full h-14 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg border-0 group rounded-xl font-bold text-lg'
									>
										<Navigation className='h-5 w-5 mr-3' />
										<span>Waze</span>
										<ArrowUpRight className='h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
									</Button>
								</motion.div>
							</div>

							{/* Map */}
							<div className='relative h-[400px] md:h-[500px]'>
								<iframe
									src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.123456789!2d10.7522!3d59.9139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e61f267f039%3A0x7e92b6a1c1b8a8a8!2sProfessor%20Dahls%20gate%207B%2C%200355%20Oslo%2C%20Norway!5e0!3m2!1sen!2sno!4v1234567890123'
									width='100%'
									height='100%'
									style={{ border: 0 }}
									allowFullScreen
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
								/>

								{/* Map overlay */}
								<motion.div
									className='absolute top-6 left-6'
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 1, duration: 0.5 }}
								>
									<div className='px-6 py-3 rounded-full bg-white/95 backdrop-blur-sm shadow-xl border border-pink-200'>
										<span className='text-sm font-bold text-slate-700'>📍 Oslo, Norway</span>
									</div>
								</motion.div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Action Buttons - Now comes after Map */}
				<motion.div
					className='mb-16'
					variants={itemVariants}
				>
					<Card className='border-0 bg-white/85 backdrop-blur-xl shadow-xl shadow-pink-200/20 rounded-3xl overflow-hidden'>
						<CardContent className='p-8'>
							<div className='text-center mb-8'>
								<h2 className='text-3xl font-bold text-slate-700 mb-4'>Save the Date 📅💖</h2>
								<p className='text-lg text-slate-600 font-medium'>
									Add this party to your calendar and message the host!
								</p>
							</div>

							<div className='grid md:grid-cols-2 gap-4 mb-6'>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										onClick={handleGoogleCalendar}
										className='w-full h-16 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-xl border-0 group rounded-2xl font-bold text-lg cursor-pointer'
									>
										<Calendar className='h-6 w-6 mr-3' />
										<span>Google Calendar</span>
										<ArrowUpRight className='h-5 w-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
									</Button>
								</motion.div>

								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										onClick={handleAppleCalendar}
										className='w-full h-16 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-xl border-0 group rounded-2xl font-bold text-lg cursor-pointer'
									>
										<Calendar className='h-6 w-6 mr-3' />
										<span>Apple Calendar</span>
										<ArrowUpRight className='h-5 w-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
									</Button>
								</motion.div>
							</div>

							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Button
									onClick={handleWhatsApp}
									className='w-full h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-xl border-0 group rounded-2xl font-bold text-lg mb-6 cursor-pointer'
								>
									<MessageCircle className='h-6 w-6 mr-3' />
									<span>Message Host 💬</span>
									<ArrowUpRight className='h-5 w-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
								</Button>
							</motion.div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Footer Message */}
				<motion.div
					className='text-center'
					variants={itemVariants}
					whileHover={{ scale: 1.02 }}
				>
					<div className='inline-block p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl border border-pink-200'>
						<p className='text-2xl font-bold text-slate-700 mb-3'>
							Can&apos;t wait to celebrate with you! 🎉💕
						</p>
						<p className='text-lg text-slate-600 font-medium'>
							Let&apos;s make this birthday absolutely magical! ✨🎂
						</p>
					</div>
				</motion.div>
			</motion.div>
		</div>
	)
}
