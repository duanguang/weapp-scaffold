import {
  observable,
  action,
  autorun,
} from 'mobx';

export default class counterStore {
  constructor() {
    this.watch();
  }
  watch = () => {
    autorun(() => {
      // console.log(this.pallet,this.pallet.state)
    });
  }

  @observable counter = 0;
  @action
  increment() {
    this.counter++
  }

  @action
  decrement() {
    this.counter--
  }
  @action
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000);
  }
}
