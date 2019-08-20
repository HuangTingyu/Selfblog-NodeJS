const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1 = 1`
    if (author) {
        sql += ` and author = '${author}'`
    }
    if (keyword) {
        sql += ` and title like '%${keyword}%'`
    }
    sql += ` order by createtime desc;`

    // 返回 promise
    return exec(sql)
}

const getDetail = (id) => {
    return {
        id: 4,
        title: '标题D',
        content: '内容D',
        createTime: 1553948025804,
        author: '刘航'
    }
}

// blogData 默认值 {}
const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含title content属性
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    console.log('update blog', id, blogData)
    return true
}

const delBlog = (id) => {
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}