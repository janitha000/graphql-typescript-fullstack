import { DocumentType } from '@typegoose/typegoose';
import { Arg, Ctx, Mutation, Query } from 'type-graphql';
import Person, { PersoneModel } from '../models/Person'
import { MyContext } from '../types'


export class PersonResolver {
    @Query(() => [Person])
    async persons(@Ctx() { }: MyContext): Promise<DocumentType<Person>[]> {
        let persons = await PersoneModel.find({})
        return persons;
    }

    // @Query(() => Person, { nullable: true })
    // person(@Arg('id', () => ID) id: string): Person | undefined {
    //     return personList.find(x => x.id === parseInt(id));
    // }

    @Mutation(() => Person)
    async createPerson(
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('age') age: number,
    ): Promise<DocumentType<Person>> {
        let newPerson = await PersoneModel.create({ firstName, lastName, age })

        return newPerson
    }


}

