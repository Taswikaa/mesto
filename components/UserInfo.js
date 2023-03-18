export default class UserInfo {
  constructor({ name, job }, nameSelector, jobSelector) {
    this._name = name.value;
    this._job = job.value;
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job
    }
  }

  setUserInfo(name, job) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = job;
  }
}