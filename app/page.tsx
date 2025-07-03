"use client"

import 'swiper/css';
import 'swiper/css/pagination';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Star, Truck, Shield, Award, Users, ChevronUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
}

// Animated component wrapper
function AnimatedSection({ children, className = "", variant = fadeInUp }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={variant.initial}
      animate={isInView ? variant.animate : variant.initial}
      transition={variant.transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function MyarsHalalMarket() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      >
        <div className="container flex h-24 items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Logo - Moved outside animated container */}
          <div className="flex items-center space-x-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white font-bold text-lg shadow-lg border-2 border-green-200">
              <img
                src="https://i.imgur.com/nVGQTd0.png"
                alt="Myar's Halal Meat Market Logo"
                className="h-18 w-18 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800 leading-tight">Myar's Halal Meat & Grill</h1>
              <p className="text-sm text-green-600 font-medium">Premium Halal Meats</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-16">
            {["Home", "Products", "Menu", "Tesimonials", "About"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-base font-medium hover:text-green-600 transition-colors relative group"
                >
                  {item}
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Call Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-lg px-12 py-6">
              <Phone className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </motion.div>
        </div>
      </motion.header>


      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-26 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 relative">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      🏆 Modesto's #1 Halal Market
                    </Badge>
                  </motion.div>
                  <motion.h1
                    className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <span className="text-green-800">Premium Halal</span>
                    <br />
                    <motion.span
                      className="text-emerald-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      Meat & Grill
                    </motion.span>
                  </motion.h1>
                  <motion.p
                    className="text-xl text-gray-600 max-w-[600px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    Fresh halal meats AND delicious hot food made daily! From our butcher shop to our grill, serving the
                    Modesto community with quality you can trust since day one.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-lg px-8 transition-all duration-300"
                    >
                      Shop Now
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50 text-lg px-8 transition-all duration-300"
                    >
                      View Menu
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }} className="relative">
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 transition-all duration-300">
                      🔥 Hot Food Menu
                    </Button>
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                    />
                  </motion.div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-6 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.4 + i * 0.1, duration: 0.3 }}
                        >
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-sm font-medium">4.9/5 Rating</span>
                  </motion.div>
                  <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">500+ Happy Customers</span>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 p-8"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src="https://i.imgur.com/jfy6jbq.jpeg"
                    alt="Fresh halal meat display"
                    width={500}
                    height={500}
                    className="rounded-xl object-cover w-full h-full"
                  />
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
                    >
                      <Shield className="h-8 w-8 text-green-600" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-sm">100% Halal Certified</p>
                      <p className="text-xs text-gray-600">Trusted & Verified</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
            <AnimatedSection className="text-center mb-16">
              <Badge className="bg-green-100 text-green-800 mb-4">About Myar's</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Your Trusted Halal Meat Source in Modesto
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                For years, we've been committed to providing the freshest, highest-quality halal meats to our community.
                Every cut is carefully selected and prepared according to Islamic guidelines.
              </p>
            </AnimatedSection>

            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Shield,
                  title: "100% Halal",
                  desc: "All our meats are certified halal and prepared according to Islamic law",
                },
                {
                  icon: Award,
                  title: "Premium Quality",
                  desc: "Hand-selected cuts from trusted suppliers ensuring the best quality",
                },
                {
                  icon: Truck,
                  title: "Fresh Daily",
                  desc: "Fresh deliveries daily to ensure you get the freshest meat possible",
                },
                {
                  icon: Users,
                  title: "Family Owned",
                  desc: "A family business serving the Modesto community with care and dedication",
                },
              ].map((item, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="text-center border-green-100 hover:shadow-lg transition-all duration-300 group">
                    <CardHeader>
                      <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.6 }}>
                        <item.icon className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:text-green-700 transition-colors" />
                      </motion.div>
                      <CardTitle className="text-green-800 group-hover:text-green-900 transition-colors">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="products" className="py-20 bg-green-50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
            <AnimatedSection className="text-center mb-16">
              <Badge className="bg-green-100 text-green-800 mb-4">Our Products</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Premium Halal Meat Selection</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From tender beef to fresh chicken, we offer a complete selection of halal meats for all your cooking
                needs.
              </p>
            </AnimatedSection>
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  bg: "from-red-100 to-red-200",
                  title: "Premium Beef",
                  desc: "Fresh cuts including ribeye, sirloin, ground beef, and more",
                  badge: "Fresh Daily",
                  image: "https://i.imgur.com/hgs4Neh.png"
                },
                {
                  bg: "from-yellow-100 to-yellow-200",
                  title: "Fresh Chicken",
                  desc: "Whole chickens, breasts, thighs, wings, and ground chicken",
                  badge: "Farm Fresh",
                  image: "https://i.imgur.com/XgLSmzJ.png"
                },
                {
                  bg: "from-purple-100 to-purple-200",
                  title: "Lamb & Goat",
                  desc: "Premium lamb chops, leg of lamb, and fresh goat meat",
                  badge: "Premium Cut",
                  image: "https://i.imgur.com/FJVeJnD.png"
                },
              ].map((product, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 group">
                    <motion.div
                      className={`aspect-video bg-gradient-to-br ${product.bg}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </motion.div>
                    <CardHeader>
                      <CardTitle className="text-green-800 group-hover:text-green-900 transition-colors">
                        {product.title}
                      </CardTitle>
                      <CardDescription>{product.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary">{product.badge}</Badge>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50 transition-all duration-300"
                          >
                            View Selection
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Hot Food Menu Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
            <AnimatedSection className="text-center mb-16">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }}
              >
                <Badge className="bg-red-100 text-red-800 mb-4">🔥 Fresh & Hot</Badge>
              </motion.div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Myar's Grill & Hot Food</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From our kitchen to your table! Authentic Middle Eastern and Mediterranean dishes made fresh daily with
                our premium halal meats.
              </p>
            </AnimatedSection>

            <div className="grid gap-8 lg:grid-cols-2 mb-12">
              <AnimatedSection variant={fadeInLeft}>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-green-800 mb-6">🥙 Signature Dishes</h3>

                  <motion.div
                    className="space-y-4"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    {[
                      {
                        name: "Lamb Shawarma Plate",
                        desc: "Tender lamb shawarma with rice, salad, and garlic sauce",
                        price: "$14.99",
                        image: "/placeholder.svg?height=80&width=80",
                      },
                      {
                        name: "Chicken Kabob Combo",
                        desc: "Grilled chicken kabobs with hummus, pita, and tabbouleh",
                        price: "$12.99",
                        image: "/placeholder.svg?height=80&width=80",
                      },
                      {
                        name: "Mixed Grill Platter",
                        desc: "Lamb, chicken, and beef kabobs with all the fixings",
                        price: "$18.99",
                        image: "/placeholder.svg?height=80&width=80",
                      },
                      {
                        name: "Falafel Wrap",
                        desc: "Fresh falafel with tahini, veggies in warm pita",
                        price: "$8.99",
                        image: "/placeholder.svg?height=80&width=80",
                      },
                    ].map((dish, index) => (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="flex justify-between items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="flex-shrink-0"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image
                              src={dish.image || "/placeholder.svg"}
                              alt={dish.name}
                              width={240}
                              height={240}
                              className="rounded-lg object-cover shadow-md border-2 border-green-200"
                            />
                          </motion.div>
                          <div>
                            <h4 className="font-semibold text-green-800">{dish.name}</h4>
                            <p className="text-sm text-gray-600">{dish.desc}</p>
                          </div>
                        </div>
                        <motion.span className="font-bold text-green-600 text-lg" whileHover={{ scale: 1.1 }}>
                          {dish.price}
                        </motion.span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </AnimatedSection>

              <AnimatedSection variant={fadeInRight}>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-green-800 mb-6">🍖 Fresh Off the Grill</h3>

                  <motion.div
                    className="space-y-4"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    {[
                      {
                        name: "Beef Burger Deluxe",
                        desc: "1/2 lb halal beef patty with all the fixings",
                        price: "$11.99",
                        image: "/placeholder.svg?height=80&width=80",
                      },
                      {
                        name: "Grilled Chicken Sandwich",
                        desc: "Marinated chicken breast with garlic aioli",
                        price: "$9.99",
                        image: "/placeholder.svg?height=80&width=80",
                      },
                      {
                        name: "Lamb Chops (4 pcs)",
                        desc: "Perfectly seasoned and grilled to perfection",
                        price: "$16.99",
                        image: "/placeholder.svg?height=80&width=80",
                      },
                      {
                        name: "Fish & Chips",
                        desc: "Fresh cod with crispy fries and tartar sauce",
                        price: "$13.99",
                        image: "/placeholder.svg?height=80&width=80",
                      },
                    ].map((dish, index) => (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.02, x: -10 }}
                        className="flex justify-between items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="flex-shrink-0"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image
                              src={dish.image || "/placeholder.svg"}
                              alt={dish.name}
                              width={240}
                              height={240}
                              className="rounded-lg object-cover shadow-md border-2 border-red-200"
                            />
                          </motion.div>
                          <div>
                            <h4 className="font-semibold text-red-800">{dish.name}</h4>
                            <p className="text-sm text-gray-600">{dish.desc}</p>
                          </div>
                        </div>
                        <motion.span className="font-bold text-red-600 text-lg" whileHover={{ scale: 1.1 }}>
                          {dish.price}
                        </motion.span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection>
              <motion.div
                className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8 text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.h3
                  className="text-2xl font-bold text-red-800 mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
                >
                  🌟 Daily Specials
                </motion.h3>
                <motion.div
                  className="grid gap-4 md:grid-cols-3"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {[
                    { title: "Monday Special", desc: "Buy 2 Shawarma plates, get 1 FREE" },
                    { title: "Weekend BBQ", desc: "All kabobs 20% off Fri-Sun" },
                    { title: "Family Feast", desc: "Mixed grill for 4 people - $59.99" },
                  ].map((special, index) => (
                    <motion.div
                      key={index}
                      variants={scaleIn}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="bg-white rounded-lg p-4 hover:shadow-lg transition-all duration-300"
                    >
                      <h4 className="font-semibold text-orange-800">{special.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{special.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
            <AnimatedSection className="text-center mb-16">
              <Badge className="bg-green-100 text-green-800 mb-4">Our Services</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">More Than Just Fresh Meat</h2>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2">
              <AnimatedSection variant={fadeInLeft}>
                <div className="space-y-6">
                  {[
                    {
                      icon: Award,
                      title: "Custom Cuts",
                      desc: "Our expert butchers can prepare custom cuts to your exact specifications",
                    },
                    { icon: Truck, title: "Local Delivery", desc: "Free delivery within Modesto for orders over $50" },
                    {
                      icon: Users,
                      title: "Bulk Orders",
                      desc: "Special pricing for restaurants, events, and large family gatherings",
                    },
                    {
                      icon: "🍽️",
                      title: "Dine-In & Takeout",
                      desc: "Enjoy our hot food fresh in our dining area or grab it to go",
                    },
                    {
                      icon: "🥘",
                      title: "Catering Services",
                      desc: "Large orders for parties, events, and corporate gatherings",
                    },
                  ].map((service, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ x: 10 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex-shrink-0">
                        <motion.div
                          className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {typeof service.icon === "string" ? (
                            <div className="text-green-600 text-xl">{service.icon}</div>
                          ) : (
                            <service.icon className="h-6 w-6 text-green-600" />
                          )}
                        </motion.div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection variant={fadeInRight}>
                <motion.div
                  className="bg-green-50 rounded-2xl p-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Special Offers</h3>
                  <motion.div
                    className="space-y-4"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    {[
                      { title: "Family Pack Special", desc: "Mix and match any 5 lbs of meat for just $45" },
                      { title: "Weekend BBQ Deal", desc: "20% off all beef cuts every Friday-Sunday" },
                      { title: "First Time Customer", desc: "15% off your first order with code WELCOME15" },
                    ].map((offer, index) => (
                      <motion.div
                        key={index}
                        variants={scaleIn}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        className="bg-white rounded-lg p-4 border border-green-200 hover:shadow-lg transition-all duration-300"
                      >
                        <h4 className="font-semibold text-green-800">{offer.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{offer.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-green-50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
            <AnimatedSection className="text-center mb-16">
              <Badge className="bg-green-100 text-green-800 mb-4">Visit Us</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Find Us in Modesto</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Come visit our store or give us a call. We're here to serve you with the best halal meats in town.
              </p>
            </AnimatedSection>

            <div className="grid gap-8 lg:grid-cols-2">
              <AnimatedSection variant={fadeInLeft}>
                <Card className="p-8 hover:shadow-xl transition-all duration-500">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl text-green-800">Store Information</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 space-y-6">
                    {[
                      { icon: MapPin, title: "Address", content: "2307 Oakdale Road\nModesto, CA 95355" },
                      { icon: Phone, title: "Phone", content: "(209) 408-0064" },
                      {
                        icon: Clock,
                        title: "Hours",
                        content: "Sunday - Saturday: 9:00 AM - 8:00 PM",
                      },
                    ].map((info, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        whileHover={{ x: 10 }}
                        viewport={{ once: true }}
                      >
                        <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.6 }}>
                          <info.icon className="h-6 w-6 text-green-600 mt-1" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-green-800">{info.title}</h3>
                          <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection variant={fadeInRight}>
                <motion.div
                  className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-full text-center">
                    <div className="mx-auto max-w-5xl w-full">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3156.7231479307414!2d-120.9442633240285!3d37.6993706204698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8090560502b98ac9%3A0xf273350cf3010f07!2s2307%20Oakdale%20Rd%2C%20Modesto%2C%20CA%2095355!5e0!3m2!1sen!2sus!4v1720058393457!5m2!1sen!2sus"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white overflow-hidden relative">
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 20,
              ease: "linear",
            }}
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="white"/></svg>\')',
              backgroundSize: "50px 50px",
            }}
          />
          <div className="container mx-auto max-w-7xl px-4 text-center relative">
            <AnimatedSection>
              <motion.h2
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
              >
                Ready to Experience the Best Halal Meat in Modesto?
              </motion.h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Visit us today or call ahead to place your order. Fresh, quality, halal meat awaits you!
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-green-600 hover:text-green-700 text-lg px-8 transition-all duration-300"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call (209) 555-MEAT
                  </Button>
                </motion.div>
                <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 transition-all duration-300"
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    Get Directions
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-green-800 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="grid gap-8 md:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <motion.div className="flex items-center space-x-2 mb-4" whileHover={{ scale: 1.05 }}>
                <motion.div
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white font-bold"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  M
                </motion.div>
                <span className="text-lg font-bold">Myar's Halal Market</span>
              </motion.div>
              <p className="text-green-100 text-sm">
                Your trusted source for premium halal meats in Modesto, California.
              </p>
            </motion.div>

            {[
              { title: "Quick Links", items: ["About Us", "Products", "Services", "Contact"] },
              { title: "Products", items: ["Premium Beef", "Fresh Chicken", "Lamb & Goat", "Custom Cuts"] },
              { title: "Contact Info", items: ["1234 McHenry Avenue", "Modesto, CA 95350", "(209) 555-MEAT"] },
            ].map((section, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-sm text-green-100">
                  {section.items.map((item, itemIndex) => (
                    <motion.li key={itemIndex} whileHover={{ x: 5, color: "#ffffff" }} transition={{ duration: 0.2 }}>
                      {section.title === "Quick Links" ? (
                        <Link
                          href={`#${item.toLowerCase().replace(" ", "")}`}
                          className="hover:text-white transition-colors"
                        >
                          {item}
                        </Link>
                      ) : (
                        item
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="border-t border-green-700 mt-8 pt-8 text-center text-sm text-green-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>&copy; {new Date().getFullYear()} Myar's Halal Market. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <ChevronUp className="h-6 w-6" />
      </motion.button>
    </div>
  )
}
