module.exports = {
    // 开启推荐配置信息
    // "extends": "eslint:recommended",
    // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件或者 .eslintrc.* 文件里的 eslintConfig 字段下设置 "root": true。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
    "root": true,
    // 脚本在执行期间访问的额外的全局变量
    // 当访问未定义的变量时，no-undef 规则将发出警告。如果你想在一个文件里使用全局变量，推荐你定义这些全局变量，这样 ESLint 就不会发出警告了。你可以使用注释或在配置文件中定义全局变量。
    "globals" : {
        "window":true,
        "document":true,
        "$":true
    },
    // 设置插件
    // "plugins": [
    //     'html'
    // ],
    // 设置解析器选项（必须设置这个属性）
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            // "arrowFunctions": true,
            // "experimentalObjectRestSpread": true,
            // "classes": true,
            // "modules": true,
            // "defaultParams": true
        }
    },
    // 启用的规则及各自的错误级别
    "rules" : {
        // 禁止用console
        "no-console":1,
        // 禁止用分号
        "semi":[2,'never'],
        // 在同一个作用域中禁止多次重复定义
        "no-redeclare":1
    },
    // 指定你想启用的环境
    "env": {
        "browser": true,
        "node": true
    },
   //babel  eslint都是babel公司出的
    // "parser": "babel-eslint"//配置解析es6
};
