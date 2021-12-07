<template >
  <section class="task-cover">
    <section class="menu-cover">
      <header class="main-title">
        <p>Cover</p>
        <a class="icon-sm icon-close" @click="closeMenu"></a>
      </header>

      <main class="covers-container">
        <h4>Colors</h4>
      </main>
    </section>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.task-cover {
  position: absolute;
  background-color: #fff;
  border-radius: 3px;
  width: 304px;
  min-height: 50px;
  overflow-x: hidden;

  top: 165px;
  box-shadow: 0 0 2px 1px #e1e2e8;
  overflow-y: hidden;

  position: absolute;

  right: 5px;
  z-index: 50;

  .menu-cover {
    .main-title {
      height: 40px;
      margin-bottom: 8px;
      position: relative;
      text-align: center;

      text-transform: capitalize;
      // text-align: center;
      min-height: 40px;
      padding: 0 32px;
      margin: 0 12px;
      font-size: 16px;
      line-height: 40px;
      border-bottom: 1px solid rgba(9, 30, 66, 0.13);
      color: #172a4d;
      // position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      z-index: 30;

      a {
        color: #6b778c;
        padding: 10px 12px 10px 8px;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 2;
        font-size: 18px;
        margin-top: 3px;
        cursor: pointer;
        // @include hover-supported {
        //   // color: #252e3d;
        //   background-color: #091e420a;
        // }
      }
    }
    .covers-container {
      h4 {
        color: #5e6c84;
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
        margin-top: 16px;
        margin-bottom: 4px;
      }
    }

    // -webkit-overflow-scrolling: touch;
    // -webkit-transform: translate3d(0, 0, 0);
    // display: grid;
    // grid-template-columns: 1fr 1fr;
    // gap: 8px;
    // padding: 4px;
    // margin: 0 -4px;
    // overflow-x: hidden;
    // grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>