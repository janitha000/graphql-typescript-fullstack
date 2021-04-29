import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query } from "type-graphql";
import argon2 from 'argon2'
import User, { UserModel } from "../models/User";
import { DocumentType } from "@typegoose/typegoose";
import { MyContext } from "src/types";
import jwt from 'jsonwebtoken'

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
    @Field(() => String, { nullable: true })
    token?: String
}

export class UserResolver {


    @Query(() => User, { nullable: true })
    async me(@Ctx() { user }: MyContext): Promise<DocumentType<User> | null> {
        if (!user.id) {
            return null;
        }

        const me = await UserModel.findById(user.id);
        return me;

    }

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
        @Ctx() { }: MyContext,
        @Arg('input') input: RegisterInput
    ): Promise<UserResponse> {
        const { username, password } = input;
        const user = await UserModel.findOne({ username });
        console.log(user)
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
        console.log(password)

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

        const token = jwt.sign({ id: user.id }, 'janitha000', { expiresIn: '1d' })


        return { user, token }
    }
}
