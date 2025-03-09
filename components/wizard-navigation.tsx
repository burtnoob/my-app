"use client"

import { Button } from "@/components/ui/button"

interface WizardNavigationProps {
  currentStep: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
}

export default function WizardNavigation({ currentStep, totalSteps, onBack, onNext, onSubmit }: WizardNavigationProps) {
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1

  return (
    <div className="flex justify-between mt-8">
      <Button variant="outline" onClick={onBack} disabled={isFirstStep}>
        Back
      </Button>

      {isLastStep ? <Button onClick={onSubmit}>Complete Setup</Button> : <Button onClick={onNext}>Continue</Button>}
    </div>
  )
}

