/**
 * This class serves for avoiding repetitive code, since most mappers usually look like this.
 * Not all mappers have to implement this interface if the methods have different arguments.
 */
export default interface BaseMapper<Domain, DTO, DataModel> {

  dtoToDomain(dto: DTO): Domain;

  domainToDTO(model: Domain): DTO;

  dataModelToDTO(dataModel: DataModel): DTO;

  dtoToDataModel(dto: DTO): DataModel;

}