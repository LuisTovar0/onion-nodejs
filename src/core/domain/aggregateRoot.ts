import {Entity} from "./entity";
import UniqueEntityID from "./uniqueEntityID";

export abstract class AggregateRoot<T> extends Entity<T> {

  get id(): UniqueEntityID {
    return this._id;
  }

}