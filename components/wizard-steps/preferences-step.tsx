"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { OnboardingData } from "../onboarding-wizard"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect } from "react"
import { Label } from "@/components/ui/label"

interface PreferencesStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
}

const formSchema = z.object({
  notifications: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
  features: z.array(z.string()).min(1, "Please select at least one feature"),
})

export default function PreferencesStep({ data, updateData }: PreferencesStepProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notifications: data.notifications,
      theme: data.theme,
      features: data.features,
    },
  })

  // Update parent form data when this form changes
  const watchedValues = form.watch()
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (form.formState.isValid) {
        updateData(value as Partial<OnboardingData>)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, updateData])

  const features = [
    {
      id: "analytics",
      label: "Analytics Dashboard",
      description: "Access to detailed analytics and reporting",
    },
    {
      id: "collaboration",
      label: "Team Collaboration",
      description: "Tools for working together with your team",
    },
    {
      id: "automation",
      label: "Workflow Automation",
      description: "Automate repetitive tasks and processes",
    },
    {
      id: "integration",
      label: "Third-party Integrations",
      description: "Connect with your existing tools and services",
    },
    {
      id: "mobile",
      label: "Mobile Access",
      description: "Access your account on mobile devices",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Your Preferences</h2>
        <p className="text-muted-foreground">Customize your experience with our platform</p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="notifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Email Notifications</FormLabel>
                  <FormDescription>Receive updates, tips, and important announcements</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Theme Preference</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="system" id="theme-system" />
                      <Label htmlFor="theme-system">System Default</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Features You're Interested In</FormLabel>
                  <FormDescription>Select the features you'd like to explore first</FormDescription>
                </div>
                {features.map((feature) => (
                  <FormField
                    key={feature.id}
                    control={form.control}
                    name="features"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={feature.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mb-3"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(feature.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, feature.id])
                                  : field.onChange(field.value?.filter((value) => value !== feature.id))
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium">{feature.label}</FormLabel>
                            <FormDescription className="text-xs">{feature.description}</FormDescription>
                          </div>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

