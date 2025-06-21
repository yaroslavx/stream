import { SessionMetadata } from "@/src/shared/types/session-metadata.type"
import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from "@react-email/components"
import { Html } from "@react-email/html"
import * as React from "react"

interface IProps {
    domain: string
    token: string
    metadata: SessionMetadata
}

export function PasswordRecoveryTemplate({ domain, token, metadata }: IProps) {
    const resetLink = `${domain}/account/recovery/${token}`

    return (
        <Html>
            <Head />
            <Preview>Сброс пароля</Preview>
            <Tailwind>
                <Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
                    <Section className='text-center mb-8'>
                        <Heading className="text-3xl text-black font-bold">Сброс пароля</Heading>
                        <Text className='text-base text-black mt-2'>
                            Вы запросили сброс пароля для вашей учетной записи.
                        </Text>
                        <Text className='text-base text-black mt-2'>
                            Чтобы создать новый пароль, нажмите на ссылку ниже:
                        </Text>
                        <Link href={resetLink} className='inline-flex items-center justify-center rounded-full text-sm font-medium text-white bg-slate-700 px-5 py-2.5'>
                            Сбросить пароль
                        </Link>
                    </Section>

                    <Section className='bg-gray-100 p-6 mb-6 rounded-md'>
                        <Heading className='text-xl font-semibold bg-slate-700'>Информация о запросе</Heading>
                        <ul className="list-disc list-inside mt-2">
                            <li>Расположение: {metadata.location.country}, {metadata.location.city}</li>
                            <li>IP-адрес: {metadata.ip}</li>
                            <li>Браузер: {metadata.device.browser}</li>
                            <li>Операционная система: {metadata.device.os}</li>
                        </ul>
                    </Section>

                    <Section className="text-center mt-8">
                        <Text className="text-gray-500">
                            Если вы не запрашивали сброс пароля, проигнорируйте это письмо.
                        </Text>
                    </Section>
                </Body>
            </Tailwind>
        </Html >
    )
}