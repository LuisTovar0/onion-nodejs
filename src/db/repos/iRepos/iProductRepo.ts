import {Repo} from "../../../core/infra/repo";
import IProductDataModel from "../../dataModel/iProductDataModel";
import {ProductId} from "../../../domain/productAggregate/productId";
import IProductDto from "../../../dto/iProductDto";

export default interface IProductRepo extends Repo<IProductDataModel> {
  save(post: IProductDto): Promise<IProductDto>;

  findByDomainId(postId: ProductId | string): Promise<IProductDto>;

  exists(role: IProductDto): Promise<boolean>;

  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}