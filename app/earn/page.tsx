"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DollarSign, Users, Copy, Send, TrendingUp, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

type ReferralTier = {
	level: string
	commission: string
	color: string
}

const referralTiers: ReferralTier[] = [
	{ level: "Basic", commission: "₦50", color: "bg-purple-500" },
	{ level: "Premium", commission: "₦100", color: "bg-purple-600" },
	{ level: "VIP", commission: "₦200", color: "bg-purple-700" },
	{ level: "Diamond", commission: "₦300", color: "bg-purple-800" },
]

export default function EarnPage() {
	const [referralLink] = useState("https://paygofinance.com/ref/PG123456")
	const [copied, setCopied] = useState(false)

	const copyReferralLink = () => {
		navigator.clipboard.writeText(referralLink)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				{/* Navigation */}
				<div className="mb-6">
					<Link
						href="/"
						className="inline-flex items-center text-purple-600 hover:text-purple-700"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Home
					</Link>
				</div>

				<div className="text-center mb-8">
					<div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
						<DollarSign className="w-8 h-8 text-white" />
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Earn Money
					</h1>
					<p className="text-gray-600">
						Make money by referring friends to PayGo Finance
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						{/* Referral Stats */}
						<div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
							<Card>
								<CardContent className="p-4 text-center">
									<Users className="w-7 h-7 md:w-8 md:h-8 text-purple-600 mx-auto mb-2" />
									<p className="text-xl md:text-2xl font-bold">12</p>
									<p className="text-xs md:text-sm text-gray-600">
										Total Referrals
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4 text-center">
									<DollarSign className="w-7 h-7 md:w-8 md:h-8 text-green-600 mx-auto mb-2" />
									<p className="text-xl md:text-2xl font-bold">₦3,850</p>
									<p className="text-xs md:text-sm text-gray-600">
										Total Earnings
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4 text-center">
									<TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-purple-600 mx-auto mb-2" />
									<p className="text-xl md:text-2xl font-bold">₦450</p>
									<p className="text-xs md:text-sm text-gray-600">
										This Month
									</p>
								</CardContent>
							</Card>
							{/* Add more stat cards here if needed */}
						</div>

						{/* Referral Link */}
						<Card>
							<CardHeader>
								<CardTitle>Your Referral Link</CardTitle>
								<CardDescription>
									Share this link to start earning
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex space-x-2">
									<Input value={referralLink} readOnly className="flex-1" />
									<Button onClick={copyReferralLink} variant="outline">
										<Copy className="w-4 h-4 mr-2" />
										{copied ? "Copied!" : "Copy"}
									</Button>
								</div>
								<div className="flex space-x-2">
									<Button
										className="flex-1 bg-green-600 hover:bg-green-700"
										onClick={() =>
											window.open(
												`https://wa.me/?text=Join PayGo Finance and start earning! ${referralLink}`,
												"_blank",
											)
										}
									>
										Share on WhatsApp
									</Button>
									<Button
										className="flex-1 bg-purple-600 hover:bg-purple-700"
										onClick={() =>
											window.open(
												`https://t.me/share/url?url=${referralLink}&text=Join PayGo Finance and start earning!`,
												"_blank",
											)
										}
									>
										<Send className="w-4 h-4 mr-2" />
										Share on Telegram
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Commission Tiers */}
						<Card>
							<CardHeader>
								<CardTitle className="text-base md:text-lg">
									Commission Tiers
								</CardTitle>
								<CardDescription className="text-xs md:text-sm">
									Earn more with higher PAY ID levels
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
									{referralTiers.map((tier, index) => (
										<div
											key={index}
											className="flex flex-col items-center justify-between p-4 bg-gray-50 rounded-lg"
										>
											<div
												className={`w-10 h-10 ${tier.color} rounded-full flex items-center justify-center mb-2`}
											>
												<DollarSign className="w-5 h-5 text-white" />
											</div>
											<p className="font-semibold text-sm md:text-base">
												{tier.level} PAY ID
											</p>
											<p className="text-xs text-gray-600 mb-1">
												Per referral
											</p>
											<Badge className="bg-green-100 text-green-800 text-xs md:text-sm">
												{tier.commission}
											</Badge>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Recent Referrals */}
						<Card>
							<CardHeader>
								<CardTitle>Recent Referrals</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{[
										{ name: "John D.", date: "2 days ago", commission: "₦100", status: "Paid" },
										{ name: "Sarah M.", date: "5 days ago", commission: "₦100", status: "Paid" },
										{ name: "Mike O.", date: "1 week ago", commission: "₦50", status: "Pending" },
									].map((referral, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
										>
											<div>
												<p className="font-medium">{referral.name}</p>
												<p className="text-sm text-gray-600">
													{referral.date}
												</p>
											</div>
											<div className="text-right">
												<p className="font-semibold">{referral.commission}</p>
												<Badge
													variant={
														referral.status === "Paid"
															? "default"
															: "secondary"
													}
												>
													{referral.status}
												</Badge>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						{/* Telegram Bot */}
						<Card className="bg-purple-50 border-purple-200">
							<CardHeader>
								<CardTitle className="text-purple-800">Telegram Bot</CardTitle>
								<CardDescription className="text-purple-600">
									Get real-time referral updates
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									className="w-full bg-purple-600 hover:bg-purple-700"
									onClick={() =>
										window.open("https://t.me/paygofinancebot", "_blank")
									}
								>
									<Send className="w-4 h-4 mr-2" />
									Start Telegram Bot
								</Button>
							</CardContent>
						</Card>

						{/* How It Works */}
						<Card>
							<CardHeader>
								<CardTitle>How It Works</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start space-x-3">
									<div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
										1
									</div>
									<div>
										<p className="font-medium">Share Your Link</p>
										<p className="text-sm text-gray-600">
											Copy and share your referral link
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
										2
									</div>
									<div>
										<p className="font-medium">Friend</p>
										<p className="text-sm text-gray-600">
											Your friend creates an account
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
										3
									</div>
									<div>
										<p className="font-medium">You Earn Commission</p>
										<p className="text-sm text-gray-600">
											Get paid when they make their first purchase
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Tips */}
						<Card className="bg-green-50 border-green-200">
							<CardHeader>
								<CardTitle className="text-green-800">Earning Tips</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2 text-sm text-green-700">
									<li>• Share on social media platforms</li>
									<li>• Tell friends about PAY ID benefits</li>
									<li>• Join our Telegram community</li>
									<li>• Upgrade your PAY ID for higher commissions</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
