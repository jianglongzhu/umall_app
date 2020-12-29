import Vue from "vue"
let vm = new Vue()

// 成功的提示
export let successAlert = (message) => {
    vm.$message({
        message,
        type: "success",
    });
}
// 默认消息提示框
export let infoAlert = (message) => {
    vm.$message({
        message,
        type: "info"
    })
}
// 失败消息提示框
export let errAlert = (message) => {
    vm.$message({
        message,
        type: 'warning'
    });
}

// 是否删除的提示框
export let isDel = () => {
    return vm.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
}
