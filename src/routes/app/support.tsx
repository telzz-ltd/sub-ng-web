
import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Message01Icon,
  Mail01Icon,
  Call02Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { AppLayout } from "@/components/app/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/app/support")({
  component: SupportPage,
});

const contactOptions = [
  {
    title: "Live chat",
    description: "Chat with our team on WhatsApp.",
    icon: Message01Icon,
    action: "Start chat",
    href: "https://wa.me/2348000000000",
  },
  {
    title: "Email support",
    description: "We usually reply within a few hours.",
    icon: Mail01Icon,
    action: "Send email",
    href: "mailto:support@subs.ng",
  },
  {
    title: "Call us",
    description: "Available Monday to Saturday, 8am – 8pm.",
    icon: Call02Icon,
    action: "Call now",
    href: "tel:+2348000000000",
  },
];

const faqs = [
  {
    key: "1",
    question: "How long does wallet funding take?",
    answer:
      "Bank transfers are confirmed automatically within a few minutes. If your wallet is not credited after 15 minutes, contact support with your transfer reference.",
  },
  {
    key: "2",
    question: "What should I do if my data or airtime did not arrive?",
    answer:
      "Most orders are delivered instantly. If your order is still pending, wait a few minutes and refresh the transaction. If it fails, the amount is reversed automatically.",
  },
  {
    key: "3",
    question: "How do I withdraw my commission?",
    answer:
      "Open the Commissions page, enter the amount and your bank details, then submit your withdrawal request. Funds are sent to your bank account within minutes.",
  },
  {
    key: "4",
    question: "Can I use one account for my family?",
    answer:
      "Yes. Your wallet can pay for any network and any meter or smartcard number. Just enter the correct details before confirming each payment.",
  },
];

function SupportPage() {
  return (
    <AppLayout
      title="Help & support"
      description="We are available every day to help with your account and transactions."
    >
      <div className="mx-auto max-w-4xl space-y-5">
        {/* Contact options */}
        <div className="grid gap-4 md:grid-cols-3">
          {contactOptions.map((option) => {
            const isExternal = option.href.startsWith("https://");

            return (
              <Card
                key={option.title}
                className="h-full rounded-2xl"
              >
                <CardContent className="p-5">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <HugeiconsIcon icon={option.icon} className="size-5" />
                  </div>

                  <h3 className="mt-4 text-base font-semibold">
                    {option.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {option.description}
                  </p>

                  <Button
                    className="mt-4 w-full"
                    render={(props) => (
                      <a
                        {...props}
                        href={option.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                      >
                        {option.action}
                      </a>
                    )}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQs */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Frequently asked questions
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Quick answers to the questions we get most often.
            </p>
          </CardHeader>

          <CardContent>
            <Accordion>
              {faqs.map((faq) => (
                <AccordionItem key={faq.key} value={faq.key}>
                  <AccordionTrigger className="text-sm font-medium text-left">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Response time */}
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-3">
          <HugeiconsIcon icon={Clock01Icon} className="size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Average response time: under 10 minutes during support hours.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
