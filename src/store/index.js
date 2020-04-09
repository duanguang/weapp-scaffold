import { configure } from 'mobx';
import counterStore from './counter'

configure({enforceActions: 'observed'});

export const store = {
    counterStore:new counterStore(),
}
