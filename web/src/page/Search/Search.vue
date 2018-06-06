<template>
  <div class="search">
    <el-input v-model="search" placeholder="请输入内容">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="searchBook"></i>
    </el-input>
    <el-table
    :data="searchResult.dataList"
    stripe
    style="width: 100%">
    <el-table-column
      prop="index"
      label="序号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="更新时间">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      searchResult: {"code":1,"search":"美国","url":"https://www.123du.cc/Search/","time":124,"dataList":[{"index":0,"link":"https://www.123du.cc/dudu-31/116783/","linkNum":"/dudu-31/116783/","title":"美国牧场的小生活"},{"index":1,"link":"https://www.123du.cc/dudu-38/43364/","linkNum":"/dudu-38/43364/","title":"重生美国之富甲天下"},{"index":2,"link":"https://www.123du.cc/dudu-38/50144/","linkNum":"/dudu-38/50144/","title":"重生美国当大师"},{"index":3,"link":"https://www.123du.cc/dudu-40/69372/","linkNum":"/dudu-40/69372/","title":"重生美国做灵媒"},{"index":4,"link":"https://www.123du.cc/dudu-31/59093/","linkNum":"/dudu-31/59093/","title":"连环杀手在美国"},{"index":5,"link":"https://www.123du.cc/dudu-31/52249/","linkNum":"/dudu-31/52249/","title":"美国超级牧场主"},{"index":6,"link":"https://www.123du.cc/dudu-31/45119/","linkNum":"/dudu-31/45119/","title":"重生美国军火商"},{"index":7,"link":"https://www.123du.cc/dudu-38/44228/","linkNum":"/dudu-38/44228/","title":"重生在美国之1858"},{"index":8,"link":"https://www.123du.cc/dudu-31/121929/","linkNum":"/dudu-31/121929/","title":"混在美国的逍遥农夫"},{"index":9,"link":"https://www.123du.cc/dudu-34/107610/","linkNum":"/dudu-34/107610/","title":"我在美国做英雄"},{"index":10,"link":"https://www.123du.cc/dudu-31/156370/","linkNum":"/dudu-31/156370/","title":"穿越美国大律师"},{"index":11,"link":"https://www.123du.cc/dudu-39/155321/","linkNum":"/dudu-39/155321/","title":"美国盛行中华武术"}]},
      search: ''
    }
  },
  methods: {
    searchBook () {
      
    }
  }
}
</script>
