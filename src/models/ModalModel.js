import { observable, action } from "mobx";

class ModalModel {
  @observable visible = false;
  @observable text = "";
  @observable button = false;
  @observable buttonText = "";
  @observable loading = false;

  @action hide = () => {
    this.visible = false;
  };
}

export default ModalModel;