import { makeAutoObservable } from 'mobx';

class System {
  info = 'ssss';

  constructor() {
    makeAutoObservable(this);
  }
}

export default System;
