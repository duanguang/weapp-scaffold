import { observable,action,autorun,computed } from 'mobx';
import { getPalletService } from '../services/search';
import {observablePromise} from 'hoolinks/mobx'
export default class counterStore{
    constructor(){
      this.watch();
    }
    @computed get palletList(){
        if(this.pallet.isResolved){
            let rows=this.pallet.value.result
            return rows.map((item,index)=>{
                return {key:`${item.productName}${index}`,name:item.productName}
              })
        }
        return [];
    }
    watch=()=>{
        autorun(()=> {
          // console.log(this.pallet,this.pallet.state)
         });
    }

    @observable  counter=0;
    @observable pallet=observablePromise(null);
    @action
    increment(){
        this.counter++
    }

    @action
    decrement(){
        this.counter--
    }
    @action
    incrementAsync(){
        setTimeout(() => {
            this.counter++
          }, 1000);
    }

    @action
    getPallet(){
         this.pallet=observablePromise(getPalletService())
    }
}