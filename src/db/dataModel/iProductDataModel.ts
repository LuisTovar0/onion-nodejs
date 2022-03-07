import WithId from "../../core/infra/withId";

export default interface IProductDataModel extends WithId {
  name: string;
  quantity: number;
}