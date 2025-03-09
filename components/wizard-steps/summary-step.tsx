import type { OnboardingData } from "../onboarding-wizard"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X } from "lucide-react"

interface SummaryStepProps {
  data: OnboardingData
}

export default function SummaryStep({ data }: SummaryStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Review Your Information</h2>
        <p className="text-muted-foreground">Please confirm that everything is correct before proceeding</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">First Name</dt>
                <dd className="mt-1">{data.firstName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Last Name</dt>
                <dd className="mt-1">{data.lastName}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd className="mt-1">{data.email}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-3">Company Information</h3>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-muted-foreground">Company Name</dt>
                <dd className="mt-1">{data.companyName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Company Size</dt>
                <dd className="mt-1">{data.companySize}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Industry</dt>
                <dd className="mt-1">{data.industry}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-3">Role & Use Case</h3>
            <dl className="grid grid-cols-1 gap-3">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Your Role</dt>
                <dd className="mt-1 capitalize">{data.role.replace("-", " ")}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Use Case</dt>
                <dd className="mt-1">{data.useCase}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-3">Preferences</h3>
            <dl className="grid grid-cols-1 gap-3">
              <div className="flex items-center">
                <dt className="text-sm font-medium text-muted-foreground mr-2">Email Notifications:</dt>
                <dd className="flex items-center">
                  {data.notifications ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Theme Preference</dt>
                <dd className="mt-1 capitalize">{data.theme}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Selected Features</dt>
                <dd className="mt-1">
                  <ul className="list-disc pl-5 space-y-1">
                    {data.features.map((feature) => (
                      <li key={feature} className="capitalize">
                        {feature.replace("-", " ")}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg border p-4 bg-muted/50">
        <p className="text-sm text-center">
          By completing this setup, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}

