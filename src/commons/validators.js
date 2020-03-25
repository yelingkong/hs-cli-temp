export default {
  nameValidator: function (name) {
    let valid = true; let msg = ''

    name = name.trim()
    if (!name) {
      valid = false
      msg = 'username required'
    } else {
      if (!/^[a-zA-Z\u4e00-\u9fa5·_]{1,15}$/.test(name)) {
        valid = false
        msg = 'incorrect username'
      }
    }

    return { valid, msg }
  },

  passwordValidator: function (pwd) {
    let valid = true; let msg = ''

    pwd = pwd.trim()
    if (!pwd) {
      valid = false
      msg = 'password required'
    } else if (pwd.length < 6) {
      valid = false
      msg = 'password length can not be less than 6 characters'
    } else if (pwd.length > 18) {
      valid = false
      msg = 'password length can not be more than 18 characters'
    } else if (!/^[A-Z]$/.test(pwd)) {
      valid = false
      msg = 'password should contain uppercase character'
    } else if (!/^[0-9]$/.test(pwd)) {
      valid = false
      msg = 'password should contain numerical character'
    }

    return { valid, msg }
  },

  storeNameValidator (name) {
    let valid = true; let msg = ''

    name = name.trim()
    if (!name) {
      valid = false
      msg = 'store name required'
    } else {
      if (!/^[a-zA-Z\u4e00-\u9fa5·_]{1,15}$/.test(name)) {
        valid = false
        msg = 'incorrect store name'
      }
    }

    return { valid, msg }
  }
}
