import { BaseEntity } from './baseEntity';
export class PageEntity extends BaseEntity{
   result={
     total: 0,
     rows:[],
     pageSize:10,
     page:1,
     records:0 //总页数
   };
   constructor(fromJson,entity){
       super(fromJson)
       if(fromJson){
        this.result.page=fromJson.page||1
        this.result.pageSize=fromJson.pageSize||this.result.pageSize
        this.result.records=fromJson.records||(parseInt((fromJson.total+ this.result.pageSize-1) / this.result.pageSize))
        this.result.total=fromJson.total||0
        this.result.rows=super.transformArray(fromJson.rows,entity)
       }
   }
}