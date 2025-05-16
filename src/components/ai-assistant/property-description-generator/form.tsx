import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePromptSender } from "@/hooks/use-prompt-sender";
import {
  AGENT_SPECIALIZATION_ENUMS,
  FEATURES_ENUMS,
  PARKING_ENUMS,
  PROPERTY_TYPE_ENUMS,
  TARGET_AUDIENCE_ENUMS,
  TONE_ENUMS,
} from "@/lib/constants";
import { toCapitalCase } from "@/lib/utils";
import { useSuburbsQuery } from "@/modules/suburbs/hooks/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

export function PropertyDescriptionGeneratorForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const { sendPrompt } = usePromptSender();
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: {
        city: "",
        suburb: "",
      },
      features: [],
      bedrooms: 0,
      bathrooms: 0,
      seoKeywords: "",
    },
  });

  const onSubmit = async (values: TForm) => {
    const prompt = generatePromptMessage(values);
    onClose();
    await sendPrompt(prompt);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => console.error(err))}
        className="my-4 space-y-6"
      >
        <div className="flex flex-wrap gap-4">
          <FormField
            name="propertyType"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel className="text-nowrap">Property Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPE_ENUMS.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="location.city"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="location.suburb"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Suburb</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Search by name or pincode" />
                  </FormControl>
                  <FilteredSuburbDropdown />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <FormField
            name="bedrooms"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="bathrooms"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="parking"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Parking</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {PARKING_ENUMS.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          name="features"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Features</FormLabel>
                <div className="flex flex-wrap items-center gap-4">
                  {FEATURES_ENUMS.map((feature) => (
                    <div key={feature} className="flex gap-2">
                      <Checkbox
                        checked={field.value.includes(feature)}
                        onCheckedChange={(checked) => {
                          if (!checked) {
                            const updatedFeatures = field.value.filter(
                              (v) => v !== feature,
                            );
                            field.onChange(updatedFeatures);
                          } else {
                            field.onChange([...field.value, feature]);
                          }
                        }}
                      />
                      <Label>{feature}</Label>
                    </div>
                  ))}
                </div>
                <FeatureInput />
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex flex-wrap gap-4">
          <FormField
            name="targetAudience"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Target Audience</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {TARGET_AUDIENCE_ENUMS.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="tone"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Tone</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {TONE_ENUMS.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="agentSpecialization"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Agent Specialization</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGENT_SPECIALIZATION_ENUMS.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          name="seoKeywords"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <div className="flex gap-1">
                  <FormLabel>SEO Keywords</FormLabel>
                  <FormDescription className="text-xs">
                    (Seperate keywords by comma)
                  </FormDescription>
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button>Submit</Button>
      </form>
    </Form>
  );
}

function FilteredSuburbDropdown() {
  const { setValue, watch } = useFormContext<TForm>();
  const { data: suburbs } = useSuburbsQuery();
  const searchQuery = watch("location.suburb");

  const filteredSuburbs = suburbs
    ? suburbs.filter(
        (suburb) =>
          suburb[0].includes(searchQuery) || suburb[1].includes(searchQuery),
      )
    : [];

  if (filteredSuburbs.length === 0 || !searchQuery) return null;

  const handleClick = (suburbString: string) => {
    setValue("location.suburb", suburbString);
  };

  return (
    <div className="max-h-30 overflow-y-auto rounded-md border border-gray-200 p-2 shadow">
      {filteredSuburbs?.map((suburb, index) => {
        const suburbString = `${toCapitalCase(suburb[0])}, ${suburb[1]}`;
        return (
          <button
            onClick={() => handleClick(suburbString)}
            type="button"
            key={index}
            className="w-full cursor-pointer rounded-md px-2 py-1 text-start text-sm transition-colors hover:bg-gray-200"
          >
            <span>{suburbString}</span>
          </button>
        );
      })}
    </div>
  );
}

function FeatureInput() {
  const { setValue, watch } = useFormContext<TForm>();

  const value = watch("features").join(",");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue("features", newValue.split(","));
  };

  return (
    <FormItem className="pt-1">
      <FormControl>
        <Input
          value={value}
          onChange={onChange}
          placeholder="Enter features manually (comma seperated)"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

function generatePromptMessage(values: TForm) {
  const {
    propertyType,
    bedrooms,
    location,
    features,
    tone,
    agentSpecialization,
    seoKeywords,
    bathrooms,
    parking,
    targetAudience,
  } = values;

  const featureList = features.join(", ");
  const locationString = `${location.city}, ${location.suburb}`;

  const prompt = `Transform the following property details into an SEO-rich, persuasive listing description targeting prospective home buyers. Highlight features that appeal to family buyers. Keep it engaging, informative, and optimized for search engines. Avoid generic filler language.

- Property Type: ${propertyType}
- Location (City and Suburb): ${locationString}
- Number of Bedrooms and Bathrooms: ${bedrooms} bed / ${bathrooms} bath
- Parking Availability: ${parking}
- Key Features: ${featureList}
- Target Audience: ${targetAudience}
- Preferred Tone: ${tone}
- Your Specialization: ${agentSpecialization}
- SEO Keywords: ${seoKeywords}`;

  return prompt;
}

const formSchema = z.object({
  propertyType: z.enum(PROPERTY_TYPE_ENUMS),
  location: z.object({
    city: z.string(),
    suburb: z.string(),
  }),
  bedrooms: z.coerce.number(),
  bathrooms: z.coerce.number(),
  parking: z.enum(PARKING_ENUMS),
  features: z.array(z.enum(FEATURES_ENUMS).or(z.string())),
  targetAudience: z.enum(TARGET_AUDIENCE_ENUMS),
  tone: z.enum(TONE_ENUMS),
  agentSpecialization: z.enum(AGENT_SPECIALIZATION_ENUMS),
  seoKeywords: z.string(),
});

type TForm = z.infer<typeof formSchema>;
