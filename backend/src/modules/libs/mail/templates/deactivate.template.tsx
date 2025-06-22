import type { SessionMetadata } from "@/src/shared/types/session-metadata.type"
import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from "@react-email/components"
import { Html } from "@react-email/html"
import * as React from "react"

interface IProps {
    token: string
    metadata: SessionMetadata
}

export function DeactivateTemplate({ token, metadata }: IProps) {
    return (
        <Html>
            <Head />
            <Preview>Деактивация учетной записи</Preview>
            <Tailwind>
                <Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
                    <Section className='text-center mb-8'>
                        <Heading className="text-3xl text-black font-bold">Деактивация учетной записи</Heading>
                        <Text className='text-base text-black mt-2'>
                            Вы запросили деактивацию вашей учетной записи.
                        </Text>
                    </Section>

                    <Section className='bg-gray-100 rounded-lg p-6 text-center mb-6'>
                        <Heading className='text-2xl text-black font-semibold'>Код для деактивации:</Heading>
                        <Heading className='text-3xl text-black font-semibold'>{token}</Heading>
                        <Text className='text-black'>Этот код действует в течение 5 минут</Text>
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
                </Body>
            </Tailwind>
        </Html >
    )
}