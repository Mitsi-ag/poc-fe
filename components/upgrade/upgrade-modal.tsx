"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { Clock, Calendar, BarChart, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("monthly")
  const [step, setStep] = useState<"plans" | "trial" | "payment" | "success">("plans")

  const features = [
    "Unlimited listings tracking",
    "Advanced competitor analytics",
    "AI-powered pitch generator",
    "Email marketing automation",
    "Custom reports and exports",
    "Priority support",
  ]

  const handleStartTrial = () => {
    setStep("trial")
  }

  const handleConfirmTrial = () => {
    setStep("payment")
  }

  const handleCompletePayment = () => {
    // In a real app, this would process the payment info
    setStep("success")

    // After 2 seconds, close the modal and redirect
    setTimeout(() => {
      onClose()
      router.push("/settings/subscription")
    }, 2000)
  }

  const handleClose = () => {
    // Reset state when closing
    setStep("plans")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        {step === "plans" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Upgrade to RealtyMate Pro</DialogTitle>
              <DialogDescription>
                Get unlimited access to all premium features and take your real estate business to the next level.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="monthly" className="w-full" onValueChange={setSelectedPlan}>
              <div className="flex justify-center mb-6">
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="annual">
                    Annual <Badge className="ml-1.5 bg-green-100 text-green-800 hover:bg-green-100">Save 20%</Badge>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="monthly">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">Pro Plan</CardTitle>
                        <CardDescription>Perfect for individual agents</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">$49</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {features.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" size="lg" onClick={handleStartTrial}>
                      Start 7-Day Free Trial
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="annual">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">Pro Plan</CardTitle>
                        <CardDescription>Perfect for individual agents</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">$39</div>
                        <div className="text-sm text-muted-foreground">per month, billed annually</div>
                        <div className="text-sm font-medium text-green-600">Save $120/year</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {features.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" size="lg" onClick={handleStartTrial}>
                      Start 7-Day Free Trial
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>No credit card required to start your trial. Cancel anytime.</p>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={handleClose} className="sm:w-auto w-full">
                Maybe Later
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "trial" && (
          <>
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-2xl font-bold">Your 7-Day Free Trial</DialogTitle>
              <DialogDescription>Experience all Pro features with no commitment</DialogDescription>
            </DialogHeader>

            <div className="px-6 py-4">
              <div className="rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">7 Days of Full Access</h3>
                    <p className="text-sm text-muted-foreground">No limitations, no commitments</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Full feature access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Email reminders</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">What you'll get immediately:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <h5 className="font-medium">AI Assistant Pro</h5>
                      <p className="text-sm text-muted-foreground">Unlimited queries & advanced features</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h5 className="font-medium">Advanced CRM</h5>
                      <p className="text-sm text-muted-foreground">Unlimited contacts & automation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <BarChart className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h5 className="font-medium">Market Analytics</h5>
                      <p className="text-sm text-muted-foreground">Detailed reports & insights</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-4 w-4 text-rose-600" />
                    </div>
                    <div>
                      <h5 className="font-medium">Pitch Generator</h5>
                      <p className="text-sm text-muted-foreground">AI-powered pitch creation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="p-6 pt-2 flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={handleClose} className="sm:w-auto w-full">
                Not Now
              </Button>
              <Button onClick={handleConfirmTrial} className="sm:w-auto w-full">
                Activate My Free Trial
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "payment" && (
          <>
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-2xl font-bold">Set Up Your Account</DialogTitle>
              <DialogDescription>
                Your card won't be charged until your 7-day trial ends on May 1, 2023
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 py-4">
              <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Your 7-day free trial is ready</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll remind you 2 days before your trial ends. Cancel anytime.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Professional Plan</h4>
                    <span className="text-lg font-bold">${selectedPlan === "monthly" ? "99" : "79"}/mo</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedPlan === "monthly" ? "Billed monthly" : "Billed annually ($948)"}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Payment details</h4>
                  <p className="text-sm text-muted-foreground">
                    In a real implementation, this would be a Stripe payment form. For this demo, just click the button
                    below.
                  </p>
                  <div className="h-[100px] border rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Stripe payment form would appear here</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="p-6 pt-2 flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={handleClose} className="sm:w-auto w-full">
                Cancel
              </Button>
              <Button onClick={handleCompletePayment} className="sm:w-auto w-full">
                Start My Free Trial
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "success" && (
          <div className="p-6 flex flex-col items-center justify-center text-center py-12">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Pro Trial Is Active!</h2>
            <p className="text-muted-foreground mb-6">Enjoy full access to all Pro features for the next 7 days.</p>
            <div className="animate-pulse">
              <p className="text-sm">Redirecting to your dashboard...</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
