"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import PersonalInfoStep from "./wizard-steps/personal-info-step"
import CompanyInfoStep from "./wizard-steps/company-info-step"
import RoleSelectionStep from "./wizard-steps/role-selection-step"
import PreferencesStep from "./wizard-steps/preferences-step"
import SummaryStep from "./wizard-steps/summary-step"
import WizardProgress from "./wizard-progress"
import WizardNavigation from "./wizard-navigation"

export type OnboardingData = {
  // Personal info
  firstName: string
  lastName: string
  email: string
  // Company info
  companyName: string
  companySize: string
  industry: string
  // Role info
  role: string
  useCase: string
  // Preferences
  notifications: boolean
  theme: "light" | "dark" | "system"
  features: string[]
}

const initialData: OnboardingData = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  companySize: "",
  industry: "",
  role: "",
  useCase: "",
  notifications: true,
  theme: "system",
  features: [],
}

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<OnboardingData>(initialData)

  const steps = ["Personal Information", "Company Details", "Role & Use Case", "Preferences", "Summary"]

  const updateFormData = (data: Partial<OnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.firstName && formData.lastName && formData.email
      case 1:
        return formData.companyName && formData.companySize && formData.industry
      case 2:
        return formData.role && formData.useCase
      case 3:
        return true // Preferences all have default values
      case 4:
        return true // Summary step doesn't need validation
      default:
        return false
    }
  }

  const handleNext = () => {
    if (!isStepValid()) {
      alert("Please fill out all required fields before proceeding.")
      return
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!isStepValid()) {
      alert("Please fill out all required fields before submitting.")
      return
    }

    // In a real application, you would send the data to your backend
    console.log("Submitting data:", formData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success message or redirect
    alert("Onboarding completed successfully!")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep data={formData} updateData={updateFormData} />
      case 1:
        return <CompanyInfoStep data={formData} updateData={updateFormData} />
      case 2:
        return <RoleSelectionStep data={formData} updateData={updateFormData} />
      case 3:
        return <PreferencesStep data={formData} updateData={updateFormData} />
      case 4:
        return <SummaryStep data={formData} />
      default:
        return null
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Our Platform</h1>
      <p className="text-muted-foreground text-center mb-10">Let's get you set up in just a few steps</p>

      <WizardProgress steps={steps} currentStep={currentStep} />

      <Card className="mt-8">
        <CardContent className="pt-6">
          {renderStep()}

          <WizardNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onBack={handleBack}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  )
}
