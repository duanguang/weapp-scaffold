import Store, { getInjector } from 'brain-store';
import { useState } from 'react';
export const useStore = <S>(store: { new (context: any): S }): S => {
    return useState<S>(() => {
      return getInjector()?.getState(store, true);
    })[0];
};

export { resource, Lifecycle, getInjector, setInjector, StoreModules, inject } from 'brain-store';
export { computed, action, autorun, observable } from 'mobx';
export { Store };
export { bind,observer,Provider } from 'brain-store-react';