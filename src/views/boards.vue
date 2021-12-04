<template>
  <div v-if="boards" class="boards-page-container">
      <div class="boards">
          <div class="nav-side">
              <h1>side nav</h1>
         </div>
          <div class="board-boards">
              <div class="boards-list-header">
                  <i class="el-icon-user"></i>
              <h1> boards</h1>
              </div>
          <div class="boards-container">
              <div v-for="board in boards" :key="board.id">
                  <div :style="getBackground(board)" class="boards-list"  @click="setBoard(board._id)">
                  <p>{{board.title}}</p>
                  </div>
              </div>
          <div @click="isModalOpen =true" class="boards-list-add-board ">
              <p>create new board</p>
        </div>
          </div>
        <div v-if="isModalOpen" class="modal-window">
            <div class="board-add-modal">
                <form>
                    <div class="add-modal-header" :style="backgroundObject">
                        <div class="input">
                        <input v-model="newBoardTitle" type="text" placeholder="Enter board title...">
                        </div>
                        <button @click="isModalOpen =false" class="close-modal-btn "> <a class="el-icon-close"></a></button>
                    </div>
                </form>
                <div  class="background-options">
                    <button @click="setColorBackground(color.color)" :style="{backgroundColor:color.color}"  v-for="color in colors" :key="color.id"></button>
                    <button @click="setBackground(img.url)" class="background-img-btn" v-for="img in imgsBackground" :style="{'background-image':`url(${img.url})`}" :key="img.url"></button>
                   
                </div>
                <div class="create-board-btn">
                <button  @click="createEmptyBoard">Create board</button>
                

                </div>
            </div>
        </div>
          </div>

      </div>
  </div>
</template>

<script>

export default ({
    data() {
        return {
            isModalOpen:false,
            newBoardTitle:'',
            colors:[
                {
                color:'rgb(0, 121, 191)',
                hover:'rgb(0, 140, 200)'
            },
                {
                color:'rgb(176, 70, 50)',
                hover:'rgb(176, 80, 70)'

            },
                {
                color:'rgb(210, 144, 52)',
                hover:'rgb(210, 154, 72)'
                
            },
                {
                color:'rgb(137, 96, 158)',
                hover:'rgb(140, 100, 170)'

            },
                {
                color:'rgb(81, 152, 57)',
                hover:'rgb(81, 164, 72)'

            }
                
            ],
            imgsBackground:[
                {
                    url:'https://res.cloudinary.com/giladtoy/image/upload/v1638531156/rc9kslncvagzrkz2p2ru.jpg'
                },
                {
                    url:'https://res.cloudinary.com/giladtoy/image/upload/v1638531189/t7mu6ik3iaglggchsd73.jpg'
                },
                {
                    url:'https://res.cloudinary.com/giladtoy/image/upload/v1638531219/vvqjx2qdcnm1ujk0p8px.jpg'
                },
                {
                    url:'https://res.cloudinary.com/giladtoy/image/upload/v1638612342/q6j4odpwxnxpplb4xflf.jpg'
                },
               
            ],
            imgUrl:null,
            colorSelected:null
            

        }
        
    },
    created(){
    this.imgUrl=this.imgsBackground[0].url

    },
    computed:{
        boards(){
            return this.$store.getters.boards
        },
        backgroundObject(){
            if(!this.imgUrl){
                return {backgroundColor:`${this.colorSelected}`}
            } else{
                return{'background-image':`url(${this.imgUrl})`}

            }
            
        },
     
      
       
       
    },
    methods:{
        createEmptyBoard(){
        if(this.newBoardTitle==='')return
         this.isModalOpen=false
         var background= null
         if(!this.imgUrl)
         background={backgroundColor:`${this.colorSelected}`}
         else{
          background={'backgroundSrc':`${this.imgUrl}`}
         }
         const boardDetails ={
             title:this.newBoardTitle,
             background
         }
         this.$store.dispatch({type:'createNewBoard',boardDetails})
         this.$router.push(`/board/${this.newBoardTitle}`)

},
        setBoard(boardId){
            this.$store.dispatch({type:'getBoardById', boardId})
            this.$router.push(`/board/${boardId}`)
        },
        setColorBackground(color){
            this.imgUrl=null
            this.colorSelected =color
        },
        setBackground(imgUrl){
            this.colorSelected =null
            this.imgUrl=imgUrl
        },
           getBackground(board){
            if (board.style.backgroundSrc) {
            const url =board.style.backgroundSrc
            return {'background-image':`url(${url})`}
          }
          else{
          const backgroundColor =board.style.backgroundColor
        return {backgroundColor:`${backgroundColor}`}
      }
        }
        
    }
})
</script>
