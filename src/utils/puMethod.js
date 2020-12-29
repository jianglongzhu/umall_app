import {isDel,successAlert,infoAlert}  from "./alert"
import Vue from "vue"
let vm =new Vue()
/* 1. reqhttp请求http  
   2. id为需要传的参数 
   3. th为this的指向
   */
export let Del=(reqhttp,id,th)=>{
    isDel()
        .then(() => {
          reqhttp(id).then((res) => {
            if (res.data.code == 200) {
              successAlert("删除成功");
              th.$emit("init");
            }else{
               infoAlert(res.data.msg)
            }
          });
        })
        .catch(() => {
          infoAlert("已取消删除");
        });
}