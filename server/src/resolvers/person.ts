import { Ctx, Query } from 'type-graphql';
import Person from '../models/Person'
import { MyContext } from '../types'

export class PersonResolver {
    @Query(() => [Person])
    posts(@Ctx() { auth }: MyContext) {
        console.log(auth)
        return [
            new Person(1, "Janitha", "Tennakoon", 31),
            new Person(2, "Vindya", "Hettige", 30),
        ]
    }

}

