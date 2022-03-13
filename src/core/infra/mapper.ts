export default interface Mapper<Domain, DTO, DataModel> {

  dtoToDomain(dto: DTO, other?: any): Domain;

  domainToDTO(model: Domain, other?: any): DTO;

  dataModelToDTO(dataModel: DataModel, other?: any): DTO;

  dtoToDataModel(dto: DTO, other?: any): DataModel;

}