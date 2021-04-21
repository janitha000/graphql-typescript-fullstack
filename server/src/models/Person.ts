import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ID, Int, ObjectType } from "type-graphql";

// interface person {
//     id: Number,
//     firstName: String,
//     lastName: String,
//     age: Number
// }


@ObjectType()
class Person {

    @Field(() => ID)
    _id: string;

    @prop({ required: true })
    @Field()
    firstName!: String;

    @prop({ required: true })
    @Field()
    lastName!: String;

    @prop({ required: true })
    @Field(() => Int)
    age: Number;

    @prop({ type: () => TimeStamps })
    @Field(() => String)
    createdAt = new Date().toUTCString()
}

export const PersoneModel = getModelForClass(Person);


export default Person