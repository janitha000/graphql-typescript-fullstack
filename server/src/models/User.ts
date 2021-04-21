import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class User {
    @Field(() => ID)
    _id: string

    @prop({ required: true, unique: true, dropDups: true })
    @Field()
    username!: string;

    @prop({ required: true })
    password!: string;

    @prop({ type: () => TimeStamps })
    @Field(() => String)
    createdAt = new Date().toUTCString()

}

export const UserModel = getModelForClass(User)

export default User;

