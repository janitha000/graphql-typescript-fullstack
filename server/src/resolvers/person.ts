import { DocumentType } from '@typegoose/typegoose';
import { Arg, Ctx, ID, Mutation, Query } from 'type-graphql';
import Person, { PersoneModel } from '../models/Person'
import { MyContext } from '../types'

let personList = [
    new Person(1, "Janitha", "Tennakoon", 31),
    new Person(2, "Vindya", "Hettige", 30),
]
export class PersonResolver {
    @Query(() => [Person])
    async persons(@Ctx() { auth }: MyContext): Promise<DocumentType<Person>[]> {
        console.log(auth)
        let persons = await PersoneModel.find({})
        return persons;
    }

    @Query(() => Person, { nullable: true })
    person(@Arg('id', () => ID) id: string): Person | undefined {
        return personList.find(x => x.id === parseInt(id));
    }

    @Mutation(() => Person)
    async createPerson(
        @Arg('id') id: string,
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('age') age: number,
    ): Promise<DocumentType<Person>> {
        let idInt: number = parseInt(id)
        let newPerson = await PersoneModel.create({ id: idInt, firstName, lastName, age })

        return newPerson
    }

}

