import type { User } from "@/prisma/generated";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserModel implements User {
    @Field(() => ID)
    public id: string

    @Field(() => Date)
    public createdAt: Date

    @Field(() => Date)
    public updatedAt: Date

    @Field(() => String)
    public email: string

    @Field(() => String)
    public password: string

    @Field(() => String)
    public username: string

    @Field(() => String)
    public displayName: string

    @Field(() => String, { nullable: true })
    public avatar: string

    @Field(() => String, { nullable: true })
    public bio: string

    @Field(() => Boolean)
    public isVerified: boolean

    @Field(() => Boolean)
    public isEmailVerified: boolean

    @Field(() => Boolean)
    public isTotpEnabled: boolean

    @Field(() => String, { nullable: true })
    public totpSecret: string
}