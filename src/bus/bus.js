import Vue from "vue";

export const eventBus = new Vue(
    {
        methods:{
            getData(data){
                this.$emit("data",data);
            }
        }
    }
);