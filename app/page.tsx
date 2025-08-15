'use client'

import { Calendar, MapPin, MessageCircle, Clock, ArrowUpRight, Navigation, Heart, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

type Language = 'en' | 'no' | 'sr'

const translations = {
	en: {
		youreInvited: "✨ You're Invited ✨",
		birthday: 'Birthday',
		subtitle: 'Join us for a magical evening of celebration 🎂💖',
		partyCountdown: 'Party Countdown',
		days: 'Days',
		hours: 'Hours',
		minutes: 'Minutes',
		seconds: 'Seconds',
		when: 'When',
		where: 'Where',
		casualParty: 'Casual & Cute Party 🎀',
		findYourWay: 'Find Your Way Here',
		getDirections: 'Get directions to the party!',
		googleMaps: 'Google Maps',
		waze: 'Waze',
		saveTheDate: 'Save the Date 📅💖',
		addToCalendar: 'Add this party to your calendar and message the host!',
		googleCalendar: 'Google Calendar',
		appleCalendar: 'Apple Calendar',
		messageHost: 'Message Host 💬',
		cantWait: "Can't wait to celebrate with you! 🎉💕",
		magical: "Let's make this birthday absolutely magical! ✨🎂",
		oslo: '📍 Oslo, Norway',
		whatsappMessage:
			"Hi! 💕 I'm interested in attending Marija's birthday party on {date} at {time}. Could you share more details? 🎉",
	},
	no: {
		youreInvited: '✨ Du er invitert ✨',
		birthday: 'Bursdag',
		subtitle: 'Bli med oss for en magisk kveld med feiring 🎂💖',
		partyCountdown: 'Nedtelling til fest',
		days: 'Dager',
		hours: 'Timer',
		minutes: 'Minutter',
		seconds: 'Sekunder',
		when: 'Når',
		where: 'Hvor',
		casualParty: 'Avslappet & Søt fest 🎀',
		findYourWay: 'Finn veien hit',
		getDirections: 'Få veibeskrivelse til festen!',
		googleMaps: 'Google Maps',
		waze: 'Waze',
		saveTheDate: 'Lagre datoen 📅💖',
		addToCalendar: 'Legg denne festen til i kalenderen din og send melding til verten!',
		googleCalendar: 'Google Kalender',
		appleCalendar: 'Apple Kalender',
		messageHost: 'Send melding til vert 💬',
		cantWait: 'Kan ikke vente med å feire med deg! 🎉💕',
		magical: 'La oss gjøre denne bursdagen helt magisk! ✨🎂',
		oslo: '📍 Oslo, Norge',
		whatsappMessage:
			'Hei! 💕 Jeg er interessert i å delta på Marijas bursdagsfest {date} klokka {time}. Kan du dele flere detaljer? 🎉',
	},
	sr: {
		youreInvited: '✨ Pozivamo te ✨',
		birthday: 'Rođendan',
		subtitle: 'Pridruži nam se za magično veče proslave 🎂💖',
		partyCountdown: 'Odbrojavanje do žurke',
		days: 'Dana',
		hours: 'Sati',
		minutes: 'Minuta',
		seconds: 'Sekundi',
		when: 'Kada',
		where: 'Gde',
		casualParty: 'Ležerna & Slatka žurka 🎀',
		findYourWay: 'Pronađi put do nas',
		getDirections: 'Dobij putanje do žurke!',
		googleMaps: 'Google Maps',
		waze: 'Waze',
		saveTheDate: 'Sačuvaj datum 📅💖',
		addToCalendar: 'Dodaj ovu žurku u kalendar i pošalji poruku domaćinu!',
		googleCalendar: 'Google Kalendar',
		appleCalendar: 'Apple Kalendar',
		messageHost: 'Pošalji poruku domaćinu 💬',
		cantWait: 'Jedva čekamo da slavimo sa tobom! 🎉💕',
		magical: 'Hajde da učinimo ovaj rođendan potpuno magičnim! ✨🎂',
		oslo: '📍 Oslo, Norveška',
		whatsappMessage:
			'Zdravo! 💕 Zanima me da dođem na Marijin rođendan {date} u {time}. Možeš li da podeliš više detalja? 🎉',
	},
}

export default function BirthdayParty() {
	const [language, setLanguage] = useState<Language>('en')
	const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	const t = translations[language]

	useEffect(() => {
		const updateWindowDimensions = () => {
			setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
		}

		updateWindowDimensions()
		window.addEventListener('resize', updateWindowDimensions)

		// Countdown timer
		const partyDate = new Date('2025-08-15T19:30:00').getTime()

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
		dateNo: 'Fredag, 15. august',
		dateSr: 'Petak, 15. avgust',
		time: '7:00 PM',
		timeNo: '19:00',
		timeSr: '19:00',
		address: 'Professor Dahls gate 7B, 0355 Oslo',
		phone: '+47 939 40 056',
	}

	const getLocalizedDate = () => {
		switch (language) {
			case 'no':
				return partyDetails.dateNo
			case 'sr':
				return partyDetails.dateSr
			default:
				return partyDetails.date
		}
	}

	const getLocalizedTime = () => {
		switch (language) {
			case 'no':
				return partyDetails.timeNo
			case 'sr':
				return partyDetails.timeSr
			default:
				return partyDetails.time
		}
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
		const message = t.whatsappMessage.replace('{date}', getLocalizedDate()).replace('{time}', getLocalizedTime())
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

	// Updated motion variants using correct Motion API
	const containerVariants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: {
			y: 30,
			opacity: 0,
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 100,
				damping: 15,
				duration: 0.6,
			},
		},
	}

	const floatingVariants = {
		animate: {
			y: [-3, 3, -3],
			transition: {
				duration: 2.5,
				repeat: Infinity,
				repeatType: 'reverse' as const,
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
				repeatType: 'reverse' as const,
				ease: 'easeInOut',
			},
		},
	}

	const languageButtonVariants = {
		hover: {
			scale: 1.05,
			transition: { type: 'spring', stiffness: 400, damping: 10 },
		},
		tap: {
			scale: 0.95,
			transition: { type: 'spring', stiffness: 400, damping: 10 },
		},
	}

	const buttonVariants = {
		hover: {
			scale: 1.05,
			transition: { type: 'spring', stiffness: 300, damping: 20 },
		},
		tap: {
			scale: 0.95,
			transition: { type: 'spring', stiffness: 300, damping: 20 },
		},
	}

	return (
		<div className='min-h-screen relative'>
			{/* Gradient Background */}
			<div className='fixed inset-0 bg-gradient-to-br from-pink-300/20 via-rose-200/30 to-pink-400/20' />
			<div className='fixed inset-0 bg-gradient-to-tl from-pink-200/10 via-transparent to-rose-300/10' />

			{/* Language Switcher */}
			<motion.div
				className='fixed top-6 right-6 z-50 flex gap-2'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5, duration: 0.6 }}
			>
				{(['en', 'no', 'sr'] as Language[]).map((lang) => (
					<motion.button
						key={lang}
						variants={languageButtonVariants}
						whileHover='hover'
						whileTap='tap'
						onClick={() => setLanguage(lang)}
						className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
							language === lang
								? 'bg-pink-500 text-white shadow-lg'
								: 'bg-white/80 backdrop-blur-sm text-pink-700 hover:bg-pink-100'
						}`}
					>
						{lang === 'en' ? '🇺🇸 EN' : lang === 'no' ? '🇳🇴 NO' : '🇷🇸 SR'}
					</motion.button>
				))}
			</motion.div>

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
						animate='animate'
					>
						<Badge className='border-pink-300 bg-white/80 backdrop-blur-sm text-pink-700 px-6 py-3 text-sm font-semibold rounded-full shadow-lg'>
							{t.youreInvited}
						</Badge>
					</motion.div>

					<AnimatePresence mode='wait'>
						<motion.h1
							key={language}
							className='text-6xl md:text-8xl font-bold tracking-tight mb-8'
							variants={itemVariants}
							initial='hidden'
							animate='visible'
							exit='hidden'
						>
							<span className='bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 bg-clip-text text-transparent'>
								Marija&apos;s
							</span>
							<br />
							<span className='text-slate-700 flex items-center justify-center gap-6'>
								<Heart className='h-16 w-16 md:h-20 md:w-20 text-pink-500 fill-pink-500' />
								{t.birthday}
								<Heart className='h-16 w-16 md:h-20 md:w-20 text-pink-500 fill-pink-500' />
							</span>
						</motion.h1>
					</AnimatePresence>

					<AnimatePresence mode='wait'>
						<motion.p
							key={`subtitle-${language}`}
							className='text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto'
							variants={itemVariants}
							initial='hidden'
							animate='visible'
							exit='hidden'
						>
							{t.subtitle}
						</motion.p>
					</AnimatePresence>
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
								{t.partyCountdown}
								<Clock className='h-6 w-6 text-pink-500' />
							</h2>

							<div className='grid sm:grid-cols-4 gap-4 max-w-2xl mx-auto'>
								<motion.div
									className='bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6 shadow-lg'
									variants={pulseVariants}
									animate='animate'
								>
									<div className='text-3xl md:text-4xl font-bold text-pink-600 mb-2'>
										{timeLeft.days}
									</div>
									<div className='text-sm font-semibold text-slate-600 uppercase tracking-wider'>
										{t.days}
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
										{t.hours}
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
										{t.minutes}
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
										{t.seconds}
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
									transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								>
									<div className='flex items-center justify-center md:justify-start gap-4 mb-6'>
										<div className='p-4 rounded-2xl bg-gradient-to-br from-pink-200 to-pink-300 shadow-lg'>
											<Calendar className='h-6 w-6 text-pink-700' />
										</div>
										<h3 className='text-lg font-bold text-pink-600 uppercase tracking-wider'>
											{t.when}
										</h3>
									</div>
									<AnimatePresence mode='wait'>
										<motion.div
											key={`date-${language}`}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.3 }}
										>
											<p className='text-3xl font-bold text-slate-800 mb-3'>
												{getLocalizedDate()}
											</p>
											<div className='flex items-center justify-center md:justify-start gap-3'>
												<Clock className='h-5 w-5 text-pink-500' />
												<p className='text-xl text-slate-600 font-semibold'>
													{getLocalizedTime()}
												</p>
											</div>
										</motion.div>
									</AnimatePresence>
								</motion.div>

								{/* Location */}
								<motion.div
									className='text-center md:text-left'
									whileHover={{ scale: 1.02 }}
									transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								>
									<div className='flex items-center justify-center md:justify-start gap-4 mb-6'>
										<div className='p-4 rounded-2xl bg-gradient-to-br from-rose-200 to-rose-300 shadow-lg'>
											<MapPin className='h-6 w-6 text-rose-700' />
										</div>
										<h3 className='text-lg font-bold text-rose-600 uppercase tracking-wider'>
											{t.where}
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
									<AnimatePresence mode='wait'>
										<motion.span
											key={`badge-${language}`}
											className='text-lg font-bold text-slate-700'
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.3 }}
										>
											{t.casualParty}
										</motion.span>
									</AnimatePresence>
									<div className='w-3 h-3 rounded-full bg-pink-500 animate-pulse' />
								</div>
							</motion.div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Map Section */}
				<motion.div
					className='mb-16'
					variants={itemVariants}
				>
					<Card className='border-0 bg-white/85 backdrop-blur-xl shadow-xl shadow-pink-200/20 rounded-3xl overflow-hidden'>
						<CardContent className='p-0'>
							{/* Map Header */}
							<div className='p-8 text-center bg-gradient-to-r from-pink-50 to-rose-50'>
								<AnimatePresence mode='wait'>
									<motion.h2
										key={`map-title-${language}`}
										className='text-3xl font-bold text-slate-700 mb-4 flex items-center justify-center gap-4'
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.3 }}
									>
										<MapPin className='h-8 w-8 text-pink-500' />
										{t.findYourWay}
										<MapPin className='h-8 w-8 text-pink-500' />
									</motion.h2>
								</AnimatePresence>
								<AnimatePresence mode='wait'>
									<motion.p
										key={`map-subtitle-${language}`}
										className='text-lg text-slate-600 font-medium'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										{t.getDirections}
									</motion.p>
								</AnimatePresence>
							</div>

							{/* Navigation Buttons */}
							<div className='p-8 pt-4 grid sm:grid-cols-2 gap-4'>
								<motion.div
									variants={buttonVariants}
									whileHover='hover'
									whileTap='tap'
								>
									<Button
										onClick={handleGoogleMaps}
										className='w-full h-14 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg border-0 group rounded-xl font-bold text-lg'
									>
										<Navigation className='h-5 w-5 mr-3' />
										<span>{t.googleMaps}</span>
										<ArrowUpRight className='h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
									</Button>
								</motion.div>

								<motion.div
									variants={buttonVariants}
									whileHover='hover'
									whileTap='tap'
								>
									<Button
										onClick={handleWaze}
										className='w-full h-14 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg border-0 group rounded-xl font-bold text-lg'
									>
										<Navigation className='h-5 w-5 mr-3' />
										<span>{t.waze}</span>
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
									transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 200 }}
								>
									<div className='px-6 py-3 rounded-full bg-white/95 backdrop-blur-sm shadow-xl border border-pink-200'>
										<AnimatePresence mode='wait'>
											<motion.span
												key={`oslo-${language}`}
												className='text-sm font-bold text-slate-700'
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.3 }}
											>
												{t.oslo}
											</motion.span>
										</AnimatePresence>
									</div>
								</motion.div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Action Buttons */}
				<motion.div
					className='mb-16'
					variants={itemVariants}
				>
					<Card className='border-0 bg-white/85 backdrop-blur-xl shadow-xl shadow-pink-200/20 rounded-3xl overflow-hidden'>
						<CardContent className='p-8'>
							<div className='text-center mb-8'>
								<AnimatePresence mode='wait'>
									<motion.h2
										key={`save-title-${language}`}
										className='text-3xl font-bold text-slate-700 mb-4'
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.3 }}
									>
										{t.saveTheDate}
									</motion.h2>
								</AnimatePresence>
								<AnimatePresence mode='wait'>
									<motion.p
										key={`save-subtitle-${language}`}
										className='text-lg text-slate-600 font-medium'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										{t.addToCalendar}
									</motion.p>
								</AnimatePresence>
							</div>

							<div className='grid md:grid-cols-2 gap-4 mb-6'>
								<motion.div
									variants={buttonVariants}
									whileHover='hover'
									whileTap='tap'
								>
									<Button
										onClick={handleGoogleCalendar}
										className='w-full h-16 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-xl border-0 group rounded-2xl font-bold text-lg cursor-pointer'
									>
										<Calendar className='h-6 w-6 mr-3' />
										<span>{t.googleCalendar}</span>
										<ArrowUpRight className='h-5 w-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
									</Button>
								</motion.div>

								<motion.div
									variants={buttonVariants}
									whileHover='hover'
									whileTap='tap'
								>
									<Button
										onClick={handleAppleCalendar}
										className='w-full h-16 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-xl border-0 group rounded-2xl font-bold text-lg cursor-pointer'
									>
										<Calendar className='h-6 w-6 mr-3' />
										<span>{t.appleCalendar}</span>
										<ArrowUpRight className='h-5 w-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
									</Button>
								</motion.div>
							</div>

							<motion.div
								variants={buttonVariants}
								whileHover='hover'
								whileTap='tap'
							>
								<Button
									onClick={handleWhatsApp}
									className='w-full h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-xl border-0 group rounded-2xl font-bold text-lg mb-6 cursor-pointer'
								>
									<MessageCircle className='h-6 w-6 mr-3' />
									<span>{t.messageHost}</span>
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
					transition={{ type: 'spring', stiffness: 300, damping: 20 }}
				>
					<div className='inline-block p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl border border-pink-200'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={`footer-${language}`}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
							>
								<p className='text-2xl font-bold text-slate-700 mb-3'>{t.cantWait}</p>
								<p className='text-lg text-slate-600 font-medium'>{t.magical}</p>
							</motion.div>
						</AnimatePresence>
					</div>
				</motion.div>
			</motion.div>
		</div>
	)
}
