import { configure, observable, action } from "mobx";

// state can only be changed inside @action methods
configure({ enforceActions: "observed" });

class ModalModel {
  @observable visible = false;
  @observable text = "";
  @observable button = false;
  @observable buttonText = "";
  @observable loading = false;

  @action hide = () => {
    this.visible = false;
  };

  @action hideLoading = () => {
    this.loading = false;
  };
}

export default ModalModel;