import { Field, ID, Int, ObjectType } from "type-graphql";

// interface person {
//     id: Number,
//     firstName: String,
//     lastName: String,
//     age: Number
// }


@ObjectType()
class Person {

    constructor(id: Number, firstName: String, lastName: String, age: Number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    @Field(() => ID)
    id!: Number;

    @Field()
    firstName!: String;

    @Field()
    lastName!: String;

    @Field(() => Int)
    age: Number;

    @Field(() => String)
    createdAt = new Date().toUTCString()
}

export default Person