import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from "@react-email/components"
import { Html } from "@react-email/html"
import * as React from "react"

interface IProps {
    domain: string
    token: string
}

export function VerificationTemplate({ domain, token }: IProps) {
    const verificationLink = `${domain}/account/verify?token=${token}`

    return (
        <Html>
            <Head />
            <Preview>Подтверждение аккаунта</Preview>
            <Tailwind>
                <Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
                    <Section className='text-center mb-8'>
                        <Heading className="text-3xl text-black font-bold">Подтверждение аккаунта</Heading>
                        <Text className='text-base text-black'>
                            Для подтверждения аккаунта перейдите по ссылке:
                        </Text>
                        <Link href={verificationLink} className='inline-flex items-center justify-center rounded-full text-sm font-medium text-white bg-slate-700 px-5 py-2.5'>
                            Подтвердить почту
                        </Link>
                    </Section>

                    <Section className="text-center mt-8">
                        <Text className="text-gray-500">
                            Если вы не запрашивали подтверждение аккаунта, проигнорируйте это письмо.
                        </Text>
                    </Section>
                </Body>
            </Tailwind>
        </Html >
    )
}