import { CheckCircle2 } from "lucide-react"

interface WizardProgressProps {
  steps: string[]
  currentStep: number
}

export default function WizardProgress({ steps, currentStep }: WizardProgressProps) {
  return (
    <div className="relative">
      <div className="hidden sm:flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center relative z-10 ${
              index <= currentStep ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                index < currentStep
                  ? "bg-primary text-primary-foreground border-primary"
                  : index === currentStep
                    ? "border-primary text-primary"
                    : "border-muted-foreground text-muted-foreground"
              }`}
            >
              {index < currentStep ? <CheckCircle2 className="w-6 h-6" /> : <span>{index + 1}</span>}
            </div>
            <span className="mt-2 text-sm font-medium">{step}</span>
          </div>
        ))}
      </div>

      {/* Progress line */}
      <div className="hidden sm:block absolute top-4 left-0 right-0 h-0.5 bg-muted-foreground/30">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Mobile view */}
      <div className="sm:hidden flex items-center justify-between">
        <span className="text-sm font-medium text-primary">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm font-medium text-primary">{steps[currentStep]}</span>
      </div>
    </div>
  )
}

