import {MapperEntity} from "json-mapper-object";

export class BaseEntity{
  success = true;
  message = '';
  code='';
  result=null;
  constructor(fromJson){
  }
  transformArray(rows,mapEntity){
    return(rows||[]).map((row)=>{
        return this.transformRow(row,mapEntity);
    })
 }
  transformRows(rows,mapEntity) {
    return (rows || []).map((row)=> {
      return this.transformRow(row,mapEntity);
    })
  }
  transformRow(row,mapEntity){
    return MapperEntity(mapEntity, row);
  }
}

export class ContainerEntity extends BaseEntity{
  constructor(fromService){
    super(fromService);
    if(fromService&&typeof fromService==='object'){
      this.code= fromService.status||''
      this.message = fromService.msg||''
      this.result = fromService.data
      this.success = fromService.ok
    }
  }
}
