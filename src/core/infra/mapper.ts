export default interface Mapper<Domain, DTO, DataModel> {

  dtoToDomain(dto: DTO, other?): Domain;

  domainToDTO(model: Domain, other?): DTO;

  dataModelToDTO(dataModel: DataModel, other?): DTO;

  dtoToDataModel(dto: DTO, other?): DataModel;

}