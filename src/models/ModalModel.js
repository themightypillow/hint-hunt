import { observable } from "mobx";

class ModalModel {
  @observable visible = false;
  @observable text = "";
  @observable button = false;
  @observable buttonText = "";
  @observable loading = false;
}

export default ModalModel;