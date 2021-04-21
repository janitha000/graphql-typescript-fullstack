import { Arg, Ctx, ID, Mutation, Query } from 'type-graphql';
import Person from '../models/Person'
import { MyContext } from '../types'

let personList = [
    new Person(1, "Janitha", "Tennakoon", 31),
    new Person(2, "Vindya", "Hettige", 30),
]
export class PersonResolver {
    @Query(() => [Person])
    persons(@Ctx() { auth }: MyContext): Person[] {
        console.log(auth)
        return personList;
    }

    @Query(() => Person, { nullable: true })
    person(@Arg('id', () => ID) id: string): Person | undefined {
        return personList.find(x => x.id === parseInt(id));
    }

    @Mutation(() => Person)
    createPerson(
        @Arg('id') id: string,
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('age') age: number,
    ): Person {
        let newPerson = new Person(parseInt(id), firstName, lastName, age);
        personList.push(newPerson)

        return newPerson
    }

}

