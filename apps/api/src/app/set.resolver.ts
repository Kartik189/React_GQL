import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

export interface SetEntity {
  id: number;
  name: string;
}

@Resolver('Set')
export class SetResolver {
  private sets: SetEntity[] = [
    {
      id: 1,
      name: 'Kartik Sareen',
    },
    {
      id: 2,
      name: 'Shuchi Sareen',
    }
  ];

  @Query('allSets')
  getAllSets(): SetEntity[] {
    return this.sets;
  }

  @Mutation()
  addSet(
    @Args('name') name: string,
  ) {
    const newSet = {
      id: this.sets.length + 1,
      name,
    };

    this.sets.push(newSet);

    return newSet;
  }
}