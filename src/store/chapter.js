export default {
    namespaced:true,
    state: () =>{
            chapterList:[]
    },
    mutations:{
        writeChapter(state,chapterList){
            state.chapterList = chapterList
        }
    },
    actions:{}
}