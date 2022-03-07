import INoIdProductDto from "./iNoIdDto/iNoIdProductDto";
import WithId from "../core/infra/withId";

export default interface IProductDto extends INoIdProductDto, WithId {
}
  