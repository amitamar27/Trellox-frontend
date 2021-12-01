<template>
      <div class="side-nav" :class="{'show':showNavBar}">
      <div class="nav-header" @click="showNavBar=!showNavBar">
        <h1 v-if="showNavBar" >Trellox</h1>
      <a v-if="!showNavBar"><i class="el-icon-d-arrow-right"></i></a>
      <a v-if="showNavBar"><i class="el-icon-d-arrow-left"></i></a>
      </div> 
      <hr/>
      <div v-if="showNavBar" class="navigation-container">
        <div class="navigation" @click="showNavBar=false">
          <router-link to="/"> <p> <i class="el-icon-s-home"></i> Home</p></router-link>
          <router-link  to="/board"> <p> <i class="el-icon-edit-outline"></i> Board</p></router-link>
        </div>
        <div class="logout-btn">
        <a> <p> <i class="el-icon-edit-outline"></i> Logout</p> </a>

        </div>
      </div>
    </div>
</template>
<script>

export default {
 data() {
    return {
      showNavBar:false
    };
  },
     components: {
  },
   
}
</script>