<template>
  <div v-if="board" class="group-list-container">
    <draggable @dragend="end" class="group-list" @end="changeGroup">
      <div v-for="group in board.groups"  :key="group.id" class="group-preview" >
        <div class="group-preview-header">
          <p
            class="group-title"
            dir="auto"
            maxlength="512"
            style="overflow: hidden; overflow-wrap: break-word; height: 28px">
            {{ group.title }}
          </p>
         <div class="group-preview-btn">
                <span class="span-1 hide">
                    <span class="span-2 icon-sm" ></span>
                </span>
                <div @click="openGroupMenu(group.id)" class="group-header-extras-menu span-1 icon-sm icon-overflow-menu-horizontal" ></div>
            </div>
        </div>
        <!-- <draggable> -->
        <card-list @pickTask="pickTask" :tasks="group.tasks" :groups="board.groups" :groupId="group.id" @addTask="addTask">
        </card-list>
          
        

        <!-- </draggable> -->
      </div>
      <group-menu @mousedown.stop="" v-if="isMenuOpened && group" @closeMenu="closeGroupMenu" :group="group" :title="'List actions'"></group-menu>
    </draggable>
      <div class="group-add-container">
        <div class="group-add-btn" >
          <p v-if="!isAddingTitle" @click="isAddingTitle = true">+Add Group</p>
          <form v-else class="add-group-form" @submit.prevent="addNewGroup">
            <textarea v-model="newGroupTitle" name="" id="" cols="30" rows="1" placeholder="Enter list title"></textarea>
            <div class="form-actions" >
              <a class="add-group-add" @click="addNewGroup">Add Group</a>
              <button class="add-group-close" @click="isAddingTitle = !isAddingTitle">x</button>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>