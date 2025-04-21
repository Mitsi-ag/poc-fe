"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface TrialNotificationProps {
  daysLeft: number
  onUpgrade: () => void
}

export function TrialNotification({ daysLeft, onUpgrade }: TrialNotificationProps) {
  const { toast } = useToast()

  useEffect(() => {
    // Show different notifications based on days left
    if (daysLeft === 7) {
      // Trial just started
      toast({
        title: "Your Pro trial has started!",
        description: "Explore all premium features for the next 7 days.",
        action: (
          <Button size="sm" onClick={onUpgrade}>
            Explore Pro Features
          </Button>
        ),
      })
    } else if (daysLeft === 3) {
      // Mid-trial reminder
      toast({
        title: "Enjoying your Pro trial?",
        description: "You have 3 days left in your trial period.",
        action: (
          <Button size="sm" onClick={onUpgrade}>
            Upgrade Now
          </Button>
        ),
      })
    } else if (daysLeft === 1) {
      // Last day warning
      toast({
        title: "Your trial ends tomorrow!",
        description: "Upgrade now to keep access to all Pro features.",
        action: (
          <Button size="sm" variant="destructive" onClick={onUpgrade}>
            Upgrade Now
          </Button>
        ),
      })
    } else if (daysLeft === 0) {
      // Trial ended
      toast({
        title: "Your Pro trial has ended",
        description: "Upgrade now to restore access to all Pro features.",
        action: (
          <Button size="sm" variant="destructive" onClick={onUpgrade}>
            Upgrade Now
          </Button>
        ),
      })
    }
  }, [daysLeft, toast, onUpgrade])

  return null // This component just triggers toasts, doesn't render anything
}
