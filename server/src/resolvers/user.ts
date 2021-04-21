import { Arg, Ctx, Field, InputType, Mutation, ObjectType } from "type-graphql";
import argon2 from 'argon2'
import User, { UserModel } from "../models/User";
import { DocumentType } from "@typegoose/typegoose";
import { MyContext } from "src/types";

@InputType()
class RegisterInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
    @Field(() => User, { nullable: true })
    user?: User;
}

export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg('input') input: RegisterInput
    ): Promise<DocumentType<User>> {
        const { username, password } = input;
        const hashedPassword = await argon2.hash(password)

        let user = await UserModel.create({ username, password: hashedPassword })
        return user;
    }

    @Mutation(() => UserResponse)
    async login(
        @Ctx() { req }: MyContext,
        @Arg('input') input: RegisterInput
    ): Promise<UserResponse> {
        const { username, password } = input;
        const user = await UserModel.findOne({ username });
        if (!user) {
            return {
                errors: [
                    {
                        field: 'username',
                        message: 'user not found'
                    }
                ]
            }
        }
        console.log(user)

        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'password is incorrect'
                    }
                ]
            }
        }

        req.session.qid = user._id;

        return { user }
    }
}
