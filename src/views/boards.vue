<template>
  <div v-if="boards" class="boards-page-container">

    <div class="boards-list-container">
      <div class="boards-header">
        <h1>Boards</h1>
      </div>

      <div class="boards-container">
            <div
            v-for="board in boards" :key="board._id"
              :style="getBackground(board)"
              class="boards-list"
              @click.stop="setBoard(board._id)"
            >
            <!-- <a class="icon-md icon-close"></a> -->
              <div class="board-title-container">
                <a class="icon-md icon-close" @click.stop="removeBoard(board._id)"></a> 
                <p>{{ board.title }}</p>
                
                </div>
                
            </div>

             <div @click="isModalOpen = true" class="boards-list-add-board">
            <p>create new board</p>
          </div>

          <div 
          v-if="isModalOpen"
          class="modal-window"
          >
          <div class="board-add-modal">
            <form>
              <div class="add-modal-header" :style="backgroundObject">
                <div class="input">
                  <input
                    v-model="newBoardTitle"
                    type="text"
                    placeholder="Enter board title..."
                  />
                </div>
                <!-- <a class="close-modal-btn"></a> -->
                  <a @click="isModalOpen = false"  class="close-modal-btn el-icon-close"></a>
                
              </div>
            </form>
            <div class="background-options">
              <button
                @click="setColorBackground(color.color)"
                :style="{ backgroundColor: color.color }"
                v-for="color in colors"
                :key="color.id"
              ></button>
              <button
                @click="setBackground(img.url)"
                class="background-img-btn"
                v-for="img in imgsBackground"
                :style="{ 'background-image': `url(${img.url})` }"
                :key="img.url"
              ></button>
            </div>
            <div class="create-board-btn">
              <button @click="createEmptyBoard">Create board</button>
            </div>
          </div>
          </div>
          
      </div>


    </div>




  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalOpen: false,
      newBoardTitle: "",
      colors: [
        {
          color: "rgb(0, 121, 191)",
          hover: "rgb(0, 140, 200)",
        },
        {
          color: "rgb(176, 70, 50)",
          hover: "rgb(176, 80, 70)",
        },
        {
          color: "rgb(210, 144, 52)",
          hover: "rgb(210, 154, 72)",
        },
        {
          color: "rgb(137, 96, 158)",
          hover: "rgb(140, 100, 170)",
        },
        {
          color: "rgb(81, 152, 57)",
          hover: "rgb(81, 164, 72)",
        },
      ],
      imgsBackground: [
        {
          url: "https://res.cloudinary.com/giladtoy/image/upload/v1638531156/rc9kslncvagzrkz2p2ru.jpg",
        },
        {
          url: "https://res.cloudinary.com/giladtoy/image/upload/v1638531189/t7mu6ik3iaglggchsd73.jpg",
        },
        {
          url: "https://res.cloudinary.com/giladtoy/image/upload/v1638531219/vvqjx2qdcnm1ujk0p8px.jpg",
        },
        {
          url: "https://res.cloudinary.com/giladtoy/image/upload/v1638612342/q6j4odpwxnxpplb4xflf.jpg",
        },
      ],
      imgUrl: null,
      colorSelected: null,
      // boards:
    };
  },
  created() {
    this.imgUrl = this.imgsBackground[0].url;
    this.$store.dispatch({ type: 'loadBoards' })
  },
  computed: {
    boards() {
      if(this.$store.getters.boards){
        return this.$store.getters.boards
      }
    },
    backgroundObject() {
      if (!this.imgUrl) {
        return { backgroundColor: `${this.colorSelected}` };
      } else {
        return { "background-image": `url(${this.imgUrl})` };
      }
    },
  },
  methods: {
    createEmptyBoard() {
      if (this.newBoardTitle === '') return;
      this.isModalOpen = false;
      let style = null;
      
      if (!this.imgUrl){ style = { bgColor: `${this.colorSelected}`, bgImg: '' };}
      else { style = { bgColor: '', bgImg: `url(${this.imgUrl})` }; }
      const boardDetails = {title: this.newBoardTitle,style};
      this.$store.dispatch({ type: "createNewBoard", boardDetails })
      .then(res => {
        this.$router.push(`/board/${res._id}`);
      })
      .catch(() => {
        console.error('Cant get board if');
      })
      
    },
    setBoard(boardId) {
      this.$router.push(`/board/${boardId}`);
    },
    setColorBackground(color) {
      this.imgUrl = null;
      this.colorSelected = color;
    },
    setBackground(imgUrl) {
      this.colorSelected = null;
      this.imgUrl = imgUrl;
    },
    getBackground(board) {
      if (board.style.bgImg) {
        // const url = board.style.bgImg;
        return { "background-image": `${board.style.bgImg}` };
      } 
       // const backgroundColor = board.style.bgColor;
        return { backgroundColor: `${board.style.bgColor}` };
    },
    removeBoard(boardId){
      // console.log('boardId',boardId);
      this.$store.dispatch({type: 'removeBoard', boardId})
    },
  },
};
</script>

<style lang="scss">
// .icon-md{

//       position: absolute;
//     top: 10px;
//     /* left: 0px; */
//     right: 5px;
//   background-color: #00000014;
//     cursor: pointer;
//     border-radius: 50%;
//     color: #42526e;
//     height: 32px;
//     margin: 4px;
//     overflow: hidden;
//     padding: 4px;
//     // position: absolute;
//     // right: 0;
//     // top: 0;
//     transition: background-color 85ms, color 85ms;
//     width: 32px;
//     z-index: 2;
//     font-size: 20px;
//     // line-height: 32px;
// }
.icon-close{
  color: white;
}

</style>
