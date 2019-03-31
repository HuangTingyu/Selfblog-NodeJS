class BaseModel {
  constructor(data, message){
    if (typeof data === 'string'){
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}
/*
解释 ——
BaseModel里面两个值，一个data，一个message
data是object类型，message是string类型
如果只传入一个string类型的参数
那就把data赋值给类里面的变量message

*/

class SuccessModel extends BaseModel {
  constructor(data, message){
    super(data, message)
    this.errno = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message){
    super(data, message)
    this.errno = -1
  }
}
// 成功收到请求以后返回SuccessModel
// 失败以后返回ErrorModel
module.exports = {
  SuccessModel,
  ErrorModel
}
