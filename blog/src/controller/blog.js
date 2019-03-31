const getList = (author, keyword) => {
    // 先返回假数据（格式是正确的）
    return [{
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1553948025804,
        author: '张武'
    }, {
        id: 2,
        title: '标题B',
        content: '内容B',
        createTime: 1553948025804,
        author: '刘怡'
    }, {
        id: 3,
        title: '标题C',
        content: '内容C',
        createTime: 1553948025804,
        author: '陈烨'
    }]
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