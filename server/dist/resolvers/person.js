"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Person_1 = __importDefault(require("../models/Person"));
let personList = [
    new Person_1.default(1, "Janitha", "Tennakoon", 31),
    new Person_1.default(2, "Vindya", "Hettige", 30),
];
class PersonResolver {
    persons({ auth }) {
        console.log(auth);
        return personList;
    }
    person(id) {
        return personList.find(x => x.id === parseInt(id));
    }
    createPerson(id, firstName, lastName, age) {
        let newPerson = new Person_1.default(parseInt(id), firstName, lastName, age);
        personList.push(newPerson);
        return newPerson;
    }
}
__decorate([
    type_graphql_1.Query(() => [Person_1.default]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], PersonResolver.prototype, "persons", null);
__decorate([
    type_graphql_1.Query(() => Person_1.default, { nullable: true }),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], PersonResolver.prototype, "person", null);
__decorate([
    type_graphql_1.Mutation(() => Person_1.default),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('firstName')),
    __param(2, type_graphql_1.Arg('lastName')),
    __param(3, type_graphql_1.Arg('age')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", Person_1.default)
], PersonResolver.prototype, "createPerson", null);
exports.PersonResolver = PersonResolver;
//# sourceMappingURL=person.js.map