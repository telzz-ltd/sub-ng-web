import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Search01Icon,
    Refresh01Icon,
} from "@hugeicons/core-free-icons";

import { AppLayout } from "@/components/app/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/app/pricing")({
    component: PricingPage,
});

type PricingItem = {
    service: string;
    description: string;
    pricing: string;
    details: string;
};

const pricingItems: PricingItem[] = [
    {
        service: "Airtime",
        description: "Buy airtime for any supported network.",
        pricing: "Face value",
        details: "Based on network and recharge amount.",
    },
    {
        service: "Data",
        description: "Purchase mobile data bundles.",
        pricing: "Varies by plan",
        details: "Depends on network, plan and validity.",
    },
    {
        service: "Recharge Cards",
        description: "Generate recharge PINs for supported networks.",
        pricing: "By denomination",
        details: "Depends on network and selected denomination.",
    },
    {
        service: "Airtime to Cash",
        description: "Convert airtime into wallet balance.",
        pricing: "80% payout",
        details: "Payout is calculated from the airtime value.",
    },
    {
        service: "Cable TV",
        description: "Subscribe to your favourite TV packages.",
        pricing: "Varies by package",
        details: "Depends on provider and selected subscription.",
    },
    {
        service: "Electricity",
        description: "Pay electricity bills for supported providers.",
        pricing: "Based on amount",
        details: "Depends on the amount and electricity provider.",
    },
    {
        service: "Exam Cards",
        description: "Purchase examination PINs.",
        pricing: "Per PIN",
        details: "Depends on examination type and quantity.",
    },
];

function PricingPage() {
    const [search, setSearch] = useState("");

    const filteredItems = useMemo(
        () =>
            pricingItems.filter((item) =>
                `${item.service} ${item.description}`
                    .toLowerCase()
                    .includes(search.toLowerCase()),
            ),
        [search],
    );

    return (
        <AppLayout
            title="Pricing"
            description="View pricing information for all our services."
        >
            <div className="mx-auto max-w-5xl space-y-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">Service pricing</h2>
                        <p className="text-sm text-muted-foreground">
                            An overview of how our services are priced.
                        </p>
                    </div>

                    <div className="relative w-full sm:max-w-70">
                        <HugeiconsIcon
                            icon={Search01Icon}
                            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                            placeholder="Search services..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

                <Card className="overflow-hidden rounded-2xl border-gray-200 py-0">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40">
                                    <TableHead className="h-12 pl-5">Service</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Pricing</TableHead>
                                    <TableHead className="pr-5">Details</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item) => (
                                        <TableRow key={item.service}>
                                            <TableCell className="py-4 pl-5 font-medium">
                                                {item.service}
                                            </TableCell>
                                            <TableCell className="py-4 text-sm text-muted-foreground">
                                                {item.description}
                                            </TableCell>
                                            <TableCell className="py-4 font-medium">
                                                {item.pricing}
                                            </TableCell>
                                            <TableCell className="py-4 pr-5 text-sm text-muted-foreground">
                                                {item.details}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-32 text-center">
                                            <p className="text-sm text-muted-foreground">
                                                No services found.
                                            </p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="flex items-start gap-3 rounded-xl border bg-muted/30 p-4">
                    <HugeiconsIcon
                        icon={Refresh01Icon}
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    />
                    <div>
                        <p className="text-sm font-medium">Pricing information</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Some prices depend on the selected network, provider or service
                            plan. The final amount will be displayed before you confirm a
                            transaction.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}