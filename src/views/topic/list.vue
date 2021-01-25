<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sort" style="width: 180px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>

      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" style="float: right;" @click="handleDownload">エクスポート</el-button>
      <router-link :to="'/topic/create'">
        <el-button class="filter-item" style="margin-right: 10px; float: right;" type="primary" icon="el-icon-edit">新規作成</el-button>
      </router-link>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="タイトル">
        <template slot-scope="{ row }">
          <router-link :to="'/topic/detail/' + row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="コメント数" width="120">
        <template slot-scope="{ row }">
          {{ row.comment_num }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="作成日時" width="120">
        <template slot-scope="{ row }">
          {{ row.created_at }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="編集" width="120">
        <template slot-scope="scope">
          <router-link :to="'/topic/edit/' + scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listTopic } from '@/api/topic'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'TopicList',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      downloadLoading: false,
      sortOptions: [
        { label: 'ID順', key: '+id' },
        { label: '新しい順', key: '-id' },
        { label: 'コメント数順', key: '-comments' }
      ],
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listTopic(this.listQuery).then((res) => {
        this.list = res.data
        this.total = parseInt(res.headers['resource-count'])
        this.listLoading = false
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
