'use client'

import { Calendar, MapPin, MessageCircle, Clock, ArrowUpRight, Navigation, Heart, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

type Language = 'en' | 'no' | 'sr' | 'nl' | 'uk'

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
		doorbell: 'Doorbell',
		doorbellInfo: 'Ring at: 3.Høyre',
		dresscode: 'Dress Code',
		dresscodeInfo: 'Casual Cutesy 👗✨',
		drinks: 'Drinks',
		drinksInfo: 'BYOB - Bring your own! 🥤',
		gifts: 'Gifts',
		giftsInfo: 'No gifts please, just BYOB! 💕',
		casualParty: 'Casual & Cute Party 🎀',
		findYourWay: 'Find Your Way Here',
		getDirections: 'Get directions to the party!',
		googleMaps: 'Google Maps',
		waze: 'Waze',
		saveTheDate: 'Save the Date 📅💖',
		addToCalendar: 'Add this party to your calendar!',
		googleCalendar: 'Google Calendar',
		appleCalendar: 'Apple Calendar',
		musicAndContact: 'Music & Contact 🎵💬',
		playlistTitle: 'Party Playlist',
		playlistSubtitle: 'Listen to our curated playlist and feel free to add your favorite songs!',
		contactHost: 'Contact Host',
		contactSubtitle: 'Have questions or need more info? Message Marija directly!',
		messageHost: 'Message on WhatsApp 💬',
		cantWait: "Can't wait to celebrate with you! 🎉💕",
		magical: "Let's make this birthday absolutely magical! ✨🎂",
		oslo: '📍 Oslo, Norway',
		whatsappMessage: 'Hi Marija! 💕 I have a question about your birthday party. Hope to see you soon! 🎉',
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
		doorbell: 'Ringeklokke',
		doorbellInfo: 'Ring på: 3.Høyre',
		dresscode: 'Antrekk',
		dresscodeInfo: 'Avslappet & Søt 👗✨',
		drinks: 'Drikke',
		drinksInfo: 'Ta med egen drikke! 🥤',
		gifts: 'Gaver',
		giftsInfo: 'Ingen gaver takk, bare ta med drikke! 💕',
		casualParty: 'Avslappet & Søt fest 🎀',
		findYourWay: 'Finn veien hit',
		getDirections: 'Få veibeskrivelse til festen!',
		googleMaps: 'Google Maps',
		waze: 'Waze',
		saveTheDate: 'Lagre datoen 📅💖',
		addToCalendar: 'Legg denne festen til i kalenderen din!',
		googleCalendar: 'Google Kalender',
		appleCalendar: 'Apple Kalender',
		musicAndContact: 'Musikk & Kontakt 🎵💬',
		playlistTitle: 'Fest spilleliste',
		playlistSubtitle: 'Lytt til vår kuraterte spilleliste og legg gjerne til dine favorittsanger!',
		contactHost: 'Kontakt vert',
		contactSubtitle: 'Har du spørsmål eller trenger mer info? Send melding til Marija direkte!',
		messageHost: 'Send melding på WhatsApp 💬',
		cantWait: 'Kan ikke vente med å feire med deg! 🎉💕',
		magical: 'La oss gjøre denne bursdagen helt magisk! ✨🎂',
		oslo: '📍 Oslo, Norge',
		whatsappMessage: 'Hei Marija! 💕 Jeg har et spørsmål om bursdagsfesten din. Håper å se deg snart! 🎉',
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
		doorbell: 'Zvono',
		doorbellInfo: 'Zvoni na: 3.Høyre',
		dresscode: 'Dress kod',
		dresscodeInfo: 'Ležerno & Slatko 👗✨',
		drinks: 'Piće',
		drinksInfo: 'Donesi svoje piće! 🥤',
		gifts: 'Pokloni',
		giftsInfo: 'Molimo bez poklona, samo donesi piće! 💕',
		casualParty: 'Ležerna & Slatka žurka 🎀',
		findYourWay: 'Pronađi put do nas',
		getDirections: 'Dobij putanje do žurke!',
		googleMaps: 'Google Maps',
		waze: 'Waze',
		saveTheDate: 'Sačuvaj datum 📅💖',
		addToCalendar: 'Dodaj ovu žurku u kalendar!',
		googleCalendar: 'Google Kalendar',
		appleCalendar: 'Apple Kalendar',
		musicAndContact: 'Muzika & Kontakt 🎵💬',
		playlistTitle: 'Žurka plejlista',
		playlistSubtitle: 'Slušaj našu kuriranu plejlistu i slobodno dodaj svoje omiljene pesme!',
		contactHost: 'Kontaktiraj domaćina',
		contactSubtitle: 'Imaš pitanja ili trebaš više informacija? Pošalji poruku Mariji direktno!',
		messageHost: 'Pošalji poruku na WhatsApp 💬',
		cantWait: 'Jedva čekamo da slavimo sa tobom! 🎉💕',
		magical: 'Hajde da učinimo ovaj rođendan potpuno magičnim! ✨🎂',
		oslo: '📍 Oslo, Norveška',
		whatsappMessage:
			'Zdravo Marija! 💕 Imam pitanje o tvojoj rođendanskoj žurci. Nadam se da ću te uskoro videti! 🎉',
	},
	nl: {
		youreInvited: '✨ Je bent uitgenodigd ✨',
		birthday: 'Verjaardag',
		subtitle: 'Kom bij ons voor een magische avond vol viering 🎂💖',
		partyCountdown: 'Aftelling naar het feest',
		days: 'Dagen',
		hours: 'Uren',
		minutes: 'Minuten',
		seconds: 'Seconden',
		when: 'Wanneer',
		where: 'Waar',
		doorbell: 'Deurbel',
		doorbellInfo: 'Bel aan bij: 3.Høyre',
		dresscode: 'Dresscode',
		dresscodeInfo: 'Casual & Schattig 👗✨',
		drinks: 'Drankjes',
		drinksInfo: 'Breng je eigen drankjes mee! 🥤',
		gifts: 'Cadeaus',
		giftsInfo: 'Geen cadeaus alsjeblieft, alleen drankjes! 💕',
		casualParty: 'Casual & Leuk feest 🎀',
		findYourWay: 'Vind je weg naar hier',
		getDirections: 'Krijg routebeschrijving naar het feest!',
		googleMaps: 'Google Maps',
		waze: 'Waze',
		saveTheDate: 'Bewaar de datum 📅💖',
		addToCalendar: 'Voeg dit feest toe aan je agenda!',
		googleCalendar: 'Google Agenda',
		appleCalendar: 'Apple Agenda',
		musicAndContact: 'Muziek & Contact 🎵💬',
		playlistTitle: 'Feest afspeellijst',
		playlistSubtitle: 'Luister naar onze samengestelde afspeellijst en voeg gerust je favoriete nummers toe!',
		contactHost: 'Contact gastheer',
		contactSubtitle: 'Heb je vragen of heb je meer info nodig? Stuur Marija een direct bericht!',
		messageHost: 'Stuur bericht op WhatsApp 💬',
		cantWait: 'Kunnen niet wachten om met je te vieren! 🎉💕',
		magical: 'Laten we deze verjaardag helemaal magisch maken! ✨🎂',
		oslo: '📍 Oslo, Noorwegen',
		whatsappMessage: 'Hallo Marija! 💕 Ik heb een vraag over je verjaardagsfeest. Hoop je snel te zien! 🎉',
	},
	uk: {
		youreInvited: '✨ Ти запрошений ✨',
		birthday: 'День народження',
		subtitle:
			'Приєднуйся до нас на магічний вечір святкування! Я так сумую за тобою, Олексе, і дуже рада, що ти приїдеш на мій день народження! 🎂💖✨',
		partyCountdown: 'Зворотний відлік до вечірки',
		days: 'Днів',
		hours: 'Годин',
		minutes: 'Хвилин',
		seconds: 'Секунд',
		when: 'Коли',
		where: 'Де',
		doorbell: 'Дзвінок',
		doorbellInfo: 'Дзвони: 3.Høyre',
		dresscode: 'Дрес-код',
		dresscodeInfo: 'Казуальний і милий 👗✨',
		drinks: 'Напої',
		drinksInfo: 'Принеси свої напої! 🥤',
		gifts: 'Подарунки',
		giftsInfo: 'Без подарунків, будь ласка, тільки напої! 💕',
		casualParty: 'Казуальна і мила вечірка 🎀',
		findYourWay: 'Знайди дорогу сюди',
		getDirections: 'Отримай маршрут до вечірки!',
		googleMaps: 'Google Maps',
		waze: 'Waze',
		saveTheDate: 'Збережи дату 📅💖',
		addToCalendar: 'Додай цю вечірку до свого календаря!',
		googleCalendar: 'Google Календар',
		appleCalendar: 'Apple Календар',
		musicAndContact: 'Музика і Контакти 🎵💬',
		playlistTitle: 'Плейлист вечірки',
		playlistSubtitle: 'Слухай наш підібраний плейлист і додавай свої улюблені пісні!',
		contactHost: "Зв'язатися з господарем",
		contactSubtitle: 'Маєш питання або потрібна додаткова інформація? Напиши Марії!',
		messageHost: 'Написати в WhatsApp 💬',
		cantWait: 'Не можу дочекатися святкувати з тобою, дорогий Олексе! 🎉💕',
		magical: 'Давай зробимо цей день народження по-справжньому магічним! ✨🎂',
		oslo: '📍 Осло, Норвегія',
		whatsappMessage: 'Привіт Маріє! 💕 У мене є питання про твій день народження. Сподіваюся побачитися скоро! 🎉',
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

		// Countdown timer - Updated to 19:30
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
		dateNl: 'Vrijdag, 15 augustus',
		dateUk: "П'ятниця, 15 серпня",
		time: '7:30 PM',
		timeNo: '19:30',
		timeSr: '19:30',
		timeNl: '19:30',
		timeUk: '19:30',
		address: 'Professor Dahls gate 7B, 0355 Oslo',
		phone: '+47 939 40 056',
	}

	const getLocalizedDate = () => {
		switch (language) {
			case 'no':
				return partyDetails.dateNo
			case 'sr':
				return partyDetails.dateSr
			case 'nl':
				return partyDetails.dateNl
			case 'uk':
				return partyDetails.dateUk
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
			case 'nl':
				return partyDetails.timeNl
			case 'uk':
				return partyDetails.timeUk
			default:
				return partyDetails.time
		}
	}

	const handleGoogleCalendar = () => {
		// Updated calendar times to 19:30
		const startDate = '20250815T193000'
		const endDate = '20250815T233000'
		const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Marija's Birthday Party 🎉&dates=${startDate}/${endDate}&details=Join us for Marija's birthday celebration! It's going to be a casual and fun party. BYOB - Bring your own drinks! No gifts please. Ring doorbell: 3.Høyre 💖&location=Professor Dahls gate 7B, 0355 Oslo`
		window.open(url, '_blank')
	}

	const handleAppleCalendar = () => {
		// Updated calendar times to 19:30
		const startDate = '20250815T193000'
		const endDate = '20250815T233000'
		const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Birthday Party//Birthday Party//EN
BEGIN:VEVENT
UID:${Date.now()}@birthdayparty.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:Marija's Birthday Party 🎉
DESCRIPTION:Join us for Marija's birthday celebration! It's going to be a casual and fun party. BYOB - Bring your own drinks! No gifts please. Ring doorbell: 3.Høyre 💖
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
		const message = t.whatsappMessage
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

	const getLanguageFlag = (lang: Language) => {
		switch (lang) {
			case 'en':
				return '🇺🇸 EN'
			case 'no':
				return '🇳🇴 NO'
			case 'sr':
				return '🇷🇸 SR'
			case 'nl':
				return '🇧🇪 NL'
			case 'uk':
				return '🇺🇦 UK'
			default:
				return lang as Language
		}
	}

	return (
		<div className='min-h-screen relative'>
			{/* Gradient Background */}
			<div className='fixed inset-0 bg-gradient-to-br from-pink-300/20 via-rose-200/30 to-pink-400/20' />
			<div className='fixed inset-0 bg-gradient-to-tl from-pink-200/10 via-transparent to-rose-300/10' />

			{/* Always visible confetti with absolute positioning */}
			<div className='fixed inset-0 pointer-events-none z-40'>
				<Confetti
					width={windowDimensions.width}
					height={windowDimensions.height}
					recycle={true}
					numberOfPieces={80}
					wind={0.02}
					gravity={0.1}
					colors={['#fce7f3', '#fda4af', '#f472b6', '#ec4899', '#db2777', '#be185d']}
				/>
			</div>

			{/* Language Switcher */}
			<motion.div
				className='fixed top-6 right-6 z-50 flex gap-2 flex-wrap'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5, duration: 0.6 }}
			>
				{(['en', 'no', 'sr', 'nl', 'uk'] as Language[]).map((lang) => (
					<motion.button
						key={lang}
						variants={languageButtonVariants}
						whileHover='hover'
						whileTap='tap'
						onClick={() => setLanguage(lang)}
						className={`px-3 py-2 rounded-full font-semibold text-xs transition-colors ${
							language === lang
								? 'bg-pink-500 text-white shadow-lg'
								: 'bg-white/80 backdrop-blur-sm text-pink-700 hover:bg-pink-100'
						}`}
					>
						{getLanguageFlag(lang)}
					</motion.button>
				))}
			</motion.div>

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

							<div className='grid grid-cols-3 gap-4 max-w-2xl mx-auto'>
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
							<div className='grid md:grid-cols-2 gap-12 mb-12'>
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
									<p className='text-xl text-slate-800 leading-relaxed font-semibold mb-4'>
										{partyDetails.address}
									</p>
									<div className='text-sm text-slate-600 font-medium'>
										<span className='font-bold text-rose-600'>{t.doorbell}:</span> {t.doorbellInfo}
									</div>
								</motion.div>
							</div>

							{/* Party Info Grid */}
							<div className='grid sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8'>
								{/* Dress Code */}
								<motion.div
									className='text-center p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 lg:col-span-2'
									whileHover={{ scale: 1.05 }}
									transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								>
									<h4 className='text-sm font-bold text-pink-600 uppercase tracking-wider mb-2'>
										{t.dresscode}
									</h4>
									<p className='text-slate-700 font-semibold'>{t.dresscodeInfo}</p>
								</motion.div>

								{/* Drinks */}
								<motion.div
									className='text-center p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 lg:col-span-2'
									whileHover={{ scale: 1.05 }}
									transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								>
									<h4 className='text-sm font-bold text-rose-600 uppercase tracking-wider mb-2'>
										{t.drinks}
									</h4>
									<p className='text-slate-700 font-semibold'>{t.drinksInfo}</p>
								</motion.div>

								{/* Gifts */}
								<motion.div
									className='text-center p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 lg:col-span-2'
									whileHover={{ scale: 1.02 }}
									transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								>
									<h4 className='text-sm font-bold text-pink-600 uppercase tracking-wider mb-2'>
										{t.gifts}
									</h4>
									<p className='text-slate-700 font-semibold'>{t.giftsInfo}</p>
								</motion.div>
							</div>
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

				{/* Save the Date Section */}
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

							{/* Calendar Buttons */}
							<div className='grid md:grid-cols-2 gap-4'>
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
						</CardContent>
					</Card>
				</motion.div>

				{/* Music & Contact Section */}
				<motion.div
					className='mb-16'
					variants={itemVariants}
				>
					<Card className='border-0 bg-white/85 backdrop-blur-xl shadow-xl shadow-pink-200/20 rounded-3xl overflow-hidden'>
						<CardContent className='p-8'>
							<div className='text-center mb-8'>
								<AnimatePresence mode='wait'>
									<motion.h2
										key={`music-contact-title-${language}`}
										className='text-3xl font-bold text-slate-700 mb-4'
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.3 }}
									>
										{t.musicAndContact}
									</motion.h2>
								</AnimatePresence>
							</div>

							<div className='grid lg:grid-cols-2 gap-8'>
								{/* Playlist Section */}
								<div className='space-y-6'>
									<div className='text-center lg:text-left'>
										<AnimatePresence mode='wait'>
											<motion.h3
												key={`playlist-title-${language}`}
												className='text-2xl font-bold text-pink-600 mb-3 flex items-center justify-center lg:justify-start gap-3'
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.3 }}
											>
												<Music className='h-6 w-6' />
												{t.playlistTitle}
											</motion.h3>
										</AnimatePresence>
										<AnimatePresence mode='wait'>
											<motion.p
												key={`playlist-subtitle-${language}`}
												className='text-slate-600 font-medium mb-6'
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.3 }}
											>
												{t.playlistSubtitle}
											</motion.p>
										</AnimatePresence>
									</div>

									{/* Spotify Embed */}
									<motion.div
										className='rounded-xl overflow-hidden shadow-lg'
										whileHover={{ scale: 1.02 }}
										transition={{ type: 'spring', stiffness: 300, damping: 20 }}
									>
										<iframe
											style={{ borderRadius: '12px' }}
											src='https://open.spotify.com/embed/playlist/0dnNZVkOVfiROcygf2D0XB?utm_source=generator'
											width='100%'
											height='352'
											frameBorder='0'
											allowFullScreen
											allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
											loading='lazy'
										/>
									</motion.div>
								</div>

								{/* Contact Section */}
								<div className='space-y-6 flex flex-col justify-center'>
									<div className='text-center lg:text-left'>
										<AnimatePresence mode='wait'>
											<motion.h3
												key={`contact-title-${language}`}
												className='text-2xl font-bold text-rose-600 mb-3 flex items-center justify-center lg:justify-start gap-3'
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.3 }}
											>
												<MessageCircle className='h-6 w-6' />
												{t.contactHost}
											</motion.h3>
										</AnimatePresence>
										<AnimatePresence mode='wait'>
											<motion.p
												key={`contact-subtitle-${language}`}
												className='text-slate-600 font-medium mb-6'
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.3 }}
											>
												{t.contactSubtitle}
											</motion.p>
										</AnimatePresence>
									</div>

									<motion.div
										variants={buttonVariants}
										whileHover='hover'
										whileTap='tap'
									>
										<Button
											onClick={handleWhatsApp}
											className='w-full h-16 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-xl border-0 group rounded-2xl font-bold text-lg cursor-pointer'
										>
											<MessageCircle className='h-6 w-6 mr-3' />
											<span>{t.messageHost}</span>
											<ArrowUpRight className='h-5 w-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
										</Button>
									</motion.div>

									<div className='text-center lg:text-left text-sm text-slate-600 bg-pink-50 p-4 rounded-xl border border-pink-200'>
										<span className='font-semibold'>📞 {partyDetails.phone}</span>
									</div>
								</div>
							</div>
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
