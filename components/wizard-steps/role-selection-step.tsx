"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { OnboardingData } from "../onboarding-wizard"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react"
import { Label } from "@/components/ui/label"

interface RoleSelectionStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
}

const formSchema = z.object({
  role: z.string().min(1, "Please select your role"),
  useCase: z.string().min(10, "Please describe your use case in at least 10 characters"),
})

export default function RoleSelectionStep({ data, updateData }: RoleSelectionStepProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: data.role,
      useCase: data.useCase,
    },
  })

  // Update parent form data when this form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (form.formState.isValid) {
        updateData(value as Partial<OnboardingData>)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, updateData])

  const roles = [
    {
      value: "executive",
      label: "Executive / C-Level",
      description: "Strategic decision maker for the organization",
    },
    {
      value: "manager",
      label: "Manager / Team Lead",
      description: "Responsible for team performance and outcomes",
    },
    {
      value: "individual",
      label: "Individual Contributor",
      description: "Hands-on professional focused on execution",
    },
    {
      value: "consultant",
      label: "Consultant / Advisor",
      description: "External expert providing specialized guidance",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Your Role & Use Case</h2>
        <p className="text-muted-foreground">Help us understand how you&apos;ll be using our platform</p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What best describes your role?</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                    {roles.map((role) => (
                      <div key={role.value} className="flex items-start space-x-3 space-y-0">
                        <RadioGroupItem value={role.value} id={role.value} />
                        <div className="grid gap-1.5">
                          <Label htmlFor={role.value} className="font-medium">
                            {role.label}
                          </Label>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="useCase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How do you plan to use our platform?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please describe your primary use case and what you hope to achieve with our platform..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
