<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom: 6em;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.buy {
  border: none;
  outline: none;
  background: #5094d8;
  color: white;
  padding: 10px 29px 10px 29px;
  font-size: 18px;
  border-radius: 7px;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
fieldset {
  border: none;
  margin: 0;
}
.input-container {
  display: flex;
  align-items: center;
}
.separator {
  margin-top: 10px;
}
.input-container i {
  padding: 10px 2px 10px 2px;
  background: #575a5d;
  color: white;
  min-width: 50px;
  text-align: center;
}
.input {
  padding: 12px;
  width: 100%;
  outline: none;
  box-sizing: border-box;
}

.col-1 {
  height: auto;
  width: 8.3333%;
}
.col-2 {
  height: auto;
  width: 16.6667%;
}
.col-3 {
  height: auto;
  width: 25%;
}
.col-4 {
  height: auto;
  width: 33.3333%;
}
.col-5 {
  height: auto;
  width: 41.6667%;
}
.col-6 {
  height: auto;
  width: 50%;
}
.col-7 {
  height: auto;
  width: 58.3333%;
}
.col-8 {
  height: auto;
  width: 66.6667%;
}
.col-9 {
  height: auto;
  width: 75%;
}
.col-10 {
  height: auto;
  width: 83.3333%;
}
.col-11 {
  height: auto;
  width: 91.6667%;
}
.col-12 {
  height: auto;
  width: 100%;
}
@media (min-width: 0) {
  .col-xs-1 {
    height: auto;
    width: 8.3333%;
  }
  .col-xs-2 {
    height: auto;
    width: 16.6667%;
  }
  .col-xs-3 {
    height: auto;
    width: 25%;
  }
  .col-xs-4 {
    height: auto;
    width: 33.3333%;
  }
  .col-xs-5 {
    height: auto;
    width: 41.6667%;
  }
  .col-xs-6 {
    height: auto;
    width: 50%;
  }
  .col-xs-7 {
    height: auto;
    width: 58.3333%;
  }
  .col-xs-8 {
    height: auto;
    width: 66.6667%;
  }
  .col-xs-9 {
    height: auto;
    width: 75%;
  }
  .col-xs-10 {
    height: auto;
    width: 83.3333%;
  }
  .col-xs-11 {
    height: auto;
    width: 91.6667%;
  }
  .col-xs-12 {
    height: auto;
    width: 100%;
  }
}
@media (min-width: 600px) {
  .col-sm-1 {
    height: auto;
    width: 8.3333%;
  }
  .col-sm-2 {
    height: auto;
    width: 16.6667%;
  }
  .col-sm-3 {
    height: auto;
    width: 25%;
  }
  .col-sm-4 {
    height: auto;
    width: 33.3333%;
  }
  .col-sm-5 {
    height: auto;
    width: 41.6667%;
  }
  .col-sm-6 {
    height: auto;
    width: 50%;
  }
  .col-sm-7 {
    height: auto;
    width: 58.3333%;
  }
  .col-sm-8 {
    height: auto;
    width: 66.6667%;
  }
  .col-sm-9 {
    height: auto;
    width: 75%;
  }
  .col-sm-10 {
    height: auto;
    width: 83.3333%;
  }
  .col-sm-11 {
    height: auto;
    width: 91.6667%;
  }
  .col-sm-12 {
    height: auto;
    width: 100%;
  }
}
@media (min-width: 1024px) {
  .col-md-1 {
    height: auto;
    width: 8.3333%;
  }
  .col-md-2 {
    height: auto;
    width: 16.6667%;
  }
  .col-md-3 {
    height: auto;
    width: 25%;
  }
  .col-md-4 {
    height: auto;
    width: 33.3333%;
  }
  .col-md-5 {
    height: auto;
    width: 41.6667%;
  }
  .col-md-6 {
    height: auto;
    width: 50%;
  }
  .col-md-7 {
    height: auto;
    width: 58.3333%;
  }
  .col-md-8 {
    height: auto;
    width: 66.6667%;
  }
  .col-md-9 {
    height: auto;
    width: 75%;
  }
  .col-md-10 {
    height: auto;
    width: 83.3333%;
  }
  .col-md-11 {
    height: auto;
    width: 91.6667%;
  }
  .col-md-12 {
    height: auto;
    width: 100%;
  }
}
.pa-md {
  padding: 16px 16px;
}
.pa-sm {
  padding: 8px 8px;
}
.ma-md {
  margin: 16px 16px;
}
.ma-sm {
  margin: 8px 8px;
}
.ml-sm {
  margin-left: 8px;
}
.mr-sm {
  margin-right: 8px;
}
.mt-sm {
  margin-top: 8px;
}
</style>
