
import { Button, Card, Flex, Typography, message } from "antd";
import { CopyOutlined, LeftOutlined } from "@ant-design/icons";
import { formatNaira } from "@/lib/format";

type Props = {
    amount: number;
    onBack: () => void;
};

const account = {
    name: "Subs.NG",
    bank: "PalmPay",
    number: "9033456789",
};

export function TransferStep({ amount, onBack }: Props) {
    const [messageApi, contextHolder] = message.useMessage();

    async function copyAccountNumber() {
        try {
            await navigator.clipboard.writeText(account.number);
            messageApi.success("Account number copied");
        } catch {
            messageApi.error("Unable to copy account number");
        }
    }

    return (
        <>
            {contextHolder}

            <Card
                className="w-full max-w-xl"
                styles={{ body: { padding: 20 } }}
            >
                <Flex vertical gap={16}>
                    <Button
                        type="text"
                        icon={<LeftOutlined />}
                        className="self-start !-ml-2"
                        onClick={onBack}
                    >
                        Back
                    </Button>

                    <div>
                        <Typography.Title level={4} className="!mb-1">
                            Bank transfer
                        </Typography.Title>
                        <Typography.Text type="secondary" className="text-sm">
                            Transfer money to the account below to fund your wallet.
                        </Typography.Text>
                    </div>

                    <div className="rounded-lg bg-gray-50 px-4 py-3">
                        <Typography.Text type="secondary" className="text-sm">
                            Transfer amount
                        </Typography.Text>
                        <Typography.Title level={3} className="!mb-0 !mt-1">
                            {formatNaira(amount)}
                        </Typography.Title>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <div className="border-b border-gray-100 px-4 py-3">
                            <Typography.Text type="secondary" className="text-xs">
                                ACCOUNT NAME
                            </Typography.Text>
                            <Typography.Text strong className="mt-1 block">
                                {account.name}
                            </Typography.Text>
                        </div>

                        <div className="border-b border-gray-100 px-4 py-3">
                            <Typography.Text type="secondary" className="text-xs">
                                BANK
                            </Typography.Text>
                            <Typography.Text strong className="mt-1 block">
                                {account.bank}
                            </Typography.Text>
                        </div>

                        <Flex
                            justify="space-between"
                            align="center"
                            gap={12}
                            className="px-4 py-3"
                        >
                            <div className="min-w-0">
                                <Typography.Text type="secondary" className="text-xs">
                                    ACCOUNT NUMBER
                                </Typography.Text>
                                <Typography.Text strong className="mt-1 block text-base">
                                    {account.number}
                                </Typography.Text>
                            </div>

                            <Button
                                icon={<CopyOutlined />}
                                onClick={copyAccountNumber}
                            >
                                Copy
                            </Button>
                        </Flex>
                    </div>

                    <Typography.Text type="secondary" className="text-xs">
                        Your wallet will be credited once the transfer is confirmed.
                    </Typography.Text>

                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={() =>
                            messageApi.info(
                                "Connect this action to your payment confirmation flow."
                            )
                        }
                    >
                        I have made the payment
                    </Button>
                </Flex>
            </Card>
        </>
    );
}
