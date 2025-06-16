import { DeviceInfo, LocationInfo, SessionMetadata } from "@/src/shared/types/session-metadata.type";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LocationModel implements LocationInfo {
    @Field(() => String)
    public country: string

    @Field(() => String)
    public city: string

    @Field(() => Number)
    public latitude: number

    @Field(() => Number)
    public longitude: number
}

@ObjectType()
export class DeviceModel implements DeviceInfo {
    @Field(() => String)
    public browser: string

    @Field(() => String)
    public os: string

    @Field(() => String)
    public type: string
}

@ObjectType()
export class SessionMetadataModel implements SessionMetadata {
    @Field(() => LocationModel)
    location: LocationModel

    @Field(() => DeviceModel)
    device: DeviceModel

    @Field(() => String)
    ip: string
}

@ObjectType()
export class SessionModel {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public userId: string

    @Field(() => String)
    public createdAt: string

    @Field(() => SessionMetadataModel)
    public metadata: SessionMetadataModel
}